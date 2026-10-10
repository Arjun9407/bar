import { useState } from "react";
import { Link } from "react-router-dom";
import JsBarcode from "jsbarcode";
import Seo, { SITE } from "../components/Seo.jsx";

const HISTORY_KEY = "bp_barcode_history";
const MAX_HISTORY = 8;

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY)) || []; } catch (e) { return []; }
}

const BARCODE_TYPES = ["CODE128", "CODE39", "EAN13", "EAN8", "UPC", "ITF14", "MSI", "pharmacode"];

function BarcodeSvg({ value, format, width, height, fontSize }) {
  // Renders one barcode via a callback ref so JsBarcode draws directly into the SVG node.
  const setRef = (svgEl) => {
    if (!svgEl) return;
    try {
      JsBarcode(svgEl, value, {
        format,
        lineColor: "#000",
        width,
        height,
        displayValue: true,
        fontSize,
        margin: 10,
      });
    } catch (err) {
      svgEl.innerHTML = "";
    }
  };
  return <svg ref={setRef} />;
}

export default function Home() {
  const [barcodeType, setBarcodeType] = useState("CODE128");
  const [width, setWidth] = useState(1.5);
  const [height, setHeight] = useState(80);
  const [fontSize, setFontSize] = useState(18);
  const [input, setInput] = useState("");
  const [values, setValues] = useState([]);
  const [history, setHistory] = useState(loadHistory);

  const saveHistory = (list, type) => {
    const fresh = list.map((v) => ({ value: v.trim(), type }));
    const merged = [...fresh, ...history].filter(
      (h, i, arr) => arr.findIndex((x) => x.value === h.value && x.type === h.type) === i
    ).slice(0, MAX_HISTORY);
    setHistory(merged);
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(merged)); } catch (e) { /* ignore */ }
  };

  const clearHistory = () => {
    setHistory([]);
    try { localStorage.removeItem(HISTORY_KEY); } catch (e) { /* ignore */ }
  };

  const generate = () => {
    const list = input.split("\n").filter((v) => v.trim() !== "");
    if (list.length === 0) {
      alert("Please enter barcode values");
      return;
    }
    setValues(list);
    saveHistory(list, barcodeType);
  };

  return (
    <>
      <Seo
        title="Free Barcode Generator Online - BarcodePro"
        description="Generate barcodes — CODE128, CODE39, EAN-13, UPC, ITF-14, MSI and Pharmacode — plus QR codes, bulk CSV export and a scanner. Free, unlimited, runs entirely in your browser."
        path="/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "BarcodePro",
            url: `${SITE}/`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "All",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            description:
              "Free online barcode and QR code toolkit: generator, bulk CSV export, and scanner supporting Code128, QR Code, UPC, EAN and more.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "BarcodePro",
            url: `${SITE}/`,
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "BarcodePro",
            url: `${SITE}/`,
          },
        ]}
      />

      <section className="page-hero">
        <span className="eyebrow">13 formats &middot; 9 free tools &middot; 0 uploads</span>
        <h1>
          Turn any value into a <span className="gradient-text">scannable code</span>, instantly.
        </h1>
        <p>
          Generate CODE128, EAN, UPC, QR and more directly in your browser. Batch hundreds from a CSV, or decode a
          code from a photo — no installs, no accounts, nothing ever leaves your device.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 28 }}>
          <button onClick={() => document.getElementById("generator").scrollIntoView({ behavior: "smooth" })}>
            Generate a Barcode
          </button>
          <Link className="btn btn-outline" to="/tools">
            See All Tools
          </Link>
        </div>
        <div style={{ display: "flex", gap: 34, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "var(--text)" }}>13+</div>
            <div style={{ fontSize: 12.5, color: "var(--dim)" }}>Code formats</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "var(--text)" }}>&infin;</div>
            <div style={{ fontSize: 12.5, color: "var(--dim)" }}>Codes per session</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "var(--text)" }}>0</div>
            <div style={{ fontSize: 12.5, color: "var(--dim)" }}>Server uploads</div>
          </div>
          <div>
            <div style={{ fontSize: 22, fontWeight: "bold", color: "var(--text)" }}>$0</div>
            <div style={{ fontSize: 12.5, color: "var(--dim)" }}>Cost, always</div>
          </div>
        </div>
        <div style={{ marginTop: 44 }}>
          <img
            src="/assets/images/ean13-barcode-sample.jpg"
            alt="Example EAN-13 barcode generated by BarcodePro"
            style={{
              maxWidth: 320,
              width: "100%",
              borderRadius: 18,
              background: "white",
              padding: 20,
              boxShadow: "0 15px 50px rgba(0,0,0,0.45)",
            }}
          />
        </div>
      </section>

      <section className="wrap" id="generator" style={{ paddingTop: 20, paddingBottom: 60 }}>
        <div className="card">
          <div className="grid">
            <div>
              <label>Barcode Type</label>
              <select value={barcodeType} onChange={(e) => setBarcodeType(e.target.value)}>
                {BARCODE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Width</label>
              <input type="number" value={width} onChange={(e) => setWidth(parseFloat(e.target.value))} />
            </div>
            <div>
              <label>Height</label>
              <input type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value, 10))} />
            </div>
            <div>
              <label>Font Size</label>
              <input type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value, 10))} />
            </div>
          </div>

          <br />
          <label>Barcode Values (One Per Line)</label>
          <textarea
            placeholder={"123456789\nHELLO123\n987654321"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") generate(); }}
          />
          <p style={{ fontSize: 12, color: "var(--dim)", marginTop: 4 }}>Tip: press Ctrl+Enter to generate.</p>

          {history.length > 0 && (
            <div className="history-row">
              <span className="h-label">Recent:</span>
              {history.map((h) => (
                <button
                  key={h.type + h.value}
                  className="chip"
                  onClick={() => { setInput(h.value); setBarcodeType(h.type); }}
                  title="Load this value"
                >
                  {h.value}<small>{h.type}</small>
                </button>
              ))}
              <button className="chip" onClick={clearHistory}>Clear</button>
            </div>
          )}

          <button className="btn-full" style={{ marginTop: 20 }} onClick={generate}>
            Generate Barcodes
          </button>

          <div className="result-container">
            {values.map((value, i) => (
              <div className="result-card" key={i}>
                <BarcodeSvg value={value} format={barcodeType} width={width} height={height} fontSize={fontSize} />
                <div className="result-text">{value}</div>
              </div>
            ))}
          </div>
        </div>
        <p style={{ textAlign: "center", color: "var(--dim)", fontSize: 13.5, marginTop: 18 }}>
          Need more than a few at once? Try the{" "}
          <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>
            bulk generator
          </Link>{" "}
          for CSV-to-ZIP export, or make sure your numbers are valid first with the{" "}
          <Link to="/check-digit-calculator" style={{ color: "var(--accent-3)" }}>
            check digit calculator
          </Link>
          .
        </p>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <h2 className="section-title">
          Why <span className="gradient-text">BarcodePro</span>
        </h2>
        <p className="section-sub">No signup, no watermark, no server round-trip — just a tool that does one job well.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">⚡</span>
            <h3>Fast</h3>
            <p>Codes render the instant you click generate — no network round-trip.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📱</span>
            <h3>Mobile Friendly</h3>
            <p>Responsive design that works the same on a phone as a desktop.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔒</span>
            <h3>Secure</h3>
            <p>Every code is built in your browser. Your data never touches a server.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🎯</span>
            <h3>Multi Format</h3>
            <p>13+ barcode and QR standards, from retail EAN to logistics ITF-14.</p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <h2 className="section-title">
          The full <span className="gradient-text">toolkit</span>
        </h2>
        <p className="section-sub">The generator above is the start — eight more tools cover the rest of the workflow.</p>
        <div className="grid">
          <div className="tool-card">
            <div className="icon">▥</div>
            <h3>QR Code Generator</h3>
            <p>Links, WiFi, contact cards and text — customizable colors, export as PNG or SVG.</p>
            <Link className="btn" to="/qr-generator">Open QR Generator</Link>
          </div>
          <div className="tool-card">
            <div className="icon">▦</div>
            <h3>Bulk Generator</h3>
            <p>Upload a CSV and generate hundreds of codes at once, packaged into a ZIP.</p>
            <Link className="btn" to="/bulk-generator">Open Bulk Generator</Link>
          </div>
          <div className="tool-card">
            <div className="icon">◎</div>
            <h3>Barcode &amp; QR Scanner</h3>
            <p>Upload a photo of any code and decode its value instantly in your browser.</p>
            <Link className="btn" to="/scanner">Open Scanner</Link>
          </div>
          <div className="tool-card">
            <div className="icon">✓</div>
            <h3>Check Digit Calculator</h3>
            <p>Calculate or validate the check digit for UPC-A, EAN-13, EAN-8 and ITF-14.</p>
            <Link className="btn" to="/check-digit-calculator">Open Calculator</Link>
          </div>
          <div className="tool-card">
            <div className="icon">📐</div>
            <h3>Size &amp; DPI Calculator</h3>
            <p>Work out the minimum print size for a barcode based on symbology and printer DPI.</p>
            <Link className="btn" to="/size-calculator">Open Calculator</Link>
          </div>
          <div className="tool-card">
            <div className="icon">🔢</div>
            <h3>Serial Generator</h3>
            <p>Generate sequential SKUs or ticket IDs with correct check digits calculated automatically.</p>
            <Link className="btn" to="/serial-generator">Open Serial Generator</Link>
          </div>
          <div className="tool-card">
            <div className="icon">🗂️</div>
            <h3>Label Sheet Generator</h3>
            <p>Lay out dozens of codes onto a printable sheet, sized to your labels, then print or save as PDF.</p>
            <Link className="btn" to="/label-sheet-generator">Open Label Sheets</Link>
          </div>
          <div className="tool-card">
            <div className="icon">🎨</div>
            <h3>QR Contrast Checker</h3>
            <p>Check your foreground/background colors for scannability before you commit to a print run.</p>
            <Link className="btn" to="/qr-contrast-checker">Open Contrast Checker</Link>
          </div>
          <div className="tool-card">
            <div className="icon">📖</div>
            <h3>Guides &amp; Blog</h3>
            <p>Barcode types explained, QR vs. barcode, GS1 numbering, and how to print labels that scan.</p>
            <Link className="btn" to="/blog">Read the Blog</Link>
          </div>
        </div>
      </section>

      <section className="wrap-narrow" style={{ paddingBottom: 80 }}>
        <div className="card" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 26, marginBottom: 14 }}>
            A barcode toolkit built for businesses, developers and inventory systems
          </h2>
          <p style={{ color: "var(--muted)", lineHeight: 1.85, marginBottom: 22 }}>
            BarcodePro is a free online barcode and QR code toolkit built for businesses, retailers, developers and
            personal use. Every code renders locally in your browser, with no account required and no limit on how
            many you generate.
          </p>
          <Link className="btn" to="/about">Learn More About BarcodePro</Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 90 }}>
        <h2 className="section-title">
          Quick <span className="gradient-text">answers</span>
        </h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Is BarcodePro free?</h3>
            <p>
              Yes — completely free, with no usage limits, no account required, and no watermark. See our full{" "}
              <Link to="/faq" style={{ color: "var(--accent-3)" }}>FAQ</Link>.
            </p>
          </div>
          <div className="feature-card">
            <h3>Can I generate multiple barcodes at once?</h3>
            <p>
              Yes. Paste one value per line above, or use the{" "}
              <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link> for a full
              CSV-to-ZIP export.
            </p>
          </div>
          <div className="feature-card">
            <h3>Does it work on mobile?</h3>
            <p>
              Yes, the whole site is fully responsive, including uploading a photo into the{" "}
              <Link to="/scanner" style={{ color: "var(--accent-3)" }}>scanner</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
