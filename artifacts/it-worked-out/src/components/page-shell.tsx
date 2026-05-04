import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

interface PageShellProps {
  title: string;
  subtitle?: string;
  lastUpdated?: string;
  children: React.ReactNode;
}

/**
 * Shared layout for static / informational pages (about, privacy, cookies, terms).
 * Provides the site header, a centered article container, and the global footer.
 */
export default function PageShell({
  title,
  subtitle,
  lastUpdated,
  children,
}: PageShellProps) {
  return (
    <div className="min-h-[100dvh] bg-background font-sans text-foreground flex flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container max-w-5xl mx-auto flex h-16 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-xl font-medium tracking-tight"
          >
            It Worked Out
          </Link>
          <nav className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="sm" className="rounded-full">
                <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
                Home
              </Button>
            </Link>
            <Link href="/app">
              <Button
                size="sm"
                className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Open Journal
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="container max-w-3xl mx-auto px-4 py-12 md:py-20">
          <header className="mb-10 border-b border-border pb-8">
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight text-foreground">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {subtitle}
              </p>
            )}
            {lastUpdated && (
              <p className="mt-4 text-sm text-muted-foreground">
                Last updated: {lastUpdated}
              </p>
            )}
          </header>

          <article className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:font-medium prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            {children}
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
