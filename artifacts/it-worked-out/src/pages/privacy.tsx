import PageShell from "@/components/page-shell";
import { Link } from "wouter";

export default function Privacy() {
  return (
    <PageShell
      title="Privacy Policy"
      subtitle="A short, plain-language explanation of what data It Worked Out collects and what we do with it."
      lastUpdated="May 1, 2026"
    >
      <h2>Who runs this site</h2>
      <p>
        It Worked Out is a personal portfolio project built and maintained by Lake
        Mauer (<a href="mailto:lakemauer@gmail.com">lakemauer@gmail.com</a>). It
        is not a registered business and does not sell any product or service.
      </p>

      <h2>What we collect</h2>
      <p>
        We try to collect as little information as possible. There are two
        sources of data:
      </p>
      <h3>1. Journal entries you write</h3>
      <p>
        When you save an entry on the <Link href="/app">journal page</Link>, the
        text of your entry, the date you logged it, and the date you chose to
        reflect on it are stored in a hosted Postgres database provided by{" "}
        <a
          href="https://supabase.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Supabase
        </a>
        . We do not associate entries with your name, email, IP address, or any
        account — the journal currently has no login and no per-user accounts.
        Anyone using the site can read every entry. Please do not write anything
        you would not be comfortable being read by a stranger.
      </p>
      <h3>2. Basic analytics</h3>
      <p>
        We use Google Analytics 4 (measurement ID{" "}
        <code>G-Q158Y15D96</code>) to understand aggregate traffic — things like
        how many people visit the site, which pages they look at, and roughly
        what country they are in. Google may set cookies in your browser to
        support this. You can read more in{" "}
        <a
          href="https://policies.google.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Google's Privacy Policy
        </a>
        , and you can opt out of Google Analytics tracking by installing
        Google's{" "}
        <a
          href="https://tools.google.com/dlpage/gaoptout"
          target="_blank"
          rel="noopener noreferrer"
        >
          opt-out browser add-on
        </a>
        .
      </p>

      <h2>What we do not collect</h2>
      <p>
        We do not collect names, email addresses, passwords, payment information,
        precise location, or contacts. We do not run advertising or share data
        with advertisers.
      </p>

      <h2>How long we keep entries</h2>
      <p>
        Journal entries are kept until you delete them with the trash icon on
        the entry card. Because there is no login, deleting your browser data
        will not remove entries you wrote — please use the in-app delete button
        instead.
      </p>

      <h2>Your choices</h2>
      <p>
        You can delete any entry at any time from the journal page. You can
        block analytics cookies through your browser settings or the link
        above. If you would like an entry removed and cannot delete it
        yourself, email <a href="mailto:lakemauer@gmail.com">lakemauer@gmail.com</a>.
      </p>

      <h2>Children</h2>
      <p>
        It Worked Out is not directed at children under 13, and we do not
        knowingly collect data from them.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes meaningfully, the &ldquo;last updated&rdquo;
        date at the top of the page will change too. The current version
        always lives at <Link href="/privacy">/privacy</Link>.
      </p>
    </PageShell>
  );
}
