import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function UseCases() {
  return (
    <>
      <Seo
        title="Barcode & QR Code Use Cases by Industry | BarcodePro"
        description="How retail, warehousing, events, hospitality, healthcare and education teams actually use barcodes and QR codes, and which format fits each."
        path="/use-cases"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Barcode & QR Use Cases", `${SITE}/use-cases`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">By Industry</span>
        <h1>Barcode &amp; QR <span className="gradient-text">Use Cases</span></h1>
        <p>Different industries lean on different formats and workflows. Here's how BarcodePro's tools map onto the ways real teams actually use barcodes and QR codes.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Six icons representing retail, warehousing, events, hospitality, healthcare, and education">
          <rect width="800" height="160" fill="#161f32" />
          <g fontFamily="Arial, sans-serif" fontSize="11" textAnchor="middle" fill="#96a9c7">
            <g transform="translate(90,40)"><circle r="26" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" /><text y="6" fontSize="20">🛒</text></g>
            <text x="90" y="105" fill="#a5e6f2">Retail</text>
            <g transform="translate(220,40)"><circle r="26" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" /><text y="6" fontSize="20">📦</text></g>
            <text x="220" y="105" fill="#d8c9fb">Warehousing</text>
            <g transform="translate(350,40)"><circle r="26" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" /><text y="6" fontSize="20">🎟️</text></g>
            <text x="350" y="105">Events</text>
            <g transform="translate(480,40)"><circle r="26" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" /><text y="6" fontSize="20">🍽️</text></g>
            <text x="480" y="105" fill="#a5e6f2">Hospitality</text>
            <g transform="translate(610,40)"><circle r="26" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" /><text y="6" fontSize="20">💊</text></g>
            <text x="610" y="105" fill="#d8c9fb">Healthcare</text>
            <g transform="translate(710,40)"><circle r="26" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" /><text y="6" fontSize="20">🎓</text></g>
            <text x="710" y="105">Education</text>
          </g>
        </svg>
        <figcaption>Same underlying formats, six very different workflows — jump to the section below that matches yours.</figcaption>
      </figure>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>Retail &amp; small e-commerce</h2>
        <p>
          Retailers selling through their own store or a marketplace typically need EAN-13 or UPC-A codes tied to a
          registered GTIN (see our{" "}
          <Link to="/blog/gs1-ean-upc-explained" style={{ color: "var(--accent-3)" }}>GS1 guide</Link> if you're not
          sure whether you need one). Once you have a legitimate product number, the{" "}
          <Link to="/" style={{ color: "var(--accent-3)" }}>barcode generator</Link> renders a print-ready image in
          seconds, and the <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link>{" "}
          handles an entire product catalog at once from a CSV export.
        </p>
        <div style={{ margin: "26px 0" }}>
          <img src="/assets/images/barcode-qr-label-collage.jpg" alt="Assortment of retail barcode and QR product labels" style={{ maxWidth: 420, width: "100%", borderRadius: 16 }} />
        </div>

        <h2>Warehousing &amp; logistics</h2>
        <p>
          Internal SKUs, pallet labels and case codes usually don't need to match a public retail standard, which
          makes CODE128 the workhorse format. ITF-14 remains the standard for corrugated cardboard cartons, since it
          tolerates lower print quality. Teams processing large rollouts lean on the{" "}
          <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link> to produce hundreds
          of labels in one export, then the{" "}
          <Link to="/label-sheet-generator" style={{ color: "var(--accent-3)" }}>label sheet generator</Link> to
          print them.
        </p>

        <h2>Events &amp; ticketing</h2>
        <p>
          QR codes dominate here because they're readable by any attendee's phone camera and by inexpensive check-in
          scanners alike, and their built-in error correction keeps them scannable even on a slightly creased printed
          ticket. The <Link to="/serial-generator" style={{ color: "var(--accent-3)" }}>serial generator</Link> pairs
          well with the QR generator for producing one unique code per attendee.
        </p>

        <h2>Restaurants &amp; hospitality</h2>
        <p>
          Digital menus, WiFi login cards for guests, and review-page links on table tents are now almost universally
          QR-based. The QR generator's dedicated WiFi payload type builds the connection string automatically.
        </p>

        <h2>Healthcare &amp; pharmaceuticals</h2>
        <p>
          Space-constrained packaging commonly uses Data Matrix, which packs a lot of structured data into a very
          small square. Our{" "}
          <Link to="/blog/barcode-types-explained" style={{ color: "var(--accent-3)" }}>barcode types guide</Link>{" "}
          explains where Data Matrix fits relative to more common symbologies.
        </p>

        <h2>Education &amp; personal projects</h2>
        <p>
          Students and hobbyists typically don't need registered numbers at all — any correctly formatted code will
          scan fine within a closed system. This is one of the few cases where you can freely choose whichever
          symbology best fits the assignment without worrying about GS1 registration.
        </p>

        <h2>Software testing &amp; QA</h2>
        <p>
          Developers integrating a barcode scanner into a point-of-sale or inventory app often need a batch of
          realistic test codes. The <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk
          generator</Link> combined with the <Link to="/scanner" style={{ color: "var(--accent-3)" }}>scanner</Link>{" "}
          makes it easy to generate a batch and verify your integration decodes it correctly.
        </p>
      </section>
    </>
  );
}
