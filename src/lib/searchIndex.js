// Everything searchable from the Ctrl+K palette.
export const SEARCH_INDEX = [
  // Tools
  { title: "Barcode Generator", path: "/#generator", cat: "Tool", desc: "CODE128, CODE39, EAN-13, UPC, ITF-14, MSI, Pharmacode", kw: "create make barcode code128 ean upc" },
  { title: "QR Code Generator", path: "/qr-generator", cat: "Tool", desc: "Links, WiFi, text, email and contact cards", kw: "qr wifi vcard link png svg" },
  { title: "Bulk Generator", path: "/bulk-generator", cat: "Tool", desc: "CSV to ZIP of barcode or QR images", kw: "csv zip batch many" },
  { title: "Barcode & QR Scanner", path: "/scanner", cat: "Tool", desc: "Decode a code from an uploaded photo", kw: "decode read scan upload image" },
  { title: "Check Digit Calculator", path: "/check-digit-calculator", cat: "Tool", desc: "Calculate or validate UPC/EAN/ITF-14 check digits", kw: "checksum validate mod10" },
  { title: "Size & DPI Calculator", path: "/size-calculator", cat: "Tool", desc: "Minimum print size for a barcode", kw: "print dpi x-dimension quiet zone" },
  { title: "Serial Generator", path: "/serial-generator", cat: "Tool", desc: "Sequential SKUs and ticket IDs", kw: "sequence sku range padding" },
  { title: "Label Sheet Generator", path: "/label-sheet-generator", cat: "Tool", desc: "Printable sheets of labels", kw: "avery print pdf sheet grid" },
  { title: "QR Contrast Checker", path: "/qr-contrast-checker", cat: "Tool", desc: "Check colors for scannability", kw: "color wcag foreground background" },
  // Guides
  { title: "QR Code vs. Barcode", path: "/blog/qr-vs-barcode", cat: "Guide", desc: "Which format should you use?", kw: "compare difference" },
  { title: "Barcode Types Explained", path: "/blog/barcode-types-explained", cat: "Guide", desc: "CODE128, EAN, UPC, Data Matrix, PDF417, Aztec", kw: "symbology formats" },
  { title: "How to Print Barcode Labels That Scan", path: "/blog/printing-barcode-labels", cat: "Guide", desc: "Sizing, contrast, quiet zones, printer settings", kw: "print failed scan thermal" },
  { title: "GS1, EAN and UPC Explained", path: "/blog/gs1-ean-upc-explained", cat: "Guide", desc: "Prefixes, check digits, when you need a registered number", kw: "gtin marketplace amazon" },
  { title: "How Barcode Scanners Work", path: "/blog/how-scanners-work", cat: "Guide", desc: "Laser vs camera scanning, finder patterns", kw: "laser camera finder" },
  { title: "Barcodes for E-Commerce & Shipping", path: "/blog/barcodes-ecommerce-shipping", cat: "Guide", desc: "Listing barcodes, SKUs, cartons, post-purchase QR", kw: "shopify etsy sku itf-14" },
  { title: "A Brief History of the Barcode", path: "/blog/history-of-barcodes", cat: "Guide", desc: "From a 1949 patent to Wrigley's gum", kw: "history upc 1974" },
  // Pages
  { title: "Use Cases by Industry", path: "/use-cases", cat: "Page", desc: "Retail, warehousing, events, healthcare, education", kw: "industry" },
  { title: "Glossary", path: "/glossary", cat: "Page", desc: "Quiet zone, GTIN, module, symbology and more", kw: "terms definitions" },
  { title: "FAQ", path: "/faq", cat: "Page", desc: "Common questions answered", kw: "help questions free commercial" },
  { title: "About", path: "/about", cat: "Page", desc: "What BarcodePro is and why it exists", kw: "" },
  { title: "Contact", path: "/contact", cat: "Page", desc: "Send feedback or a question", kw: "support email" },
  { title: "Privacy Policy", path: "/privacy", cat: "Page", desc: "Cookies, advertising and data handling", kw: "gdpr ccpa cookies" },
  { title: "Terms of Service", path: "/terms", cat: "Page", desc: "Usage terms", kw: "legal" },
];

export function searchIndex(query) {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_INDEX.slice(0, 9);
  const words = q.split(/\s+/);
  return SEARCH_INDEX
    .map((item) => {
      const hay = `${item.title} ${item.desc} ${item.kw} ${item.cat}`.toLowerCase();
      if (!words.every((w) => hay.includes(w))) return null;
      const score = (item.title.toLowerCase().includes(q) ? 10 : 0) + (item.title.toLowerCase().startsWith(q) ? 5 : 0);
      return { item, score };
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
