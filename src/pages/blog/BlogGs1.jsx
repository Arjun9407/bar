import { Link } from "react-router-dom";
import BlogArticle from "../../components/BlogArticle.jsx";

export default function BlogGs1() {
  return (
    <BlogArticle
      eyebrow="Reference"
      title={<>GS1, EAN and UPC <span className="gradient-text">Explained</span></>}
      meta="BarcodePro Team · Updated August 2026 · 6 min read"
      path="/blog/gs1-ean-upc-explained"
      seoTitle="GS1, EAN and UPC Explained: How Retail Barcode Numbers Actually Work | BarcodePro Blog"
      seoDescription="What GS1 prefixes, EAN-13 and UPC-A check digits actually mean, why marketplaces validate them, and when you do (and don't) need an official number."
      dateIso="2026-08-01"
      illustration={
        <figure className="article-figure">
          <svg viewBox="0 0 800 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Breakdown of an EAN-13 number into country prefix, company prefix, product number and check digit">
            <rect width="800" height="240" fill="#161f32" />
            <text x="400" y="35" fill="#38bdf8" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" textAnchor="middle">Anatomy of an EAN-13 number</text>
            <g fontFamily="Arial, sans-serif">
              <rect x="60" y="70" width="90" height="46" rx="6" fill="#06b6d4" opacity="0.85" />
              <text x="105" y="99" fill="#0f172a" fontSize="18" fontWeight="bold" textAnchor="middle">0 12</text>
              <text x="105" y="140" fill="#a5e6f2" fontSize="11.5" textAnchor="middle">Country /</text>
              <text x="105" y="154" fill="#a5e6f2" fontSize="11.5" textAnchor="middle">GS1 prefix</text>

              <rect x="160" y="70" width="150" height="46" rx="6" fill="#8b5cf6" opacity="0.85" />
              <text x="235" y="99" fill="#0f172a" fontSize="18" fontWeight="bold" textAnchor="middle">34567</text>
              <text x="235" y="140" fill="#d8c9fb" fontSize="11.5" textAnchor="middle">Company prefix</text>
              <text x="235" y="154" fill="#d8c9fb" fontSize="11.5" textAnchor="middle">(assigned by GS1)</text>

              <rect x="320" y="70" width="150" height="46" rx="6" fill="#38bdf8" opacity="0.85" />
              <text x="395" y="99" fill="#0f172a" fontSize="18" fontWeight="bold" textAnchor="middle">89012</text>
              <text x="395" y="140" fill="#a5e6f2" fontSize="11.5" textAnchor="middle">Product number</text>

              <rect x="480" y="70" width="70" height="46" rx="6" fill="#f87171" opacity="0.9" />
              <text x="515" y="99" fill="#1e293b" fontSize="18" fontWeight="bold" textAnchor="middle">6</text>
              <text x="515" y="140" fill="#fca5a5" fontSize="11.5" textAnchor="middle">Check</text>
              <text x="515" y="154" fill="#fca5a5" fontSize="11.5" textAnchor="middle">digit</text>

              <rect x="600" y="60" width="150" height="66" fill="#ffffff" rx="4" />
              <text x="675" y="145" fill="#96a9c7" fontSize="11.5" textAnchor="middle">printed &amp; scanned</text>
            </g>
          </svg>
          <figcaption>Only the last digit is a checksum — everything else is a structured identifier, most of it assigned once by GS1.</figcaption>
        </figure>
      }
    >
      <p>
        If you've ever generated a barcode for a product and wondered why a marketplace rejected it, the answer
        usually comes down to one thing: the difference between a barcode that's correctly formatted and a barcode
        number that's officially registered.
      </p>

      <h2>What GS1 actually is</h2>
      <p>
        GS1 is the nonprofit organization that administers the global system of product identification numbers used
        in EAN and UPC barcodes. When a company registers with GS1, it's assigned a company prefix, and from that
        prefix, the company can generate its own range of product numbers (GTINs) without needing to check in with
        GS1 for every new product.
      </p>

      <h2>EAN-13 vs. UPC-A: what's the actual difference</h2>
      <p>
        UPC-A is a 12-digit format used primarily in the US and Canada; EAN-13 is a 13-digit format used across
        Europe and most of the rest of the world, and it can also encode UPC-A numbers by prefixing a zero. Modern
        point-of-sale scanners read both formats interchangeably in almost all markets.
      </p>

      <h2>What the check digit is for</h2>
      <p>
        The last digit of an EAN-13 or UPC-A number isn't part of the product identifier — it's a check digit,
        calculated from all the preceding digits using a fixed formula. Its only job is error detection. Our{" "}
        <Link to="/check-digit-calculator" style={{ color: "var(--accent-3)" }}>check digit calculator</Link> works
        out the correct value automatically.
      </p>

      <h2>Do you need an officially registered number?</h2>
      <p>This depends entirely on where the barcode is going:</p>
      <ul>
        <li><strong>Internal use only:</strong> no registration needed. Any correctly formatted, correctly check-digited number will scan and work fine within a closed system.</li>
        <li><strong>Selling through a major retailer or large marketplace:</strong> these often validate that your barcode prefix is registered to your company through GS1's database.</li>
        <li><strong>Selling through smaller or independent marketplaces:</strong> requirements vary widely — check the specific platform's seller policy.</li>
      </ul>
      <p>
        A generator can produce a correctly formatted, correctly check-digited barcode for any number you provide.
        What it can't do is confirm that number is registered to you — that's a separate step through GS1.
      </p>

      <h2>The takeaway</h2>
      <p>
        For internal logistics, testing, or any closed system, generate freely —{" "}
        <Link to="/" style={{ color: "var(--accent-3)" }}>CODE128</Link> is often the more flexible choice since it
        isn't tied to a numbering registry at all. For retail-facing products going through a channel that validates
        GS1 numbers, register a proper prefix first.
      </p>
    </BlogArticle>
  );
}
