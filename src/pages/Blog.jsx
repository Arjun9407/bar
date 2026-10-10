import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";
import { SITE } from "../components/Seo.jsx";

const POSTS = [
  { to: "/blog/qr-vs-barcode", tag: "Guide", title: "QR Code vs. Barcode: Which Should You Use?", desc: "A practical breakdown of what each format is good at, so you can pick the right one for packaging, tickets, inventory or marketing." },
  { to: "/blog/barcode-types-explained", tag: "Reference", title: "Barcode Types Explained: CODE128, EAN, UPC and More", desc: "A plain-English tour of the most common barcode symbologies and where each one is actually used in the real world." },
  { to: "/blog/printing-barcode-labels", tag: "How-To", title: "How to Print Barcode Labels That Actually Scan", desc: "Sizing, contrast, quiet zones and printer settings — the small details that make the difference between a scan and a failed read." },
  { to: "/blog/gs1-ean-upc-explained", tag: "Reference", title: "GS1, EAN and UPC Explained", desc: "What GS1 prefixes and check digits actually mean, and when you do — and don't — need an officially registered barcode number." },
  { to: "/blog/how-scanners-work", tag: "How It Works", title: "How Barcode Scanners Actually Read a Code", desc: "A look under the hood at laser and camera-based scanning, why QR codes have corner squares, and what causes failed reads." },
  { to: "/blog/barcodes-ecommerce-shipping", tag: "How-To", title: "Barcodes for E-Commerce & Shipping", desc: "Product listing barcodes, internal SKUs, carton codes and post-purchase QR codes — which format does which job." },
  { to: "/blog/history-of-barcodes", tag: "History", title: "A Brief History of the Barcode", desc: "From a 1949 patent sketched in sand to a pack of Wrigley's gum in the Smithsonian — how the barcode became retail infrastructure." },
];

export default function Blog() {
  return (
    <>
      <Seo
        title="Blog | BarcodePro"
        description="Guides on barcodes and QR codes: which format to use, how to print labels correctly, and how the technology works."
        path="/blog"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Blog", `${SITE}/blog`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Guides</span>
        <h1>The BarcodePro <span className="gradient-text">Blog</span></h1>
        <p>Practical guides on barcodes and QR codes — which format to pick, how to print labels that actually scan, and how the technology works under the hood.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A stack of article pages next to a magnifying glass, representing a library of guides">
          <rect width="800" height="170" fill="#161f32" />
          <g transform="translate(320,25)">
            <rect x="16" y="10" width="130" height="110" rx="6" fill="#334155" />
            <rect x="8" y="4" width="130" height="110" rx="6" fill="#1e293b" stroke="#8b5cf6" />
            <line x1="24" y1="30" x2="122" y2="30" stroke="#8b5cf6" strokeWidth="3" />
            <line x1="24" y1="48" x2="122" y2="48" stroke="#475569" strokeWidth="2" />
          </g>
          <g transform="translate(500,80)">
            <circle r="28" fill="none" stroke="#38bdf8" strokeWidth="4" />
            <line x1="20" y1="20" x2="42" y2="42" stroke="#38bdf8" strokeWidth="5" strokeLinecap="round" />
          </g>
          <g fontFamily="Arial, sans-serif" fontSize="12" fill="#96a9c7">
            <text x="150" y="60">History &amp;</text><text x="150" y="76">Reference</text>
            <text x="640" y="60" fill="#a5e6f2">How-To &amp;</text><text x="640" y="76" fill="#a5e6f2">Comparisons</text>
          </g>
        </svg>
        <figcaption>Seven guides covering history, symbology reference, printing, GS1 numbering, and how scanners actually work.</figcaption>
      </figure>

      <section className="wrap" style={{ paddingBottom: 90 }}>
        <div className="blog-grid">
          {POSTS.map((p) => (
            <Link key={p.to} to={p.to} style={{ color: "inherit" }}>
              <div className="blog-card">
                <div className="blog-card-body">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <span className="read-more">Read article →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
