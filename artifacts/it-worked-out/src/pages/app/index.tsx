import { Link } from "wouter";
import { format, isPast, isToday } from "date-fns";
import {
  useListEntries,
  useCreateEntry,
  useUpdateEntry,
  useDeleteEntry,
  useGetStats,
  useListDueForReflection,
} from "@/hooks/use-entries";
import { useState } from "react";
import { Plus, Calendar as CalendarIcon, CheckCircle2, HelpCircle, AlertCircle, ArrowRight, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// App Page
export default function App() {
  const { data: entries, isLoading } = useListEntries();
  const { data: stats } = useGetStats();
  const { data: dueEntries } = useListDueForReflection();
  
  return (
    <div className="min-h-[100dvh] bg-background font-sans text-foreground">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
        <div className="container max-w-5xl mx-auto flex h-16 items-center px-4">
          <Link href="/" className="flex items-center gap-2 mr-6 font-serif text-xl font-medium tracking-tight">
            It Worked Out
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium ml-auto">
            {stats && (
              <span className="text-muted-foreground hidden sm:inline-block">
                {stats.workedOut} worked out so far
              </span>
            )}
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
          </nav>
        </div>
      </header>
      
      <main className="container max-w-3xl mx-auto px-4 py-8 md:py-12 space-y-12">
        <AddEntrySection />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif font-medium tracking-tight text-foreground">Your Journal</h2>
            {dueEntries && dueEntries.length > 0 && (
              <Badge variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-3 py-1">
                {dueEntries.length} {dueEntries.length === 1 ? 'entry needs' : 'entries need'} reflection
              </Badge>
            )}
          </div>
          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="h-48 rounded-xl bg-muted animate-pulse"></div>
              <div className="h-48 rounded-xl bg-muted animate-pulse"></div>
            </div>
          ) : !entries || entries.length === 0 ? (
            <Card className="border-dashed bg-transparent shadow-none">
              <CardContent className="flex flex-col items-center justify-center p-12 text-center">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-6">
                  <Plus className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-lg font-medium font-serif mb-2">You haven't added anything yet.</p>
                <p className="text-muted-foreground max-w-sm mb-6">What's on your mind? Write down a worry and give yourself a future date to revisit it.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {entries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function AddEntrySection() {
  const [description, setDescription] = useState("");
  const [reflectionDate, setReflectionDate] = useState<Date | undefined>(undefined);
  const createEntry = useCreateEntry();
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !reflectionDate) return;
    
    // Create UTC date string from local selection
    const dateStr = format(reflectionDate, "yyyy-MM-dd");
    const loggedDateStr = format(new Date(), "yyyy-MM-dd");
    
    createEntry.mutate({
      data: {
        description,
        loggedDate: loggedDateStr,
        reflectionDate: dateStr
      }
    }, {
      onSuccess: () => {
        setDescription("");
        setReflectionDate(undefined);
        toast({
          title: "Saved.",
          description: "We'll check back on this later.",
        });
      },
      onError: () => {
        toast({
          title: "Couldn't save",
          description: "Please try again later.",
          variant: "destructive"
        });
      }
    });
  };
  
  return (
    <Card className="overflow-hidden border-border/60 shadow-sm bg-card">
      <form onSubmit={handleSubmit}>
        <CardHeader className="bg-muted/30 pb-4 border-b border-border/30">
          <CardTitle className="text-xl font-serif font-medium">What's on your mind?</CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="sr-only">Worry description</Label>
            <Textarea 
              id="description"
              placeholder="I'm worried about..." 
              className="resize-none min-h-[120px] bg-transparent border-0 shadow-none focus-visible:ring-0 px-0 text-base md:text-lg placeholder:text-muted-foreground/60"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-border/30 bg-muted/10 pt-4 pb-4">
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal rounded-full",
                    !reflectionDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {reflectionDate ? format(reflectionDate, "PPP") : <span>When should we check back?</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={reflectionDate}
                  onSelect={setReflectionDate}
                  initialFocus
                  disabled={(date) => isPast(date) && !isToday(date)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button 
            type="submit" 
            disabled={!description.trim() || !reflectionDate || createEntry.isPending}
            className="rounded-full"
          >
            {createEntry.isPending ? "Saving..." : "Leave it here"} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

function EntryCard({ entry }: { entry: any }) {
  const updateEntry = useUpdateEntry();
  const deleteEntry = useDeleteEntry();
  const { toast } = useToast();
  
  const isPending = entry.status === "pending";
  const refDate = new Date(entry.reflectionDate);
  const isDue = isPending && (isPast(refDate) || isToday(refDate));
  
  const handleStatusUpdate = (status: "worked_out" | "still_stressing") => {
    updateEntry.mutate({
      id: entry.id,
      data: { status }
    }, {
      onSuccess: () => {
        if (status === "worked_out") {
          toast({
            title: "It worked out!",
            description: "Another thing you didn't need to worry about.",
          });
        }
      }
    });
  };

  const handleDelete = () => {
    deleteEntry.mutate({ id: entry.id }, {
      onSuccess: () => {
        toast({
          title: "Deleted",
          description: "Entry removed from your journal.",
        });
      }
    });
  };

  return (
    <Card className={cn(
      "flex flex-col transition-all duration-300 relative group", 
      isDue ? "border-primary/50 shadow-md ring-1 ring-primary/20 bg-primary/5" : "border-border/60 shadow-sm",
      entry.status === "worked_out" ? "opacity-75 bg-secondary/10" : ""
    )}>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete entry?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently remove this entry from your journal. You can't undo this.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4 space-y-0 pr-12">
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground font-medium">
            Logged {format(new Date(entry.loggedDate), "MMM d, yyyy")}
          </p>
        </div>
        <StatusBadge status={entry.status} isDue={isDue} />
      </CardHeader>
      <CardContent className="flex-1">
        <p className={cn(
          "text-base", 
          entry.status === "worked_out" && "line-through text-muted-foreground"
        )}>
          {entry.description}
        </p>
      </CardContent>
      <CardFooter className="pt-4 border-t border-border/30 bg-muted/10 flex flex-col items-start gap-4">
        {isPending ? (
          <>
            <p className="text-sm font-medium flex items-center gap-2">
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
              Reflect on {format(refDate, "MMM d, yyyy")}
            </p>
            
            {isDue && (
              <div className="w-full space-y-3 pt-2">
                <p className="text-sm font-serif font-medium text-primary">It's time to reflect. Did this work out?</p>
                <div className="flex flex-wrap gap-2 w-full">
                  <Button 
                    size="sm" 
                    onClick={() => handleStatusUpdate("worked_out")}
                    disabled={updateEntry.isPending}
                    className="flex-1 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    Yes, it worked out
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => handleStatusUpdate("still_stressing")}
                    disabled={updateEntry.isPending}
                    className="flex-1 rounded-full"
                  >
                    Still stressing
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            {entry.status === "worked_out" ? (
              <><CheckCircle2 className="h-4 w-4 text-secondary" /> Resolved</>
            ) : (
              <><AlertCircle className="h-4 w-4 text-destructive" /> Still working on it</>
            )}
          </p>
        )}
      </CardFooter>
    </Card>
  );
}

function StatusBadge({ status, isDue }: { status: string, isDue: boolean }) {
  if (status === "worked_out") {
    return <Badge variant="secondary" className="font-normal bg-secondary text-secondary-foreground hover:bg-secondary">Worked out</Badge>;
  }
  if (status === "still_stressing") {
    return <Badge variant="outline" className="font-normal">Still stressing</Badge>;
  }
  if (isDue) {
    return <Badge variant="default" className="font-normal animate-pulse">Needs reflection</Badge>;
  }
  return <Badge variant="secondary" className="font-normal bg-muted text-muted-foreground hover:bg-muted">Pending</Badge>;
}
