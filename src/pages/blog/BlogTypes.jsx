import { Link } from "react-router-dom";
import BlogArticle from "../../components/BlogArticle.jsx";

export default function BlogTypes() {
  return (
    <BlogArticle
      eyebrow="Reference"
      title="Barcode Types Explained"
      meta="BarcodePro Team · Updated July 2026 · 6 min read"
      path="/blog/barcode-types-explained"
      seoTitle="Barcode Types Explained: CODE128, EAN, UPC and More | BarcodePro Blog"
      seoDescription="A plain-English reference for the most common barcode symbologies — CODE128, CODE39, EAN-13, UPC, ITF, Data Matrix, PDF417 and Aztec — and where each is used."
      dateIso="2026-07-01"
      illustration={
        <figure className="article-figure">
          <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four barcode symbology families: linear, retail, stacked, and 2D">
            <rect width="800" height="260" fill="#161f32" />
            <g transform="translate(40,40)">
              <rect width="160" height="140" rx="14" fill="#1e293b" stroke="#334155" />
              <rect x="30" y="30" width="100" height="55" fill="#ffffff" rx="3" />
              <text x="80" y="115" fill="#38bdf8" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" textAnchor="middle">CODE128/39</text>
              <text x="80" y="130" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="10.5" textAnchor="middle">general purpose</text>
            </g>
            <g transform="translate(230,40)">
              <rect width="160" height="140" rx="14" fill="#1e293b" stroke="#334155" />
              <rect x="20" y="30" width="120" height="55" fill="#ffffff" rx="3" />
              <text x="80" y="115" fill="#38bdf8" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" textAnchor="middle">EAN / UPC</text>
              <text x="80" y="130" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="10.5" textAnchor="middle">retail shelf</text>
            </g>
            <g transform="translate(420,40)">
              <rect width="160" height="140" rx="14" fill="#1e293b" stroke="#334155" />
              <rect x="25" y="35" width="110" height="45" fill="#ffffff" rx="3" />
              <text x="80" y="115" fill="#8b5cf6" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" textAnchor="middle">ITF-14 / PDF417</text>
              <text x="80" y="130" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="10.5" textAnchor="middle">cartons &amp; IDs</text>
            </g>
            <g transform="translate(610,40)">
              <rect width="160" height="140" rx="14" fill="#1e293b" stroke="#334155" />
              <rect x="40" y="28" width="80" height="80" fill="#ffffff" rx="3" />
              <text x="80" y="122" fill="#8b5cf6" fontFamily="Arial, sans-serif" fontSize="13" fontWeight="bold" textAnchor="middle">Data Matrix / QR</text>
              <text x="80" y="137" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="10.5" textAnchor="middle">2D, dense data</text>
            </g>
          </svg>
          <figcaption>Four broad families cover most real-world barcodes: general-purpose linear, retail numeric, stacked/carton, and dense 2D formats.</figcaption>
        </figure>
      }
    >
      <p>
        "Barcode" isn't one format — it's a family of symbologies, each designed for a different job. Here's a
        plain-English rundown of the ones you'll actually run into.
      </p>

      <h2>CODE128</h2>
      <p>
        A compact, high-density format that can encode the full ASCII character set — letters, numbers and symbols.
        It's the default choice for shipping labels, internal inventory codes, and anywhere you need a flexible,
        general-purpose barcode.
      </p>

      <h2>CODE39</h2>
      <p>
        An older, less dense format limited to uppercase letters, digits and a handful of symbols. It's still common
        in government, defense and some manufacturing settings because it doesn't require a checksum to read
        reliably.
      </p>

      <h2>EAN-13 and EAN-8</h2>
      <p>
        The standard retail barcode used across Europe and most of the world. EAN-13 encodes a 13-digit product
        number; EAN-8 is a shorter version for small packaging.
      </p>

      <h2>UPC-A and UPC-E</h2>
      <p>
        The North American counterpart to EAN, found on retail products throughout the US and Canada. UPC-E is a
        compressed version used when shelf space is tight.
      </p>

      <h2>ITF (Interleaved 2 of 5)</h2>
      <p>
        Common on cardboard shipping cartons and pallets. It's tolerant of the lower print quality typical of
        corrugated packaging.
      </p>

      <h2>Data Matrix</h2>
      <p>
        A compact 2D format that packs a lot of data into a very small square — used heavily in electronics
        manufacturing and to mark small medical or pharmaceutical items where space is extremely limited.
      </p>

      <h2>PDF417</h2>
      <p>
        A 2D stacked format capable of storing large amounts of data, used on driver's licenses, boarding passes, and
        shipping documents that need to carry structured information offline.
      </p>

      <figure className="article-figure">
        <img
          src="/assets/images/isbn-issn-datamatrix-collage.jpg"
          alt="Examples of ISBN, ISSN, and Data Matrix barcodes"
          style={{ width: "100%", background: "white", padding: 14, display: "block" }}
        />
        <figcaption>
          Publishing formats like ISBN and ISSN are really just EAN-13 codes with a special prefix — see the{" "}
          <Link to="/glossary" style={{ color: "var(--accent-3)" }}>glossary</Link> for the underlying encoding.
        </figcaption>
      </figure>

      <h2>Aztec</h2>
      <p>
        Another 2D format, popular for airline boarding passes and event tickets because it scans reliably even on a
        small phone screen.
      </p>

      <h2>Choosing the right one</h2>
      <p>
        If you're printing something for retail shelves, EAN or UPC is almost always mandatory. For internal
        logistics or inventory, CODE128 is the flexible default. If you need to pack in a lot of structured data on
        a small label, look at a 2D format like Data Matrix or PDF417. BarcodePro's{" "}
        <Link to="/" style={{ color: "var(--accent-3)" }}>generator</Link> supports the most common symbologies for
        free.
      </p>
    </BlogArticle>
  );
}
