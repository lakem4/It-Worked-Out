import { Link } from "wouter";
import { ArrowRight, Leaf, Shield, Sun, Feather, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-[100dvh] bg-background font-sans text-foreground selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight">
            It Worked Out
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/app">
              <Button variant="ghost" className="rounded-full">Log in</Button>
            </Link>
            <Link href="/app">
              <Button className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
                Open Journal
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="container max-w-5xl mx-auto px-4 text-center">
            <Badge className="mb-6 px-4 py-1.5 text-sm rounded-full bg-secondary/20 text-secondary-foreground border-secondary/30">
              A quiet place for your thoughts
            </Badge>
            <h1 className="text-5xl md:text-7xl font-serif font-medium tracking-tight mb-8 text-foreground max-w-3xl mx-auto leading-tight">
              Most things <span className="text-primary italic">work out</span> in the end.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Write down what's worrying you today. Set a date in the future to look back. Discover that the things keeping you awake rarely come to pass.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/app">
                <Button size="lg" className="rounded-full text-lg px-8 h-14 bg-primary hover:bg-primary/90 text-primary-foreground transition-transform hover:scale-105">
                  Start Journaling <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-muted/30">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">A gentle perspective shift</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">We tend to remember our fears but forget when they resolve. This journal helps you track the resolutions.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard 
                icon={<Feather className="h-6 w-6 text-primary" />}
                title="1. Write it down"
                description="Get it out of your head. Detail what you're stressed about right now in a safe, private space."
              />
              <FeatureCard 
                icon={<Leaf className="h-6 w-6 text-secondary" />}
                title="2. Let it go"
                description="Set a date in the future when you think this worry will be resolved, then put it away."
              />
              <FeatureCard 
                icon={<Sun className="h-6 w-6 text-amber-500" />}
                title="3. Look back"
                description="When the date arrives, reflect on what happened. You'll likely find it worked out fine."
              />
            </div>
          </div>
        </section>

        {/* The proof */}
        <section className="py-24">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="bg-card border border-border shadow-sm rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-secondary to-primary"></div>
              <Shield className="h-12 w-12 text-muted-foreground/30 mx-auto mb-6" />
              <h3 className="text-2xl md:text-3xl font-serif font-medium mb-6">Build a fortress of proof</h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Anxiety lies to us. It tells us that this time, it really is a disaster. By keeping a record of all the times things worked out, you build tangible proof against your anxiety.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  The presentation went fine
                </div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  They weren't mad at me
                </div>
                <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  We made the flight
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories */}
        <section className="py-24 bg-secondary/5">
          <div className="container max-w-5xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-medium mb-4">A record of resilience</h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">See how framing your worries changes how you experience them over time.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
                <p className="italic text-muted-foreground mb-6">"I used to lie awake thinking about everything that could go wrong with my new job. Writing it down here let my brain clock out. Looking back 3 months later, none of those fears materialized."</p>
                <div className="font-medium">— Sarah M.</div>
              </div>
              <div className="bg-background rounded-2xl p-8 border border-border shadow-sm">
                <p className="italic text-muted-foreground mb-6">"When you're in the middle of a stressful week, it feels permanent. This app is my gentle reminder that every stressful week I've ever had eventually ended."</p>
                <div className="font-medium">— David K.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-serif font-medium mb-6">Not toxic positivity. Just perspective.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We don't pretend bad things never happen. But we recognize that our minds are biased toward threat detection. By making it a habit to check in on past worries, we train our brains to recognize that we are capable of surviving the hard things, and that most of the hard things never happen anyway.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-primary text-primary-foreground text-center">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-4xl font-serif font-medium mb-6">Exhale.</h2>
            <p className="text-xl opacity-90 mb-10">Give your worries a place to rest, so your mind doesn't have to carry them.</p>
            <Link href="/app">
              <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 h-14 bg-background text-foreground hover:bg-background/90">
                Create your first entry
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="py-10 text-center border-t border-border">
        <p className="text-muted-foreground text-sm">
          It Worked Out &copy; {new Date().getFullYear()}. A quiet corner of the internet.
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-serif font-medium mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center justify-center font-medium ${className}`}>
      {children}
    </span>
  );
}