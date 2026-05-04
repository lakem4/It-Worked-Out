import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "iwo_cookie_consent_v1";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // small delay so it doesn't pop the moment the page paints
        timer = window.setTimeout(() => setVisible(true), 400);
      }
    } catch {
      // localStorage not available — show the banner anyway, dismissing it
      // for the session is still useful even if it can't persist.
      setVisible(true);
    }
    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ accepted: true, at: new Date().toISOString() }),
      );
    } catch {
      // ignore — best effort
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:pb-6"
    >
      <div className="container max-w-3xl mx-auto">
        <div className="rounded-2xl border border-border bg-background/95 backdrop-blur shadow-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="hidden sm:flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use a small amount of cookies and local storage to keep the site
              working and to understand traffic via Google Analytics. Learn more
              in our{" "}
              <Link
                href="/cookies"
                className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
              >
                Cookie Policy
              </Link>
              .
            </p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 self-end sm:self-auto">
            <Button
              variant="ghost"
              size="sm"
              onClick={accept}
              className="rounded-full"
              aria-label="Dismiss cookie notice"
            >
              <X className="h-4 w-4 sm:hidden" aria-hidden="true" />
              <span className="hidden sm:inline">Dismiss</span>
            </Button>
            <Button
              onClick={accept}
              size="sm"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
