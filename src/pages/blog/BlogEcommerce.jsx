import { Link } from "react-router-dom";
import BlogArticle from "../../components/BlogArticle.jsx";

export default function BlogEcommerce() {
  return (
    <BlogArticle
      eyebrow="How-To"
      title="Barcodes for E-Commerce & Shipping"
      meta="BarcodePro Team · Updated August 2026 · 6 min read"
      path="/blog/barcodes-ecommerce-shipping"
      seoTitle="Barcodes for E-Commerce & Shipping: A Practical Guide | BarcodePro Blog"
      seoDescription="Which barcode format to use for product listings, shipping labels and carrier tracking, and how to avoid the most common e-commerce barcode mistakes."
      dateIso="2026-08-01"
      illustration={
        <figure className="article-figure">
          <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A shipping carton with a product barcode, an internal SKU code, and a QR code for the customer">
            <rect width="800" height="260" fill="#161f32" />
            <rect x="260" y="45" width="280" height="180" rx="8" fill="#c99a63" />
            <rect x="260" y="45" width="280" height="180" rx="8" fill="none" stroke="#8a6636" strokeWidth="3" />
            <line x1="260" y1="105" x2="540" y2="105" stroke="#8a6636" strokeWidth="2" />
            <rect x="290" y="120" width="110" height="45" fill="#ffffff" rx="3" />
            <text x="345" y="180" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="10.5" textAnchor="middle">EAN-13 (product)</text>
            <rect x="420" y="120" width="70" height="70" fill="#ffffff" rx="3" />
            <text x="455" y="205" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="10.5" textAnchor="middle">QR (returns/reviews)</text>
            <text x="400" y="35" fill="#38bdf8" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">One box, three separate codes</text>
            <g transform="translate(40,90)">
              <rect width="150" height="30" rx="6" fill="#1e293b" stroke="#06b6d4" />
              <text x="75" y="20" fill="#a5e6f2" fontFamily="Arial, sans-serif" fontSize="11" textAnchor="middle">SKU: CODE128</text>
            </g>
            <g transform="translate(610,90)">
              <rect width="150" height="30" rx="6" fill="#1e293b" stroke="#8b5cf6" />
              <text x="75" y="20" fill="#d8c9fb" fontFamily="Arial, sans-serif" fontSize="11" textAnchor="middle">Carton: ITF-14</text>
            </g>
          </svg>
          <figcaption>Product identity, internal SKU, carton code and customer-facing QR are four separate jobs, even on the same package.</figcaption>
        </figure>
      }
    >
      <p>
        Selling online involves more barcode decisions than most first-time sellers expect: a product listing
        barcode is not the same thing as a shipping label barcode, and mixing the two up is one of the more common
        sources of rejected listings and misrouted packages.
      </p>

      <h2>Product listing barcodes: EAN-13 / UPC-A</h2>
      <p>
        If you're listing a physical product on a marketplace that validates barcodes, you'll typically need an
        EAN-13 or UPC-A number tied to a registered GTIN. Our{" "}
        <Link to="/blog/gs1-ean-upc-explained" style={{ color: "var(--accent-3)" }}>GS1 guide</Link> covers when you
        actually need an officially registered number versus when an internally consistent number is enough.
      </p>

      <h2>Internal SKUs: CODE128</h2>
      <p>
        Separately from any public-facing product barcode, most sellers also want an internal SKU code for their own
        inventory system. CODE128 is the natural choice here because it accepts letters, numbers and symbols, so you
        can encode a human-readable SKU like "TSHIRT-BLU-L" directly.
      </p>

      <h2>Shipping labels: it depends on the carrier</h2>
      <p>
        Shipping carriers generate their own tracking barcodes as part of the label creation process. ITF-14 remains
        the standard for cartons, chosen specifically because it tolerates the lower print quality typical of
        corrugated cardboard.
      </p>

      <h2>QR codes in the shipping and post-purchase flow</h2>
      <p>
        QR codes have become common in the post-purchase experience: a QR code on a packing slip linking to a
        returns portal, a "leave a review" QR on an insert card, or a warranty-registration QR on the product itself.
      </p>

      <h2>A practical checklist before your first print run</h2>
      <ul>
        <li>Confirm whether your sales channel actually validates GTIN registration, or just requires "a" barcode.</li>
        <li>Keep internal SKUs and public product barcodes as two clearly separate systems.</li>
        <li>Generate a test batch and scan it with our own <Link to="/scanner" style={{ color: "var(--accent-3)" }}>scanner tool</Link> before committing to a full print run.</li>
        <li>For any barcode that will be printed at a small size, review our <Link to="/blog/printing-barcode-labels" style={{ color: "var(--accent-3)" }}>printing guide</Link> first.</li>
        <li>If you're generating more than a handful of codes, use the <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link> from a CSV export of your catalog.</li>
      </ul>

      <h2>The short version</h2>
      <p>
        Treat product identity (EAN-13/UPC-A), internal tracking (CODE128), carton-level codes (ITF-14) and
        customer-facing links (QR) as four separate jobs, even though they might all end up printed on packaging that
        ships out the same day.
      </p>
    </BlogArticle>
  );
}
