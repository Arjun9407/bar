import { Link } from "react-router-dom";
import BlogArticle from "../../components/BlogArticle.jsx";

export default function BlogHistory() {
  return (
    <BlogArticle
      eyebrow="History"
      title={<>A Brief History of the <span className="gradient-text">Barcode</span></>}
      meta="BarcodePro Team · Updated August 2026 · 5 min read"
      path="/blog/history-of-barcodes"
      seoTitle="A Brief History of the Barcode | BarcodePro Blog"
      seoDescription="From a 1949 patent sketched in sand to the laser scanner beep at checkout: how the barcode became the backbone of modern retail and logistics."
      dateIso="2026-08-01"
      illustration={
        <figure className="article-figure">
          <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Timeline of barcode history from 1949 to 1994">
            <rect width="800" height="260" fill="#161f32" />
            <line x1="60" y1="140" x2="740" y2="140" stroke="#334155" strokeWidth="3" />
            <g fontFamily="Arial, sans-serif">
              <circle cx="120" cy="140" r="9" fill="#06b6d4" />
              <text x="120" y="100" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">1949</text>
              <text x="120" y="120" fill="#96a9c7" fontSize="11.5" textAnchor="middle">Patent filed</text>
              <text x="120" y="175" fill="#96a9c7" fontSize="11.5" textAnchor="middle">Bullseye</text>
              <text x="120" y="190" fill="#96a9c7" fontSize="11.5" textAnchor="middle">pattern sketched</text>

              <circle cx="340" cy="140" r="9" fill="#38bdf8" />
              <text x="340" y="100" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">1973</text>
              <text x="340" y="120" fill="#96a9c7" fontSize="11.5" textAnchor="middle">UPC standard</text>
              <text x="340" y="175" fill="#96a9c7" fontSize="11.5" textAnchor="middle">adopted by</text>
              <text x="340" y="190" fill="#96a9c7" fontSize="11.5" textAnchor="middle">grocery industry</text>

              <circle cx="530" cy="140" r="9" fill="#8b5cf6" />
              <text x="530" y="100" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">1974</text>
              <text x="530" y="120" fill="#96a9c7" fontSize="11.5" textAnchor="middle">First scan</text>
              <text x="530" y="175" fill="#96a9c7" fontSize="11.5" textAnchor="middle">Wrigley's gum,</text>
              <text x="530" y="190" fill="#96a9c7" fontSize="11.5" textAnchor="middle">Troy, Ohio</text>

              <circle cx="700" cy="140" r="9" fill="#06b6d4" />
              <text x="700" y="100" fill="#e2e8f0" fontSize="15" fontWeight="bold" textAnchor="middle">1994</text>
              <text x="700" y="120" fill="#96a9c7" fontSize="11.5" textAnchor="middle">QR Code</text>
              <text x="700" y="175" fill="#96a9c7" fontSize="11.5" textAnchor="middle">invented by</text>
              <text x="700" y="190" fill="#96a9c7" fontSize="11.5" textAnchor="middle">Denso Wave</text>
            </g>
          </svg>
          <figcaption>From a beach-sand sketch to a beep at checkout: the key moments in barcode history.</figcaption>
        </figure>
      }
    >
      <p>
        Every time a barcode beeps at checkout, it's the end product of a problem retailers were trying to solve
        nearly eighty years ago: how do you get a product's identity into a computer without a cashier typing it in
        by hand?
      </p>

      <h2>The 1949 patent, drawn in sand</h2>
      <p>
        The earliest known barcode concept came from Norman Joseph Woodland and Bernard Silver, two graduate students
        who filed a patent in 1949 after Woodland reportedly sketched an early version of the idea in the sand on a
        beach, dragging his fingers to form concentric circles inspired by Morse code. Their original design was a
        circular "bullseye" pattern rather than the straight lines we're used to today, meant to be read from any
        angle.
      </p>
      <p>
        The technology existed decades before the infrastructure did — there was no cheap, reliable laser scanner or
        standardized numbering system to make it practical at scale, so the idea largely sat dormant through the
        1950s and 60s.
      </p>

      <h2>The industry standard that made it real</h2>
      <p>
        Grocery retailers and manufacturers spent much of the 1960s and early 70s trying to agree on a shared
        numbering standard — without one, a barcode scanner at one store couldn't reliably interpret a code printed
        by a different manufacturer. That effort led to the creation of the Uniform Product Code (UPC) standard in
        1973, administered by what would eventually become GS1, the same organization that still governs GTIN
        numbering today.
      </p>

      <h2>The first scan</h2>
      <p>
        On June 26, 1974, a pack of Wrigley's chewing gum became the first retail product scanned using a UPC
        barcode at a supermarket in Troy, Ohio. That pack of gum is now preserved in the Smithsonian's National
        Museum of American History — a small, unglamorous object that marks the moment barcodes went from patent
        filing to daily retail infrastructure.
      </p>

      <h2>From laser scanners to 2D codes</h2>
      <p>
        For the next two decades, barcodes remained almost exclusively linear (1D) — a single row of bars read by a
        sweeping laser beam. That changed in 1994, when Denso Wave, a subsidiary of Toyota, developed the QR code to
        track automotive parts through manufacturing. Its two-dimensional grid could hold far more data than a
        linear barcode in the same physical space, and unlike a laser scanner, it could be read by an ordinary
        camera — a detail that turned out to matter enormously once smartphones arrived.
      </p>

      <h2>Why QR codes took off outside manufacturing</h2>
      <p>
        QR codes existed for over a decade before they became a familiar sight on restaurant tables and marketing
        posters. The shift tracks almost exactly with smartphone camera adoption: once nearly everyone was carrying a
        device that could scan a 2D code without any dedicated hardware, QR codes became the obvious bridge between a
        printed object and a website, menu, or WiFi network.
      </p>

      <h2>Where things stand now</h2>
      <p>
        Modern retail and logistics run on a mix of both generations of technology: linear formats like UPC-A,
        EAN-13 and CODE128 still handle the vast majority of point-of-sale and inventory scanning, precisely because
        the hardware is cheap, fast, and deeply entrenched in existing systems. QR codes and other 2D formats have
        carved out the consumer-facing and data-dense use cases that linear barcodes were never designed for. See our{" "}
        <Link to="/blog/qr-vs-barcode" style={{ color: "var(--accent-3)" }}>QR vs. barcode comparison</Link> for how
        to choose between them for a specific project today.
      </p>
    </BlogArticle>
  );
}
