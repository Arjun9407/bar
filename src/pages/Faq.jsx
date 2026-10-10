import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

const FAQS = [
  { q: "Is BarcodePro free?", a: "Yes — every tool, including bulk export and the scanner, is free with no usage limits, no account, and no watermark on the output. We don't have a paid tier; the site is supported by advertising rather than subscriptions." },
  { q: "Do you store my barcodes or scanned images?", a: "No. Generation and decoding both happen locally in your browser using JavaScript; the values you type and the images you upload to the scanner are never transmitted to a server. You can verify this yourself by opening your browser's network tab while generating or scanning a code — you won't see any request carrying that data." },
  { q: "Can I use generated barcodes commercially?", a: "Yes, codes you generate are yours to use for any purpose, commercial included, with no attribution required. One caveat worth knowing: generating a valid EAN-13 or UPC-A barcode does not register a product number with GS1 or any retail authority. If you plan to sell through a major retailer or marketplace that validates GS1-issued numbers, you'll need an officially assigned prefix from GS1 — our generator will happily encode any 12–13 digit number you give it, but it doesn't check whether that number is registered to you." },
  { q: "Which barcode types are supported?", a: "CODE128, CODE39, EAN-13, EAN-8, UPC-A, UPC-E, ITF-14, MSI and Pharmacode on the linear side, plus QR Code as our 2D format.", link: { to: "/blog/barcode-types-explained", label: "barcode types guide", suffix: " for what each one is actually used for and how to pick between them." } },
  { q: "Can I download PNG and SVG?", a: "Yes — barcodes and QR codes can both be exported as PNG or SVG depending on the tool. PNG is the safer default for most printing workflows; SVG is worth using if you're placing the code into a vector design tool like Illustrator or Figma, since it scales without any loss of sharpness." },
  { q: "How does the Bulk Generator work?", a: "Upload a CSV (or paste a list) of values, pick a code type, and BarcodePro generates every code and packages them into a single downloadable ZIP, with each file named after its source value. It's built for batches up to about 500 values — past that, browser memory becomes the limiting factor, so very large runs are best split into a few smaller batches." },
  { q: "What image formats does the Scanner accept?", a: "JPG, PNG and WEBP. Clear, well-lit, straight-on photos decode most reliably — see the tips on the", link: { to: "/scanner", label: "scanner page", suffix: " for what tends to trip up a decode (glare, steep angles, motion blur, and a code that only fills a small part of the frame are the usual culprits)." } },
  { q: "Why did my barcode fail to scan after I printed it?", a: "This is almost always a printing issue rather than an encoding one. The most common causes, in order of frequency: the code was shrunk below its symbology's minimum reliable size, the \"quiet zone\" margin around the code got cropped off, the printed contrast was too low (grey-on-white, or a busy background image), or the file was compressed as a low-quality JPEG before printing. Our", link: { to: "/blog/printing-barcode-labels", label: "printing guide", suffix: " walks through each of these in detail." } },
  { q: "What's the difference between a barcode and a QR code, and which should I use?", a: "A linear barcode (CODE128, EAN-13, UPC-A, etc.) stores a short ID and is read by cheap, extremely fast dedicated scanners — the standard for retail checkout and warehouse logistics. A QR code stores far more data (a full URL, WiFi credentials, a contact card) and is read by any phone camera, which makes it the better fit for anything a consumer scans with their own device. Our", link: { to: "/blog/qr-vs-barcode", label: "QR vs. barcode comparison", suffix: " covers this in more depth." } },
  { q: "Do I need an internet connection to use BarcodePro?", a: "You need a connection to load the page the first time, but generation and scanning themselves happen entirely in your browser's JavaScript engine. In practice this means the tools are fast even on a slow or unstable connection, since there's no round-trip to a server involved once the page has loaded." },
  { q: "Can I customize the color of a QR code?", a: "Yes, the", link: { to: "/qr-generator", label: "QR code generator", suffix: " lets you set both a foreground and background color. Keep in mind that scanners rely on strong contrast between the two — a QR code with low contrast between foreground and background (light grey on white, for instance) can fail to scan even though it looks fine on a bright screen. Dark-on-light combinations with a clear contrast difference are the safest choice." } },
  { q: "What's the maximum amount of text a QR code can hold?", a: "It depends on the error-correction level and content type, but a QR code can realistically hold a few thousand alphanumeric characters at the largest module count. In practice, most real-world uses — a URL, a WiFi password, a short vCard — use only a small fraction of that capacity. Cramming in unnecessarily long text does increase the module count and makes the resulting code visually denser and slightly harder to scan from a distance, so shorter payloads tend to scan more reliably." },
  { q: "Does BarcodePro work on mobile devices?", a: "Yes, all tools are fully responsive and work on phone and tablet browsers, including uploading a photo directly from your camera roll into the scanner." },
];

export default function Faq() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a + (f.link ? ` ${f.link.label}${f.link.suffix}` : "") },
    })),
  };

  return (
    <>
      <Seo
        title="FAQ | BarcodePro"
        description="Frequently asked questions about BarcodePro's barcode generator, QR code generator, bulk export and scanner tools."
        path="/faq"
        jsonLd={[faqJsonLd, breadcrumbJsonLd([["Home", `${SITE}/`], ["FAQ", `${SITE}/faq`]])]}
      />

      <section className="page-hero">
        <span className="eyebrow">Support</span>
        <h1>Frequently Asked <span className="gradient-text">Questions</span></h1>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A speech bubble asking a question next to a barcode, with a checkmark answer bubble">
          <rect width="800" height="220" fill="#161f32" />
          <g transform="translate(70,50)">
            <rect width="260" height="90" rx="20" fill="#1e293b" stroke="#334155" />
            <text x="130" y="45" fill="#38bdf8" fontFamily="Arial, sans-serif" fontSize="30" fontWeight="bold" textAnchor="middle">?</text>
            <text x="130" y="70" fill="#96a9c7" fontFamily="Arial, sans-serif" fontSize="12" textAnchor="middle">"Why won't my barcode scan?"</text>
          </g>
          <g transform="translate(360,90)">
            <rect x="0" y="0" width="90" height="45" fill="#ffffff" rx="4" />
          </g>
          <g transform="translate(490,45)">
            <rect width="240" height="90" rx="20" fill="#1e293b" stroke="#8b5cf6" />
            <circle cx="40" cy="45" r="16" fill="#8b5cf6" />
            <path d="M33,45 l5,5 l10,-11" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x="150" y="40" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="12.5" textAnchor="middle">Usually it's the</text>
            <text x="150" y="58" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="12.5" textAnchor="middle">quiet zone, size,</text>
            <text x="150" y="76" fill="#e2e8f0" fontFamily="Arial, sans-serif" fontSize="12.5" textAnchor="middle">or contrast.</text>
          </g>
        </svg>
        <figcaption>Most questions about barcodes and QR codes come down to a handful of recurring answers — here they are.</figcaption>
      </figure>

      <section className="wrap-narrow" style={{ paddingBottom: 90 }}>
        {FAQS.map((f) => (
          <div className="faq-item" key={f.q}>
            <h2>{f.q}</h2>
            <p>
              {f.a}
              {f.link && (
                <>
                  {" "}
                  <Link to={f.link.to} style={{ color: "var(--accent-3)" }}>{f.link.label}</Link>
                  {f.link.suffix}
                </>
              )}
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
