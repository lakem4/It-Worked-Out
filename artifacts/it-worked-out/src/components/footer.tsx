import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-border bg-background"
    >
      <div className="container max-w-5xl mx-auto px-4 py-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-base font-medium tracking-tight">
            It Worked Out
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            &copy; {new Date().getFullYear()} Lake Mauer. A quiet corner of the internet.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <li>
              <Link
                href="/about"
                className="hover:text-foreground transition-colors"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-foreground transition-colors"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/cookies"
                className="hover:text-foreground transition-colors"
              >
                Cookies
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-foreground transition-colors"
              >
                Terms
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
