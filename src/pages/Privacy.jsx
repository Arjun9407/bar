import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function Privacy() {
  return (
    <>
      <Seo
        title="Privacy Policy | BarcodePro"
        description="BarcodePro's privacy policy: what data we collect, how cookies and analytics are used, and how to contact us."
        path="/privacy"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Privacy Policy", `${SITE}/privacy`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Legal</span>
        <h1>Privacy <span className="gradient-text">Policy</span></h1>
        <p>Effective Date: January 1, 2026</p>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>Overview</h2>
        <p>
          BarcodePro ("we", "us") provides free browser-based barcode and QR code tools at barcodepro.pages.dev.
          This policy explains what data is (and isn't) collected when you use the site, how advertising and
          analytics services work here, and what choices you have.
        </p>

        <h2>Data you enter into our tools</h2>
        <p>
          BarcodePro does not store barcode, QR code, or scanned image data entered or uploaded by users. All
          generation and decoding happens locally in your browser using JavaScript — the values you type into the
          generator, the CSV you upload to the bulk tool, and the photos you upload to the scanner are never
          transmitted to, or stored on, any server we operate.
        </p>

        <h2>Cookies and similar technologies</h2>
        <p>Cookies are small text files a website can ask your browser to store. We and our third-party partners may use them for:</p>
        <ul>
          <li><strong>Essential cookies:</strong> used for basic site functionality, such as remembering that you've dismissed the cookie notice.</li>
          <li><strong>Analytics cookies:</strong> help us understand aggregate, anonymized usage patterns so we can improve the site.</li>
          <li><strong>Advertising cookies:</strong> set by our advertising partners to serve ads and measure their performance.</li>
        </ul>
        <p>
          You can control or delete cookies through your browser settings at any time. Blocking cookies may affect
          how ads are displayed but will not affect the core functionality of any generator or scanner tool on this
          site.
        </p>

        <h2>Advertising: Google AdSense</h2>
        <p>
          This site displays ads served by Google AdSense. Google, as a third-party vendor, uses cookies to serve
          ads based on a visitor's prior visits to this and other websites.
        </p>
        <p>
          You may opt out of personalized advertising by visiting{" "}
          <a href="https://adssettings.google.com" style={{ color: "var(--accent-3)" }} target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>, or opt out of a third-party
          vendor's use of cookies by visiting{" "}
          <a href="https://www.aboutads.info/choices" style={{ color: "var(--accent-3)" }} target="_blank" rel="noopener noreferrer">www.aboutads.info</a>.
        </p>

        <h2>Analytics</h2>
        <p>
          We may use privacy-conscious analytics services to collect anonymous, aggregated usage statistics. These
          statistics are not tied to your generated or scanned data.
        </p>

        <h2>Information collected automatically</h2>
        <p>
          Like most websites, our hosting provider and any analytics or advertising services in use may
          automatically log standard technical information such as your IP address, browser type, device type,
          referring page, and timestamps of visits.
        </p>

        <h2>Your rights (GDPR / UK GDPR)</h2>
        <p>
          If you are located in the European Economic Area or the UK, you have the right to request access to,
          correction of, or deletion of any personal data we hold about you. Because we do not require an account
          and do not store the content you generate or scan, we hold very little personal data about visitors.
        </p>

        <h2>Your rights (CCPA / CPRA — California residents)</h2>
        <p>
          California residents have the right to know what personal information is collected, to request deletion,
          and to opt out of the "sale" or "sharing" of personal information.
        </p>

        <h2>Children's privacy</h2>
        <p>
          BarcodePro is not directed at children under 13, and we do not knowingly collect personal information
          from children under 13.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          We may use trusted third-party providers for hosting, content delivery, advertising (Google AdSense) and
          analytics.
        </p>

        <h2>Data retention</h2>
        <p>
          We do not retain the values, files, or images you submit to any generator or the scanner, since these are
          never sent to our servers in the first place.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. The effective date at the top of this page reflects the most
          recent revision.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy or a privacy request? Email:{" "}
          <a href="mailto:support@barcodepro.com" style={{ color: "var(--accent-3)" }}>support@barcodepro.com</a>
        </p>
      </section>
    </>
  );
}
