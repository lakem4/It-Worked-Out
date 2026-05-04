import PageShell from "@/components/page-shell";
import { Link } from "wouter";

export default function Cookies() {
  return (
    <PageShell
      title="Cookie Policy"
      subtitle="What cookies and local storage It Worked Out uses, and how to control them."
      lastUpdated="May 1, 2026"
    >
      <h2>What is a cookie?</h2>
      <p>
        Cookies are small text files that websites place in your browser. They
        are commonly used to remember preferences and to measure traffic.
        Browsers also expose a similar feature called <em>local storage</em>{" "}
        that we use in one place.
      </p>

      <h2>What we use</h2>
      <h3>1. Strictly necessary &mdash; local storage</h3>
      <p>
        We store a single key (<code>iwo_cookie_consent_v1</code>) in your
        browser&rsquo;s local storage to remember that you dismissed the
        cookie banner so that we don&rsquo;t show it on every visit. This
        value never leaves your device.
      </p>

      <h3>2. Analytics &mdash; Google Analytics 4</h3>
      <p>
        We use Google Analytics (measurement ID <code>G-Q158Y15D96</code>) to
        measure aggregate traffic. Google sets a small number of cookies
        (typically <code>_ga</code> and <code>_ga_&lt;id&gt;</code>) to
        distinguish unique visitors and sessions. The data is aggregated and
        does not identify you personally.
      </p>

      <h2>What we do not use</h2>
      <p>
        We do not use advertising cookies, retargeting pixels, or social media
        tracking pixels. We do not sell cookie data to third parties.
      </p>

      <h2>How to control cookies</h2>
      <p>
        Most browsers let you block or delete cookies in their settings. You
        can also disable Google Analytics specifically by installing Google&rsquo;s{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          opt-out browser add-on
        </a>
        . If you clear your browser&rsquo;s site data for It Worked Out, the
        cookie banner will reappear on your next visit.
      </p>

      <h2>More information</h2>
      <p>
        For broader information about how we handle data, see our{" "}
        <Link href="/privacy">Privacy Policy</Link>. For the rules of using
        the site, see our <Link href="/terms">Terms &amp; Conditions</Link>.
        Questions? Email{" "}
        <a href="mailto:lakemauer@gmail.com">lakemauer@gmail.com</a>.
      </p>
    </PageShell>
  );
}
