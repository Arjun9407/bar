import { useState } from "react";
import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

const LENGTHS = { upca: 12, ean13: 13, ean8: 8, itf14: 14 };

function digitsOnly(s) {
  return (s || "").replace(/\D/g, "");
}

function computeCheckDigit(digitsWithoutCheck) {
  let sum = 0;
  let weight = 3;
  for (let i = digitsWithoutCheck.length - 1; i >= 0; i--) {
    sum += parseInt(digitsWithoutCheck[i], 10) * weight;
    weight = weight === 3 ? 1 : 3;
  }
  const mod = sum % 10;
  return mod === 0 ? 0 : 10 - mod;
}

export default function CheckDigitCalculator() {
  const [type, setType] = useState("upca");
  const [partial, setPartial] = useState("");
  const [full, setFull] = useState("");
  const [result, setResult] = useState(null);

  const calc = () => {
    const raw = digitsOnly(partial);
    const expectedFull = LENGTHS[type];
    const expectedPartial = expectedFull - 1;
    if (raw.length !== expectedPartial) {
      setResult({ type: "error", html: `Enter exactly ${expectedPartial} digits (without the check digit) for ${type.toUpperCase()}. You entered ${raw.length}.` });
      return;
    }
    const check = computeCheckDigit(raw);
    const fullNum = raw + check;
    setResult({ type: "success", html: `Check digit: <strong>${check}</strong><br>Full number: <strong>${fullNum}</strong>` });
  };

  const validate = () => {
    const raw = digitsOnly(full);
    const expectedFull = LENGTHS[type];
    if (raw.length !== expectedFull) {
      setResult({ type: "error", html: `Enter exactly ${expectedFull} digits for ${type.toUpperCase()}. You entered ${raw.length}.` });
      return;
    }
    const body = raw.slice(0, -1);
    const providedCheck = parseInt(raw.slice(-1), 10);
    const correctCheck = computeCheckDigit(body);
    if (providedCheck === correctCheck) {
      setResult({ type: "success", html: `Valid. The check digit (${providedCheck}) matches ${type.toUpperCase()} rules.` });
    } else {
      setResult({ type: "error", html: `Not valid. Provided check digit is ${providedCheck}, but the correct value is <strong>${correctCheck}</strong>.` });
    }
  };

  return (
    <>
      <Seo
        title="Barcode Check Digit Calculator & Validator | BarcodePro"
        description="Calculate the check digit for UPC-A, EAN-13, EAN-8 or ITF-14, or validate whether an existing barcode number is correctly formed."
        path="/check-digit-calculator"
      jsonLd={[
        softwareAppJsonLd("Barcode Check Digit Calculator", "Calculate the check digit for UPC-A, EAN-13, EAN-8 or ITF-14, or validate whether an existing barcode number is correctly formed.", "/check-digit-calculator"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["Barcode Check Digit Calculator", `${SITE}/check-digit-calculator`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Free Utility</span>
        <h1>Check Digit <span className="gradient-text">Calculator &amp; Validator</span></h1>
        <p>Calculate the correct check digit for UPC-A, EAN-13, EAN-8 or ITF-14, or paste in a full number to check whether it's valid.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram of the mod 10 check digit calculation">
          <rect width="800" height="200" fill="#161f32" />
          <g fontFamily="Arial, sans-serif">
            <text x="90" y="70" fill="#e2e8f0" fontSize="26" fontWeight="bold">0 1 2 3 4 5 6 7 8 9 0 1</text>
            <path d="M90,110 L600,110" stroke="#334155" strokeWidth="1.5" />
            <text x="620" y="115" fill="#8b5cf6" fontSize="13" fontWeight="bold">= sum</text>
            <text x="500" y="150" fill="#96a9c7" fontSize="12.5" textAnchor="middle">Round the sum up to the next multiple of 10 —</text>
            <text x="500" y="167" fill="#96a9c7" fontSize="12.5" textAnchor="middle">the gap between them is the check digit.</text>
            <g transform="translate(680,120)"><rect width="70" height="46" rx="8" fill="#f87171" /><text x="35" y="31" fill="#1e293b" fontSize="22" fontWeight="bold" textAnchor="middle">6</text></g>
          </g>
        </svg>
        <figcaption>The mod-10 weighting used by UPC-A, EAN-13, EAN-8 and ITF-14.</figcaption>
      </figure>

      <section className="wrap-narrow" style={{ paddingBottom: 40 }}>
        <div className="card">
          <label>Barcode Type</label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="upca">UPC-A (12 digits)</option>
            <option value="ean13">EAN-13 (13 digits)</option>
            <option value="ean8">EAN-8 (8 digits)</option>
            <option value="itf14">ITF-14 (14 digits)</option>
          </select>

          <div className="grid" style={{ marginTop: 18 }}>
            <div>
              <label>Calculate check digit</label>
              <input type="text" placeholder="Enter digits WITHOUT the check digit" inputMode="numeric" value={partial} onChange={(e) => setPartial(e.target.value)} onKeyDown={(e) => e.key === "Enter" && calc()} />
              <button className="btn-full" style={{ marginTop: 10 }} onClick={calc}>Calculate</button>
            </div>
            <div>
              <label>Validate a full number</label>
              <input type="text" placeholder="Enter the FULL number, including check digit" inputMode="numeric" value={full} onChange={(e) => setFull(e.target.value)} onKeyDown={(e) => e.key === "Enter" && validate()} />
              <button className="btn-full" style={{ marginTop: 10 }} onClick={validate}>Validate</button>
            </div>
          </div>

          {result && (
            <div className={`notice notice-${result.type}`} style={{ marginTop: 18 }} dangerouslySetInnerHTML={{ __html: result.html }} />
          )}
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>How the check digit is calculated</h2>
        <p>
          UPC-A, EAN-13, EAN-8 and ITF-14 all use the same underlying method (a "modulo 10" or "Luhn-style" weighted
          checksum), just with different digit counts. Starting from the rightmost digit and working left, each
          digit is alternately multiplied by 3 and by 1, the results are summed, and the check digit is whatever
          number needs to be added to bring that sum up to the next multiple of 10.
        </p>
        <p>
          This means a single mistyped or misprinted digit — or two digits swapped — will almost always produce a
          sum that doesn't reach a clean multiple of 10, which is exactly what lets a scanner detect the error
          instead of silently recording the wrong product.
        </p>
        <h2>When you'd use this</h2>
        <p>
          If you're assembling barcode numbers manually, calculate the correct trailing check digit here before
          feeding the full numbers into the <Link to="/" style={{ color: "var(--accent-3)" }}>barcode generator</Link> or{" "}
          <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link>. If you already have
          a full number and want to confirm it's valid before printing, use the validator instead.
        </p>
      </section>
    </>
  );
}
