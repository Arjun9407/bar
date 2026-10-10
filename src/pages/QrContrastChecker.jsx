import { useState } from "react";
import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

function hexToRgb(hex) {
  hex = (hex || "").replace("#", "").trim();
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const num = parseInt(hex, 16);
  if (isNaN(num) || hex.length !== 6) return null;
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
}

function relLuminance(rgb) {
  const srgb = [rgb.r, rgb.g, rgb.b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hex1, hex2) {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return null;
  const L1 = relLuminance(rgb1);
  const L2 = relLuminance(rgb2);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return { ratio: (lighter + 0.05) / (darker + 0.05), L1, L2 };
}

export default function QrContrastChecker() {
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");

  const result = contrastRatio(fg, bg);

  let verdict = "";
  let cls = "info";
  if (result) {
    if (result.ratio >= 4.5) {
      verdict = "Good contrast — should scan reliably in most lighting and print conditions.";
      cls = "success";
    } else if (result.ratio >= 2.5) {
      verdict = "Marginal contrast — may fail in low light, on a small or glare-lit screen, or after printing. Consider increasing the difference between your colors.";
      cls = "info";
    } else {
      verdict = "Poor contrast — this combination is likely to fail scanning outright. Choose a darker foreground and/or a lighter background.";
      cls = "error";
    }
  }
  const inverted = result && result.L1 >= result.L2;

  const swap = () => {
    setFg(bg);
    setBg(fg);
  };

  return (
    <>
      <Seo
        title="QR Code Contrast & Scannability Checker | BarcodePro"
        description="Check whether your QR code's foreground and background colors have enough contrast to scan reliably, with a live preview and a WCAG-style contrast ratio."
        path="/qr-contrast-checker"
      jsonLd={[
        softwareAppJsonLd("QR Contrast & Scannability Checker", "Check whether your QR code's foreground and background colors have enough contrast to scan reliably, with a live preview and a WCAG-style contrast ratio.", "/qr-contrast-checker"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["QR Contrast & Scannability Checker", `${SITE}/qr-contrast-checker`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Free Utility</span>
        <h1>QR Code Contrast &amp; <span className="gradient-text">Scannability Checker</span></h1>
        <p>Pick a foreground and background color and see, before you print anything, whether the contrast between them is strong enough for a phone camera to read reliably.</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 40 }}>
        <div className="checker-layout">
          <div className="card">
            <div className="color-field">
              <label>Foreground (module) color</label>
              <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              <input
                type="text"
                value={fg}
                onChange={(e) => { if (/^#?[0-9a-fA-F]{6}$/.test(e.target.value)) setFg(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value); }}
              />
            </div>
            <div className="color-field">
              <label>Background color</label>
              <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              <input
                type="text"
                value={bg}
                onChange={(e) => { if (/^#?[0-9a-fA-F]{6}$/.test(e.target.value)) setBg(e.target.value.startsWith("#") ? e.target.value : "#" + e.target.value); }}
              />
            </div>

            <button className="btn-outline btn-full" onClick={swap}>Swap Colors</button>

            {result ? (
              <div className={`notice notice-${cls}`}>
                <div className="ratio-badge">{result.ratio.toFixed(2)}:1</div>
                <br />
                {verdict}
                {inverted && (
                  <>
                    <br />
                    <br />
                    <strong>Note:</strong> your foreground is lighter than your background (inverted colors). Most
                    scanners assume dark modules on a light background — a high ratio here can still work, but test
                    on a real device before printing.
                  </>
                )}
              </div>
            ) : (
              <div className="notice notice-error">Could not read one of the colors.</div>
            )}
          </div>

          <div className="preview-box">
            <div style={{ "--qr-fg": fg, "--qr-bg": bg }}>
              <svg className="qr-preview-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="200" height="200" fill="var(--qr-bg)" />
                <g fill="var(--qr-fg)">
                  <rect x="10" y="10" width="40" height="40" />
                  <rect x="20" y="20" width="20" height="20" fill="var(--qr-bg)" />
                  <rect x="25" y="25" width="10" height="10" fill="var(--qr-fg)" />
                  <rect x="150" y="10" width="40" height="40" />
                  <rect x="160" y="20" width="20" height="20" fill="var(--qr-bg)" />
                  <rect x="165" y="25" width="10" height="10" fill="var(--qr-fg)" />
                  <rect x="10" y="150" width="40" height="40" />
                  <rect x="20" y="160" width="20" height="20" fill="var(--qr-bg)" />
                  <rect x="25" y="165" width="10" height="10" fill="var(--qr-fg)" />
                  <rect x="70" y="15" width="10" height="10" /><rect x="90" y="15" width="10" height="10" /><rect x="110" y="20" width="10" height="10" /><rect x="130" y="15" width="10" height="10" />
                  <rect x="65" y="65" width="10" height="10" /><rect x="85" y="80" width="10" height="10" /><rect x="100" y="60" width="10" height="10" /><rect x="120" y="90" width="10" height="10" /><rect x="140" y="70" width="10" height="10" />
                  <rect x="70" y="150" width="10" height="10" /><rect x="90" y="165" width="10" height="10" /><rect x="110" y="150" width="10" height="10" /><rect x="130" y="170" width="10" height="10" />
                  <rect x="150" y="70" width="10" height="10" /><rect x="170" y="90" width="10" height="10" /><rect x="150" y="110" width="10" height="10" /><rect x="180" y="120" width="10" height="10" /><rect x="160" y="130" width="10" height="10" />
                  <rect x="60" y="110" width="10" height="10" /><rect x="80" y="120" width="10" height="10" /><rect x="60" y="130" width="10" height="10" /><rect x="40" y="140" width="10" height="10" />
                </g>
              </svg>
            </div>
            <p style={{ color: "#475569", fontSize: 12.5, marginTop: 14 }}>
              Illustrative preview — not a decodable QR code. Generate an actual code on the{" "}
              <Link to="/qr-generator" style={{ color: "#0891b2" }}>QR generator</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>How to read the result</h2>
        <p>
          This tool borrows the WCAG relative-luminance contrast formula — the same math used to check whether text
          is readable against a background — as a practical stand-in for barcode scannability. A ratio of{" "}
          <strong>4.5:1 or higher</strong> is a safe target for most printed QR codes; between{" "}
          <strong>2.5 and 4.5</strong> is workable but risky; below <strong>2.5</strong> is likely to cause failed or
          slow scans.
        </p>
        <h2>Why dark-on-light is the safer default</h2>
        <p>
          Most QR decoders — including phone cameras — are tuned to expect dark modules on a light background. An
          inverted combination can still pass a strong contrast ratio and may scan fine on modern phones, but it's
          worth testing on a couple of actual devices before committing to a print run.
        </p>
        <h2>Contrast survives print, don't assume it survives print quality</h2>
        <p>
          A good ratio on screen doesn't guarantee a good result on paper. See our{" "}
          <a href="/blog/printing-barcode-labels" style={{ color: "var(--accent-3)" }}>printing guide</a> for the
          other factors that combine with contrast to determine whether a code actually scans once it's out of the
          browser.
        </p>
        <p>
          Happy with your colors? Build the real, scannable code on the{" "}
          <Link to="/qr-generator" style={{ color: "var(--accent-3)" }}>QR code generator</Link>, which uses the
          same foreground and background fields.
        </p>
      </section>
    </>
  );
}
