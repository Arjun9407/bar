import { useState } from "react";
import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

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

const EXPECTED_FULL = { upca: 12, ean13: 13, ean8: 8, itf14: 14 };

export default function SerialGenerator() {
  const [prefix, setPrefix] = useState("SKU-");
  const [suffix, setSuffix] = useState("");
  const [start, setStart] = useState(1);
  const [count, setCount] = useState(20);
  const [pad, setPad] = useState(5);
  const [checkType, setCheckType] = useState("none");
  const [codes, setCodes] = useState([]);
  const [notice, setNotice] = useState(null);

  const generate = () => {
    if (isNaN(start) || isNaN(count) || count < 1) {
      setNotice({ type: "error", msg: "Enter a valid start number and count." });
      return;
    }
    if (count > 5000) {
      setNotice({ type: "error", msg: "Please keep batches to 5000 codes or fewer for browser performance." });
      return;
    }

    const expectedFull = EXPECTED_FULL[checkType];
    const result = [];
    let skipped = 0;

    for (let i = 0; i < count; i++) {
      const num = String(start + i).padStart(pad, "0");
      let body = prefix + num + suffix;
      if (checkType !== "none") {
        const expectedPartial = expectedFull - 1;
        if (!/^\d+$/.test(body) || body.length !== expectedPartial) {
          skipped++;
          continue;
        }
        body = body + computeCheckDigit(body);
      }
      result.push(body);
    }

    setCodes(result);

    if (checkType !== "none" && skipped > 0) {
      const expectedPartial = expectedFull - 1;
      setNotice({ type: "error", msg: `${skipped} code(s) skipped — with this check digit format, prefix + number + suffix must be all digits and exactly ${expectedPartial} characters long before the check digit is added. Adjust the padding width, prefix or suffix and try again.` });
    } else if (result.length === 0) {
      setNotice({ type: "error", msg: "No codes were generated. Check your settings." });
    } else {
      setNotice({ type: "success", msg: `Generated ${result.length} code(s).` });
    }
  };

  const copyAll = () => {
    if (codes.length === 0) {
      setNotice({ type: "error", msg: "Generate some codes first." });
      return;
    }
    navigator.clipboard
      .writeText(codes.join("\n"))
      .then(() => setNotice({ type: "success", msg: "Copied to clipboard." }))
      .catch(() => setNotice({ type: "error", msg: "Could not copy automatically — select the text in the box and copy manually." }));
  };

  const download = (format) => {
    if (codes.length === 0) {
      setNotice({ type: "error", msg: "Generate some codes first." });
      return;
    }
    let content, filename, mime;
    if (format === "csv") {
      content = "value\n" + codes.join("\n");
      filename = "serial_codes.csv";
      mime = "text/csv";
    } else {
      content = codes.join("\n");
      filename = "serial_codes.txt";
      mime = "text/plain";
    }
    const blob = new Blob([content], { type: mime });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <Seo
        title="Serial & Batch Code Generator | BarcodePro"
        description="Generate a sequential run of SKUs, ticket IDs or serial numbers, with correct check digits calculated automatically for EAN/UPC/ITF-14, ready to paste into the bulk generator."
        path="/serial-generator"
      jsonLd={[
        softwareAppJsonLd("Serial & Batch Code Generator", "Generate a sequential run of SKUs, ticket IDs or serial numbers, with correct check digits calculated automatically for EAN/UPC/ITF-14, ready to paste into the bulk generator.", "/serial-generator"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["Serial & Batch Code Generator", `${SITE}/serial-generator`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Free Utility</span>
        <h1>Serial &amp; Batch <span className="gradient-text">Code Generator</span></h1>
        <p>Generate a sequential run of SKUs, ticket IDs or serial numbers — with correct check digits calculated automatically for UPC-A, EAN-13, EAN-8 or ITF-14 — ready to paste into the <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link>.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sequence of tags numbered SKU-00001 through SKU-00004">
          <rect width="800" height="190" fill="#161f32" />
          <g fontFamily="Arial, sans-serif">
            <g transform="translate(70,25)"><rect width="70" height="55" rx="4" fill="#ffffff" /><text x="35" y="47" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">00001</text></g>
            <g transform="translate(220,45)" opacity="0.9"><rect width="70" height="55" rx="4" fill="#ffffff" /><text x="35" y="47" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">00002</text></g>
            <g transform="translate(370,65)" opacity="0.8"><rect width="70" height="55" rx="4" fill="#ffffff" /><text x="35" y="47" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">00003</text></g>
            <g transform="translate(520,85)" opacity="0.7"><rect width="70" height="55" rx="4" fill="#ffffff" /><text x="35" y="47" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">00004</text></g>
            <text x="640" y="120" fill="#96a9c7" fontSize="14" opacity="0.6">...00500</text>
            <text x="70" y="15" fill="#38bdf8" fontSize="12">prefix "SKU-" + zero-padded number + check digit</text>
          </g>
        </svg>
        <figcaption>One set of rules — prefix, padding, check digit format — expands into hundreds of consistent, sortable codes.</figcaption>
      </figure>

      <section className="wrap" style={{ paddingBottom: 40 }}>
        <div className="gen-layout">
          <div className="card">
            <div className="grid">
              <div>
                <label>Prefix (optional)</label>
                <input type="text" placeholder="SKU-" value={prefix} onChange={(e) => setPrefix(e.target.value)} />
              </div>
              <div>
                <label>Suffix (optional)</label>
                <input type="text" value={suffix} onChange={(e) => setSuffix(e.target.value)} />
              </div>
              <div>
                <label>Start number</label>
                <input type="number" min="0" value={start} onChange={(e) => setStart(parseInt(e.target.value, 10))} />
              </div>
              <div>
                <label>How many codes</label>
                <input type="number" min="1" max="5000" value={count} onChange={(e) => setCount(parseInt(e.target.value, 10))} />
              </div>
              <div>
                <label>Zero-pad number to</label>
                <input type="number" min="0" max="14" value={pad} onChange={(e) => setPad(parseInt(e.target.value, 10) || 0)} />
              </div>
              <div>
                <label>Add check digit</label>
                <select value={checkType} onChange={(e) => setCheckType(e.target.value)}>
                  <option value="none">None (any format)</option>
                  <option value="upca">UPC-A (12 digits total)</option>
                  <option value="ean13">EAN-13 (13 digits total)</option>
                  <option value="ean8">EAN-8 (8 digits total)</option>
                  <option value="itf14">ITF-14 (14 digits total)</option>
                </select>
              </div>
            </div>

            <button className="btn-full" style={{ marginTop: 14 }} onClick={generate}>Generate Codes</button>
            {notice && <div className={`notice notice-${notice.type}`}>{notice.msg}</div>}
          </div>

          <div className="card">
            <label>Preview (first 8)</label>
            <table className="preview-table">
              <thead><tr><th>#</th><th>Code</th></tr></thead>
              <tbody>
                {codes.length === 0 ? (
                  <tr><td colSpan="2" style={{ color: "var(--dim)" }}>Nothing generated yet.</td></tr>
                ) : (
                  codes.slice(0, 8).map((v, i) => <tr key={i}><td>{i + 1}</td><td>{v}</td></tr>)
                )}
              </tbody>
            </table>
            <p style={{ color: "var(--dim)", fontSize: 13, marginTop: 14 }}>Total generated: <strong>{codes.length}</strong></p>

            <label style={{ marginTop: 18 }}>All codes</label>
            <textarea readOnly value={codes.join("\n")} placeholder="Generated codes will appear here, one per line." />

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 10 }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={copyAll}>Copy All</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => download("csv")}>Download CSV</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={() => download("txt")}>Download TXT</button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>What this is for</h2>
        <p>
          Most test batches and inventory rollouts don't need one code typed at a time — they need a clean,
          predictable sequence. This tool builds that sequence in one pass, with the numeric portion zero-padded to
          a consistent width so everything sorts and prints cleanly.
        </p>
        <h2>Using the check digit option</h2>
        <p>
          If you turn on a check digit format, your prefix, padded number and suffix combined must be all-digits and
          exactly one character short of that format's full length — the tool then calculates and appends the
          correct trailing check digit using the same mod-10 algorithm as our{" "}
          <Link to="/check-digit-calculator" style={{ color: "var(--accent-3)" }}>check digit calculator</Link>.
        </p>
        <h2>Where the output goes next</h2>
        <p>
          Copy the list straight into the <Link to="/" style={{ color: "var(--accent-3)" }}>barcode generator</Link>{" "}
          textarea for a quick batch, or download it as a CSV and drop it into the{" "}
          <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link> for a ZIP of
          individually named PNGs.
        </p>
      </section>
    </>
  );
}
