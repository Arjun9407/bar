import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

const TOOLS = [
  { to: "/", icon: "▥", title: "Barcode Generator", desc: "Create CODE128, CODE39, EAN-13, EAN-8, UPC, ITF-14, MSI and Pharmacode barcodes, one per line, with custom width, height and font size.", cta: "Open Generator" },
  { to: "/qr-generator", icon: "▦", title: "QR Code Generator", desc: "Turn a link, wifi login, contact card or plain text into a scannable QR code. Pick colors, size and error-correction level.", cta: "Open QR Generator" },
  { to: "/bulk-generator", icon: "▤", title: "Bulk Generator", desc: "Upload a CSV of values — SKUs, serials, ticket codes — and generate every barcode or QR code at once, packaged into a ZIP.", cta: "Open Bulk Generator" },
  { to: "/scanner", icon: "◎", title: "Barcode & QR Scanner", desc: "Upload a photo or screenshot of a barcode or QR code and decode it instantly, right in your browser.", cta: "Open Scanner" },
  { to: "/check-digit-calculator", icon: "✓", title: "Check Digit Calculator", desc: "Calculate the correct check digit for UPC-A, EAN-13, EAN-8 or ITF-14, or validate whether a full number is correctly formed.", cta: "Open Calculator" },
  { to: "/size-calculator", icon: "📐", title: "Size & DPI Calculator", desc: "Work out the minimum reliable print size for a barcode based on symbology, magnification and your printer's resolution.", cta: "Open Calculator" },
  { to: "/serial-generator", icon: "🔢", title: "Serial Generator", desc: "Generate a sequential run of SKUs, ticket IDs or serial numbers, with correct check digits calculated automatically.", cta: "Open Serial Generator" },
  { to: "/label-sheet-generator", icon: "🗂️", title: "Label Sheet Generator", desc: "Arrange dozens of barcodes or QR codes onto a printable label sheet — set rows, columns and label size, then print.", cta: "Open Label Sheets" },
  { to: "/qr-contrast-checker", icon: "🎨", title: "QR Contrast Checker", desc: "Check whether your chosen foreground and background colors have enough contrast to scan reliably.", cta: "Open Contrast Checker" },
];

export default function Tools() {
  return (
    <>
      <Seo
        title="All Tools | BarcodePro"
        description="Every free BarcodePro tool in one place: barcode generator, QR code generator, bulk CSV generator, and barcode/QR scanner."
        path="/tools"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Free &amp; Unlimited</span>
        <h1>Every tool, <span className="gradient-text">one toolbox</span></h1>
        <p>Barcode generator, QR generator, bulk CSV export, a scanner that decodes codes from any image, plus a check digit calculator and a print-size calculator. All of it runs in your browser — nothing you type or upload is ever sent to a server.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A dashboard of nine tool icons representing the full BarcodePro toolkit">
          <rect width="800" height="220" fill="#161f32" />
          <g fontFamily="Arial, sans-serif">
            <g transform="translate(60,30)"><rect width="200" height="70" rx="12" fill="#1e293b" stroke="#334155" /><text x="16" y="30" fontSize="20">▥</text><text x="46" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">Barcode Gen</text><text x="46" y="50" fill="#96a9c7" fontSize="10.5">13 symbologies</text></g>
            <g transform="translate(300,30)"><rect width="200" height="70" rx="12" fill="#1e293b" stroke="#334155" /><text x="16" y="30" fontSize="20">◫</text><text x="46" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">QR Generator</text><text x="46" y="50" fill="#96a9c7" fontSize="10.5">links, WiFi, vCard</text></g>
            <g transform="translate(540,30)"><rect width="200" height="70" rx="12" fill="#1e293b" stroke="#334155" /><text x="16" y="30" fontSize="20">▤</text><text x="46" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">Bulk Generator</text><text x="46" y="50" fill="#96a9c7" fontSize="10.5">CSV → ZIP</text></g>
            <g transform="translate(60,120)"><rect width="200" height="70" rx="12" fill="#1e293b" stroke="#334155" /><text x="16" y="30" fontSize="20">◎</text><text x="46" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">Scanner</text><text x="46" y="50" fill="#96a9c7" fontSize="10.5">decode any photo</text></g>
            <g transform="translate(300,120)"><rect width="200" height="70" rx="12" fill="#1e293b" stroke="#8b5cf6" /><text x="16" y="30" fontSize="20" fill="#8b5cf6">✓</text><text x="46" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">Check Digit</text><text x="46" y="50" fill="#96a9c7" fontSize="10.5">calc &amp; validate</text></g>
            <g transform="translate(540,120)"><rect width="200" height="70" rx="12" fill="#1e293b" stroke="#06b6d4" /><text x="16" y="30" fontSize="20" fill="#06b6d4">📐</text><text x="46" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">Size Calc, more</text><text x="46" y="50" fill="#96a9c7" fontSize="10.5">+3 utilities below</text></g>
          </g>
        </svg>
        <figcaption>Nine free tools that all run client-side — pick one below.</figcaption>
      </figure>

      <section className="wrap" style={{ paddingTop: 20, paddingBottom: 80 }}>
        <div className="grid">
          {TOOLS.map((t) => (
            <div className="tool-card" key={t.to + t.title}>
              <div className="icon">{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <Link className="btn" to={t.to}>{t.cta}</Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
