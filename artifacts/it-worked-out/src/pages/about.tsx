import { Link } from "wouter";
import {
  ArrowLeft,
  Github,
  Linkedin,
  FileText,
  Mail,
  GraduationCap,
  Briefcase,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";

const RESUME_URL = "/Lake-Mauer-Resume.pdf";
const LINKEDIN_URL = "https://www.linkedin.com/in/lake-mauer/";
const GITHUB_URL = "https://github.com/lakem4";
const EMAIL = "lakemauer@gmail.com";

export default function About() {
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
        {/* Hero / intro */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"></div>
          <div className="container max-w-4xl mx-auto px-4 py-16 md:py-24">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
              <div
                aria-hidden="true"
                className="shrink-0 h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-5xl md:text-6xl font-serif font-medium text-primary-foreground shadow-lg"
              >
                LM
              </div>
              <div className="text-center md:text-left">
                <p className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                  About the maker
                </p>
                <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight mb-4">
                  Hi, I&rsquo;m Lake Mauer.
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  I&rsquo;m a Business Analytics &amp; Information Systems
                  student at the University of Iowa and a Business Intelligence
                  intern at VGM Group. I built <em>It Worked Out</em> as a
                  small, calm corner of the internet — a place to put down the
                  worries you carry around and notice, later, how many of them
                  quietly resolved themselves.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    <a
                      href={RESUME_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
                      Resume (PDF)
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a
                      href={LINKEDIN_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4" aria-hidden="true" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="rounded-full">
                    <a
                      href={GITHUB_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                      GitHub
                    </a>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full">
                    <a href={`mailto:${EMAIL}`}>
                      <Mail className="mr-2 h-4 w-4" aria-hidden="true" />
                      Email
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Highlights */}
        <section className="py-16 md:py-20 bg-muted/30">
          <div className="container max-w-4xl mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-6">
              <HighlightCard
                icon={<GraduationCap className="h-5 w-5 text-primary" />}
                title="Education"
                lines={[
                  "B.B.A — Business Analytics & Information Systems",
                  "University of Iowa, anticipated 2026",
                ]}
              />
              <HighlightCard
                icon={<Briefcase className="h-5 w-5 text-secondary" />}
                title="Currently"
                lines={[
                  "Business Intelligence Intern",
                  "VGM Group — building reports & dashboards in SQL, Power BI, and Tableau",
                ]}
              />
              <HighlightCard
                icon={<Sparkles className="h-5 w-5 text-amber-500" />}
                title="Toolbelt"
                lines={[
                  "SQL · Power BI · Tableau (DSC certified) · Azure DevOps · SSIS · Excel",
                ]}
              />
            </div>
          </div>
        </section>

        {/* About the project */}
        <section className="py-16 md:py-24">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-serif font-medium tracking-tight mb-6">
              About this project
            </h2>
            <div className="space-y-5 text-lg text-muted-foreground leading-relaxed">
              <p>
                <em>It Worked Out</em> started as a portfolio project, but the
                idea came from somewhere honest: I noticed that I&rsquo;d
                catastrophize about something for a week, and then forget I had
                ever worried about it once it resolved. The losses get
                remembered; the resolutions get filed away.
              </p>
              <p>
                The site is built with React, Vite, and shadcn/ui on the
                frontend, with Supabase Postgres as the backing store and
                TanStack Query handling the data layer. There&rsquo;s a small
                Express API alongside it for health checks. Every line of code
                is on{" "}
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
              <p>
                If you&rsquo;d like to talk shop, hire me, or just say hi,
                I&rsquo;d love to hear from you — the buttons above are the
                fastest way to reach me.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function HighlightCard({
  icon,
  title,
  lines,
}: {
  icon: React.ReactNode;
  title: string;
  lines: string[];
}) {
  return (
    <div className="bg-card rounded-2xl p-6 border border-border shadow-sm h-full">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
          {icon}
        </div>
        <h3 className="font-serif font-medium text-lg">{title}</h3>
      </div>
      <div className="space-y-1">
        {lines.map((line, i) => (
          <p
            key={i}
            className={
              i === 0
                ? "text-sm font-medium text-foreground"
                : "text-sm text-muted-foreground leading-relaxed"
            }
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
