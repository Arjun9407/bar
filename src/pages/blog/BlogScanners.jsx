import { Link } from "react-router-dom";
import BlogArticle from "../../components/BlogArticle.jsx";

export default function BlogScanners() {
  return (
    <BlogArticle
      eyebrow="How It Works"
      title={<>How Barcode Scanners <span className="gradient-text">Actually Read a Code</span></>}
      meta="BarcodePro Team · Updated August 2026 · 6 min read"
      path="/blog/how-scanners-work"
      seoTitle="How Barcode Scanners Actually Read a Code | BarcodePro Blog"
      seoDescription="A look under the hood at laser and camera-based scanning, why QR codes have corner squares, and what causes failed reads."
      dateIso="2026-08-01"
      illustration={
        <figure className="article-figure">
          <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of a laser scanner reading a barcode and a camera scanner reading a QR code via finder patterns">
            <rect width="800" height="260" fill="#161f32" />
            <text x="200" y="35" fill="#38bdf8" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">Laser sweep (1D)</text>
            <rect x="90" y="70" width="220" height="90" fill="#ffffff" rx="4" />
            <g transform="translate(100,80)" fill="#0f172a"><rect x="0" width="3" height="70" /><rect x="7" width="6" height="70" /><rect x="18" width="3" height="70" /></g>
            <line x1="90" y1="115" x2="310" y2="115" stroke="#ef4444" strokeWidth="2" opacity="0.85" />
            <circle cx="90" cy="115" r="4" fill="#ef4444" />
            <circle cx="310" cy="115" r="4" fill="#ef4444" />
            <text x="200" y="190" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">Beam measures reflected light</text>
            <text x="200" y="206" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">across a single line</text>
            <line x1="400" y1="30" x2="400" y2="230" stroke="#334155" strokeWidth="1.5" strokeDasharray="6,6" />
            <text x="600" y="35" fill="#8b5cf6" fontFamily="Arial, sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle">Camera capture (2D)</text>
            <rect x="530" y="65" width="140" height="140" fill="#ffffff" rx="4" />
            <g transform="translate(545,80)" fill="#0f172a">
              <rect x="0" y="0" width="28" height="28" /><rect x="7" y="7" width="14" height="14" fill="#ffffff" /><rect x="10" y="10" width="8" height="8" fill="#0f172a" />
              <rect x="82" y="0" width="28" height="28" /><rect x="89" y="7" width="14" height="14" fill="#ffffff" /><rect x="92" y="10" width="8" height="8" fill="#0f172a" />
              <rect x="0" y="82" width="28" height="28" /><rect x="7" y="89" width="14" height="14" fill="#ffffff" /><rect x="10" y="92" width="8" height="8" fill="#0f172a" />
            </g>
            <rect x="540" y="75" width="24" height="24" fill="none" stroke="#f87171" strokeWidth="2" />
            <rect x="626" y="75" width="24" height="24" fill="none" stroke="#f87171" strokeWidth="2" />
            <rect x="540" y="161" width="24" height="24" fill="none" stroke="#f87171" strokeWidth="2" />
            <text x="600" y="222" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">Finder patterns locate &amp;</text>
            <text x="600" y="238" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">orient the whole grid</text>
          </svg>
          <figcaption>A laser measures reflected light along one line; a camera captures a full grid and finds it using corner markers.</figcaption>
        </figure>
      }
    >
      <p>
        A barcode scanner turning a pattern of black bars into a product name feels almost instant, but there are a
        few distinct steps happening behind that beep — and understanding them explains why some perfectly legible
        codes still fail to scan.
      </p>

      <h2>Laser scanners: reading light, not shapes</h2>
      <p>
        A classic laser scanner sweeps a thin beam of light across the barcode and measures how much light bounces
        back. Black bars absorb light and reflect very little; white spaces reflect much more. Because a laser
        scanner is measuring reflected light rather than analyzing a full image, it's extremely fast — but it also
        means contrast matters enormously.
      </p>

      <h2>Camera-based (imaging) scanners</h2>
      <p>
        Modern handheld scanners, phone apps, and most 2D-capable scanners use a small camera sensor instead of a
        laser. They capture a full image of the code, then run image-processing software to locate the code, correct
        for skew or rotation, and decode the pattern. This is what makes 2D formats like QR Code possible in the
        first place. This is also how our own <Link to="/scanner" style={{ color: "var(--accent-3)" }}>browser-based
        scanner</Link> works.
      </p>

      <h2>Why QR codes have those three corner squares</h2>
      <p>
        The three large square patterns in the corners of every QR code aren't decorative — they're finder patterns
        that let a scanner instantly locate the code and work out its orientation, even at a slight angle.
      </p>

      <h2>Why some scans fail even when the code "looks fine"</h2>
      <ul>
        <li><strong>Insufficient quiet zone:</strong> scanners use the blank margin to know where the code starts and ends.</li>
        <li><strong>Low print resolution:</strong> thermal and low-end inkjet printers can blur bars packed close together.</li>
        <li><strong>Specular glare:</strong> a laminated or glossy label under bright light can erase part of the code.</li>
        <li><strong>Curved or wrinkled surfaces:</strong> distorts the geometry the decoder expects.</li>
      </ul>

      <h2>What this means for generating your own codes</h2>
      <p>
        Keep the quiet zone intact, keep contrast high, size the code generously, and print at a resolution that
        keeps bars distinct. Our{" "}
        <Link to="/blog/printing-barcode-labels" style={{ color: "var(--accent-3)" }}>printing guide</Link> covers
        the specifics, and you can test any code you generate immediately using our own{" "}
        <Link to="/scanner" style={{ color: "var(--accent-3)" }}>scanner tool</Link>.
      </p>
    </BlogArticle>
  );
}
