import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function About() {
  return (
    <>
      <Seo
        title="About BarcodePro"
        description="Learn about BarcodePro, a free online barcode and QR code toolkit that runs entirely in your browser."
        path="/about"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["About BarcodePro", `${SITE}/about`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Our Story</span>
        <h1>About <span className="gradient-text">BarcodePro</span></h1>
        <p>BarcodePro is a free, unlimited barcode and QR code toolkit built for businesses, students, retailers, developers and anyone who just needs a code generated without installing software.</p>
        <div style={{ marginTop: 34 }}>
          <img src="/assets/images/barcode-transparent-sample.jpg" alt="Barcode isolated on a transparent background" style={{ maxWidth: 280, width: "100%", borderRadius: 16 }} />
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 20 }}>
        <p>
          Every tool on this site — the barcode generator, QR code generator, bulk CSV export and the scanner — runs
          entirely in your browser. Nothing you type, upload or generate is sent to a server, which means it's
          private by default and works even on a slow connection.
        </p>
        <p>
          Our goal is simple: make barcode and QR tools that are fast, free, and don't get in your way with logins,
          limits, or watermarks.
        </p>

        <h2>Why we built BarcodePro</h2>
        <p>
          Most people who need a barcode need it for five minutes, not for a subscription. A small shop owner
          labelling a shelf of new stock, a student finishing a packaging design project, a warehouse clerk who needs
          one ITF-14 case code before a truck leaves — none of these people want to create an account, hit a "3 free
          codes" paywall, or download software just to get a single scannable image.
        </p>
        <p>
          Everything here is rendered client-side using open barcode and QR encoding libraries running directly in
          JavaScript. That's a deliberate architectural choice, not just a privacy feature: it means there's no
          backend to rate-limit you, no queue, and no risk of your product SKUs or customer contact details passing
          through a third-party server.
        </p>

        <h2>Who actually uses these tools</h2>
        <p>We hear from a fairly wide mix of people, and we've shaped the toolset around the patterns that come up most often:</p>
        <ul>
          <li><strong>Small retailers and Etsy sellers</strong> generating EAN-13 or UPC-A codes for products before they go on a shelf or into a marketplace listing.</li>
          <li><strong>Warehouse and logistics teams</strong> using CODE128 or ITF-14 for internal SKUs, pallet labels, and case codes.</li>
          <li><strong>Event organizers</strong> generating QR codes for ticket check-in, printed programs, or table signage.</li>
          <li><strong>Developers and QA testers</strong> who need a quick batch of realistic-looking barcodes to test a scanner integration.</li>
          <li><strong>Students and educators</strong> putting together packaging design coursework or teaching examples.</li>
          <li><strong>Restaurants and cafés</strong> building QR codes for digital menus, WiFi login cards, and review-page links.</li>
        </ul>

        <h2>How the tools fit together</h2>
        <p>
          The <Link to="/#generator" style={{ color: "var(--accent-3)" }}>barcode generator</Link> handles one-off
          linear codes with control over bar width, height and label font size. The{" "}
          <Link to="/qr-generator" style={{ color: "var(--accent-3)" }}>QR code generator</Link> covers the newer,
          denser format used for links, WiFi credentials, plain text and vCard contact cards. When you need more than
          a handful of codes, the <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link>{" "}
          takes a CSV or pasted list and turns it into a ZIP of individually named PNGs. And the{" "}
          <Link to="/scanner" style={{ color: "var(--accent-3)" }}>scanner</Link> closes the loop: upload a photo of
          any barcode or QR code and it decodes the value locally.
        </p>

        <h2>Our approach to accuracy</h2>
        <p>
          Barcode symbologies are unforgiving — a single encoding mistake and a scanner simply won't read the code.
          We rely on established, widely used open-source encoding libraries rather than writing our own encoding
          logic from scratch. If you generate a code here and it fails to scan, it's almost always a printing issue
          rather than an encoding one — see our{" "}
          <Link to="/blog/printing-barcode-labels" style={{ color: "var(--accent-3)" }}>guide to print settings</Link>{" "}
          for the most common causes.
        </p>
      </section>

      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 80 }}>
        <h2 className="section-title">What we <span className="gradient-text">support</span></h2>
        <p className="section-sub">A full set of formats covering retail, logistics, ticketing and general-purpose use.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">▥</span>
            <h3>Linear Barcodes</h3>
            <p>CODE128, CODE39, EAN-13, EAN-8, UPC-A, UPC-E, ITF and more.</p>
          </div>
          <div className="feature-card">
            <span className="icon">◫</span>
            <h3>2D Formats</h3>
            <p>QR Code, Data Matrix, PDF417 and Aztec for denser data.</p>
          </div>
          <div className="feature-card">
            <span className="icon">▤</span>
            <h3>Bulk Export</h3>
            <p>Generate hundreds of codes at once from a CSV, packaged as a ZIP.</p>
          </div>
          <div className="feature-card">
            <span className="icon">◎</span>
            <h3>Decoding</h3>
            <p>Upload a photo of any code and read its value back instantly.</p>
          </div>
        </div>
      </section>
    </>
  );
}
