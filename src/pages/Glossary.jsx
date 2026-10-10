import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

const TERMS = [
  { t: "Symbology", d: "The technical term for a specific barcode encoding standard — CODE128, EAN-13 and QR Code are all different symbologies. Each defines its own rules for how characters map to bars, spaces or modules." },
  { t: "Quiet Zone", d: "The blank margin required on either side of a barcode (or around a QR code). Scanners use this empty space to detect where the code starts and ends — cropping it too tight is one of the most common causes of a failed scan." },
  { t: "Check Digit", d: "A final digit added to formats like EAN-13 and UPC-A, calculated from the preceding digits using a fixed formula. It lets a scanner detect a misread or mistyped digit rather than silently recording the wrong number.", link: { to: "/check-digit-calculator", label: "check digit calculator", prefix: "Use our ", suffix: " to compute or validate one." } },
  { t: "GTIN (Global Trade Item Number)", d: "The umbrella term GS1 uses for the product identification numbers encoded in retail barcodes, including UPC-A (GTIN-12) and EAN-13 (GTIN-13).", link: { to: "/blog/gs1-ean-upc-explained", label: "GS1 guide", prefix: "See our ", suffix: " for how these numbers are assigned." } },
  { t: "GS1", d: "The nonprofit organization that administers global product barcode standards and assigns company prefixes, from which businesses generate their own range of GTINs." },
  { t: "Module", d: "The smallest single unit of a 2D code like a QR code — one of the individual black or white squares that make up the grid. A \"module count\" or \"version\" describes how many modules wide the whole code is." },
  { t: "Error Correction (QR Codes)", d: "Redundant data built into a QR code that lets it still be read correctly even if part of the code is damaged, dirty, or obscured. QR codes support four levels — L (7%), M (15%), Q (25%) and H (30%) — referring to the approximate percentage of the code that can be lost and still scan." },
  { t: "Finder Pattern", d: "The three large square markers in the corners of a QR code. Scanners use them to instantly locate the code in an image and determine its orientation, even if the photo is taken at a slight angle." },
  { t: "1D vs. 2D Barcode", d: "1D (linear) barcodes like CODE128 or EAN-13 encode data in a single horizontal line of bars and spaces. 2D barcodes like QR Code, Data Matrix and PDF417 encode data across a two-dimensional grid, allowing far more data in the same physical space." },
  { t: "CODE128", d: "A dense, general-purpose linear symbology that can encode the full ASCII character set. The default choice for shipping labels and internal inventory codes that don't need to match a retail standard." },
  { t: "EAN-13 / UPC-A", d: "The standard retail barcode formats — EAN-13 is used across Europe and most of the world, UPC-A primarily in the US and Canada. Both encode a numeric product identifier plus a check digit." },
  { t: "ITF-14", d: "A variant of the Interleaved 2 of 5 format sized and designed for printing on corrugated cardboard shipping cartons and pallets, tolerant of lower print quality than retail-shelf formats." },
  { t: "Data Matrix", d: "A compact 2D symbology that packs data into a very small square, commonly used to mark small electronics components or pharmaceutical packaging where space is extremely limited." },
  { t: "PDF417", d: "A 2D stacked symbology capable of storing large amounts of structured data, used on driver's licenses, boarding passes and shipping documents." },
  { t: "vCard", d: "A standard file format for encoding contact information (name, phone, email, company). QR codes can encode a vCard directly so a phone offers to save it straight into the address book instead of just opening a link." },
  { t: "Symbology Density", d: "How tightly a symbology packs data relative to its physical size. Denser symbologies fit more information into less space but require higher-resolution printing to stay scannable." },
];

export default function Glossary() {
  return (
    <>
      <Seo
        title="Barcode & QR Code Glossary | BarcodePro"
        description="Plain-English definitions of barcode and QR code terms: GTIN, quiet zone, symbology, checksum, error correction, module, GS1 and more."
        path="/glossary"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Barcode & QR Glossary", `${SITE}/glossary`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Reference</span>
        <h1>Barcode &amp; QR <span className="gradient-text">Glossary</span></h1>
        <p>Plain-English definitions for the terms you'll run into when working with barcodes and QR codes — from symbology to quiet zone to GTIN.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Labeled diagram of barcode and QR code terminology">
          <rect width="800" height="260" fill="#161f32" />
          <rect x="90" y="60" width="260" height="110" fill="#ffffff" rx="4" />
          <g transform="translate(115,80)" fill="#0f172a"><rect x="0" width="3" height="60" /><rect x="7" width="6" height="60" /><rect x="18" width="3" height="60" /></g>
          <text x="220" y="158" fill="#0f172a" fontFamily="Arial, sans-serif" fontSize="11" textAnchor="middle" fontWeight="bold">0 123456 789012</text>
          <rect x="90" y="60" width="18" height="110" fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3,3" />
          <line x1="99" y1="60" x2="99" y2="30" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="99" y="20" fill="#06b6d4" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">Quiet zone</text>
          <line x1="330" y1="150" x2="400" y2="200" stroke="#f87171" strokeWidth="1.5" />
          <text x="470" y="205" fill="#f87171" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">Check digit (last digit)</text>
          <rect x="480" y="55" width="120" height="120" fill="#ffffff" rx="4" />
          <g transform="translate(492,67)" fill="#0f172a">
            <rect x="0" y="0" width="28" height="28" /><rect x="7" y="7" width="14" height="14" fill="#ffffff" /><rect x="10" y="10" width="8" height="8" fill="#0f172a" />
          </g>
          <rect x="480" y="55" width="28" height="28" fill="none" stroke="#f87171" strokeWidth="2" />
          <line x1="494" y1="55" x2="640" y2="35" stroke="#f87171" strokeWidth="1.5" />
          <text x="700" y="30" fill="#f87171" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">Finder pattern</text>
        </svg>
        <figcaption>The terms defined below, pointed at the parts of a real barcode and QR code they describe.</figcaption>
      </figure>

      <section className="wrap-narrow" style={{ paddingBottom: 90 }}>
        {TERMS.map((item) => (
          <div className="faq-item" key={item.t}>
            <h2>{item.t}</h2>
            <p>
              {item.d}
              {item.link && (
                <>
                  {" "}
                  {item.link.prefix}
                  <Link to={item.link.to} style={{ color: "var(--accent-3)" }}>{item.link.label}</Link>
                  {item.link.suffix}
                </>
              )}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
