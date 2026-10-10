import { useState } from "react";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function SizeCalculator() {
  const [xDim, setXDim] = useState(0.33);
  const [mag, setMag] = useState(100);
  const [chars, setChars] = useState(12);
  const [dpi, setDpi] = useState(300);
  const [result, setResult] = useState(null);

  const calc = () => {
    const magFactor = mag / 100;
    const c = chars || 12;
    const effectiveX = xDim * magFactor;
    const modules = c * 11 + 40;
    const widthMm = (modules * effectiveX) / 10;
    const widthIn = widthMm / 25.4;
    const dotsPerX = (dpi / 25.4) * effectiveX;

    let dpiWarning = "";
    if (dotsPerX < 2) {
      dpiWarning = `<br><strong>Warning:</strong> at this size and DPI, each bar is only ~${dotsPerX.toFixed(1)} printer dots wide — bars will likely blur together. Increase magnification or DPI.`;
    } else if (dotsPerX < 3) {
      dpiWarning = `<br>Each bar is ~${dotsPerX.toFixed(1)} printer dots wide — usable, but on the low side. 3+ dots per bar is safer.`;
    }

    const quietZoneMm = effectiveX * 10;

    setResult(
      `Estimated minimum barcode width: <strong>${widthMm.toFixed(1)} mm</strong> (${widthIn.toFixed(2)} in)<br>` +
      `Recommended quiet zone (each side): <strong>${quietZoneMm.toFixed(2)} mm</strong><br>` +
      `Effective X-dimension at this magnification: <strong>${effectiveX.toFixed(3)} mm</strong>${dpiWarning}`
    );
  };

  return (
    <>
      <Seo
        title="Barcode Size & Print DPI Calculator | BarcodePro"
        description="Work out the minimum recommended print size for a barcode based on symbology, magnification and printer DPI, so it scans reliably."
        path="/size-calculator"
      jsonLd={[
        softwareAppJsonLd("Barcode Size & DPI Calculator", "Work out the minimum recommended print size for a barcode based on symbology, magnification and printer DPI, so it scans reliably.", "/size-calculator"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["Barcode Size & DPI Calculator", `${SITE}/size-calculator`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Free Utility</span>
        <h1>Barcode Size &amp; <span className="gradient-text">Print DPI Calculator</span></h1>
        <p>Estimate the minimum reliable print size for a linear barcode based on its symbology, magnification, and your printer's resolution.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Comparison of a barcode printed too small versus one printed at a safe size">
          <rect width="800" height="210" fill="#161f32" />
          <g fontFamily="Arial, sans-serif">
            <text x="180" y="35" fill="#f87171" fontSize="14" fontWeight="bold" textAnchor="middle">Too small (low DPI)</text>
            <rect x="100" y="55" width="160" height="80" fill="#ffffff" rx="4" />
            <g transform="translate(115,70)" fill="#0f172a" opacity="0.55">
              <rect x="0" width="6" height="50" /><rect x="7" width="7" height="50" /><rect x="15" width="6" height="50" /><rect x="24" width="8" height="50" />
            </g>
            <text x="180" y="160" fill="#96a9c7" fontSize="11.5" textAnchor="middle">bars blur together —</text>
            <text x="180" y="176" fill="#96a9c7" fontSize="11.5" textAnchor="middle">scanner can't tell them apart</text>
            <line x1="400" y1="30" x2="400" y2="190" stroke="#334155" strokeWidth="1.5" strokeDasharray="6,6" />
            <text x="620" y="35" fill="#86efac" fontSize="14" fontWeight="bold" textAnchor="middle">Sized correctly</text>
            <rect x="540" y="55" width="160" height="80" fill="#ffffff" rx="4" />
            <g transform="translate(555,68)" fill="#0f172a">
              <rect x="0" width="3" height="54" /><rect x="6" width="5" height="54" /><rect x="15" width="3" height="54" /><rect x="22" width="6" height="54" />
            </g>
            <text x="620" y="160" fill="#96a9c7" fontSize="11.5" textAnchor="middle">≥3 printer dots per bar —</text>
            <text x="620" y="176" fill="#96a9c7" fontSize="11.5" textAnchor="middle">clean, reliable scan</text>
          </g>
        </svg>
        <figcaption>The same barcode data at two sizes: below the safe minimum, bars merge; at or above it, edges stay distinct.</figcaption>
      </figure>

      <section className="wrap-narrow" style={{ paddingBottom: 40 }}>
        <div className="card">
          <div className="grid">
            <div>
              <label>Symbology</label>
              <select value={xDim} onChange={(e) => setXDim(parseFloat(e.target.value))}>
                <option value="0.33">CODE128 (nominal X ≈ 0.33mm)</option>
                <option value="0.33">CODE39 (nominal X ≈ 0.33mm)</option>
                <option value="0.5">ITF-14 (nominal X ≈ 0.5mm, cartons)</option>
              </select>
            </div>
            <div>
              <label>Magnification</label>
              <select value={mag} onChange={(e) => setMag(parseInt(e.target.value, 10))}>
                <option value="80">80% (minimum — dense labels only)</option>
                <option value="100">100% (nominal size)</option>
                <option value="150">150% (recommended safety margin)</option>
                <option value="200">200% (large / distance scanning)</option>
              </select>
            </div>
            <div>
              <label>Number of characters encoded</label>
              <input type="number" min="1" max="48" value={chars} onChange={(e) => setChars(parseInt(e.target.value, 10) || 12)} />
            </div>
            <div>
              <label>Printer resolution (DPI)</label>
              <select value={dpi} onChange={(e) => setDpi(parseInt(e.target.value, 10))}>
                <option value="150">150 DPI (basic inkjet)</option>
                <option value="203">203 DPI (common thermal label printer)</option>
                <option value="300">300 DPI (standard laser / high-res thermal)</option>
                <option value="600">600 DPI (high-res laser)</option>
              </select>
            </div>
          </div>

          <button className="btn-full" style={{ marginTop: 20 }} onClick={calc}>Calculate</button>
          {result && <div className="notice notice-info" style={{ marginTop: 18 }} dangerouslySetInnerHTML={{ __html: result }} />}
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>How to read the result</h2>
        <p>
          This calculator estimates the minimum physical width a barcode needs based on its "X-dimension" (the width
          of its narrowest bar), the number of characters it encodes, and your chosen magnification. It also checks
          whether your printer's resolution has enough dots-per-bar to render that X-dimension cleanly — as a rule
          of thumb, you want at least 2–3 printer dots per X-dimension unit to avoid bars blurring together.
        </p>
        <p>
          These are estimates based on commonly used nominal values, not a substitute for testing an actual printed
          sample with your target scanner — always print and scan a test label before committing to a full run.
        </p>
      </section>
    </>
  );
}
