import PageShell from "@/components/page-shell";
import { Link } from "wouter";

export default function Terms() {
  return (
    <PageShell
      title="Terms & Conditions"
      subtitle="The basic rules for using It Worked Out."
      lastUpdated="May 1, 2026"
    >
      <h2>Acceptance</h2>
      <p>
        By using It Worked Out (the &ldquo;Site&rdquo;), you agree to these
        Terms &amp; Conditions and to our{" "}
        <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/cookies">Cookie Policy</Link>. If you do not agree, please
        stop using the Site.
      </p>

      <h2>What the Site is</h2>
      <p>
        It Worked Out is a personal portfolio project that lets visitors
        record stressful thoughts and revisit them later. It is intended for
        reflective journaling, not for medical, legal, or therapeutic advice.
        It is not a substitute for professional help. If you are in crisis,
        please contact a qualified professional or, in the United States,
        dial 988.
      </p>

      <h2>How you may use the Site</h2>
      <p>
        You agree to use the Site only for lawful, personal purposes. In
        particular, you agree not to:
      </p>
      <ul>
        <li>
          Post content that is illegal, hateful, threatening, harassing,
          defamatory, or that contains personally identifying information about
          someone else without their consent.
        </li>
        <li>
          Submit malware, attempt to break authentication or access controls,
          probe the database for vulnerabilities, or interfere with how the
          Site runs for other people.
        </li>
        <li>
          Scrape entries in bulk or automate large numbers of submissions.
        </li>
      </ul>
      <p>
        Because the Site has no per-user accounts, every entry written is
        readable by every other visitor. Please do not submit anything you
        would not want a stranger to see.
      </p>

      <h2>Content you submit</h2>
      <p>
        You retain ownership of the words you write. By submitting an entry
        you grant us a limited, non-exclusive, royalty-free license to store
        and display that entry as part of the Site&rsquo;s normal operation.
        We may remove any entry at any time, with or without notice, including
        for violating these Terms.
      </p>

      <h2>No warranty</h2>
      <p>
        The Site is provided &ldquo;as is.&rdquo; We do not guarantee that the
        Site will always be available, that it will be free of bugs, or that
        entries you submit will be preserved indefinitely. Back up anything
        you can&rsquo;t afford to lose.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the Site&rsquo;s operator
        (Lake Mauer) is not liable for any indirect, incidental, or
        consequential damages arising from your use of the Site.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms occasionally. The &ldquo;last updated&rdquo;
        date at the top of the page reflects the most recent change. Continued
        use of the Site after changes are posted constitutes acceptance of the
        revised Terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:lakemauer@gmail.com">lakemauer@gmail.com</a>.
      </p>
    </PageShell>
  );
}
