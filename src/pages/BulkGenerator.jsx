import { useRef, useState } from "react";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import JSZip from "jszip";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

function renderOne(value, type, size) {
  return new Promise((resolve, reject) => {
    if (type === "QR") {
      const canvas = document.createElement("canvas");
      QRCode.toCanvas(canvas, value, { width: size, margin: 2 }, (err) => {
        if (err) return reject(err);
        resolve(canvas.toDataURL("image/png"));
      });
    } else {
      try {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        JsBarcode(svg, value, { format: type, displayValue: true, width: 2, height: size / 3, margin: 10 });
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width || size;
          canvas.height = img.height || size / 3;
          const ctx = canvas.getContext("2d");
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          URL.revokeObjectURL(url);
          resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("render failed")); };
        img.src = url;
      } catch (err) {
        reject(err);
      }
    }
  });
}

function sanitize(v) {
  return v.replace(/[^a-z0-9_-]/gi, "_").slice(0, 30);
}

export default function BulkGenerator() {
  const [bulkType, setBulkType] = useState("CODE128");
  const [pasteValues, setPasteValues] = useState("");
  const [filePrefix, setFilePrefix] = useState("code");
  const [bulkSize, setBulkSize] = useState(400);
  const [loadedValues, setLoadedValues] = useState([]);
  const [progress, setProgress] = useState(0);
  const [notice, setNotice] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) {
      setLoadedValues([]);
      return;
    }
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const valueIdx = header.indexOf("value");
    let values;
    if (valueIdx !== -1) {
      values = lines.slice(1).map((l) => l.split(",")[valueIdx]?.trim()).filter(Boolean);
    } else {
      values = lines.map((l) => l.split(",")[0].trim()).filter(Boolean);
    }
    setLoadedValues(values);
  };

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => parseCSV(e.target.result);
    reader.readAsText(file);
  };

  const onPasteChange = (e) => {
    const text = e.target.value;
    setPasteValues(text);
    const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length > 0) setLoadedValues(lines);
  };

  const runBulkGenerate = async () => {
    if (loadedValues.length === 0) {
      setNotice({ type: "error", msg: "Load some values first — upload a CSV or paste a list." });
      return;
    }
    if (loadedValues.length > 500) {
      setNotice({ type: "error", msg: "Please keep bulk batches under 500 values for browser performance." });
      return;
    }

    const zip = new JSZip();
    let failures = 0;

    for (let i = 0; i < loadedValues.length; i++) {
      const value = loadedValues[i];
      try {
        const dataUrl = await renderOne(value, bulkType, bulkSize);
        const base64 = dataUrl.split(",")[1];
        zip.file(`${filePrefix}_${i + 1}_${sanitize(value)}.png`, base64, { base64: true });
      } catch (err) {
        failures++;
      }
      setProgress(Math.round(((i + 1) / loadedValues.length) * 100));
      if (i % 25 === 0) await new Promise((r) => setTimeout(r, 0));
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${filePrefix}_batch.zip`;
    link.click();
    URL.revokeObjectURL(url);

    if (failures > 0) {
      setNotice({ type: "error", msg: `Done, with ${failures} value(s) skipped because they weren't valid for the chosen format.` });
    } else {
      setNotice({ type: "success", msg: `Generated ${loadedValues.length} codes and downloaded the ZIP.` });
    }
  };

  return (
    <>
      <Seo
        title="Bulk Barcode & QR Generator (CSV to ZIP) | BarcodePro"
        description="Upload a CSV of values and generate hundreds of barcodes or QR codes at once, packaged into a downloadable ZIP file."
        path="/bulk-generator"
      jsonLd={[
        softwareAppJsonLd("Bulk Barcode & QR Generator", "Upload a CSV of values and generate hundreds of barcodes or QR codes at once, packaged into a downloadable ZIP file.", "/bulk-generator"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["Bulk Barcode & QR Generator", `${SITE}/bulk-generator`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Bulk Export</span>
        <h1>Bulk <span className="gradient-text">Barcode &amp; QR Generator</span></h1>
        <p>Upload a CSV with one value per row — SKUs, serial numbers, ticket IDs, URLs — and download every code at once as a ZIP of PNG files.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Workflow: a CSV file becomes many barcodes, packaged into a ZIP file">
          <rect width="800" height="200" fill="#161f32" />
          <g fontFamily="Arial, sans-serif">
            <g transform="translate(50,55)">
              <rect width="110" height="90" rx="8" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
              <text x="55" y="35" fill="#06b6d4" fontSize="13" fontWeight="bold" textAnchor="middle">.csv</text>
              <line x1="20" y1="50" x2="90" y2="50" stroke="#334155" strokeWidth="2" />
              <line x1="20" y1="62" x2="90" y2="62" stroke="#334155" strokeWidth="2" />
              <line x1="20" y1="74" x2="70" y2="74" stroke="#334155" strokeWidth="2" />
            </g>
            <path d="M175,100 L245,100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />
            <g transform="translate(270,45)">
              <rect x="0" y="0" width="55" height="35" fill="#ffffff" rx="3" />
              <g transform="translate(5,5)" fill="#0f172a"><rect x="0" width="2" height="24" /><rect x="4" width="3" height="24" /><rect x="9" width="2" height="24" /><rect x="13" width="4" height="24" /></g>
              <rect x="70" y="0" width="35" height="35" fill="#ffffff" rx="3" />
            </g>
            <text x="325" y="15" fill="#96a9c7" fontSize="11" textAnchor="middle">one code per row</text>
            <path d="M430,100 L500,100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />
            <g transform="translate(530,50)">
              <path d="M0,15 L15,0 L85,0 L85,85 L15,85 Z" fill="#38bdf8" opacity="0.9" />
              <text x="50" y="55" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">ZIP</text>
            </g>
            <text x="575" y="150" fill="#a5e6f2" fontSize="12" textAnchor="middle">one download,</text>
            <text x="575" y="166" fill="#a5e6f2" fontSize="12" textAnchor="middle">every file named</text>
          </g>
          <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#8b5cf6" /></marker></defs>
        </svg>
        <figcaption>One CSV in, one ZIP of individually named barcode or QR images out — all rendered locally.</figcaption>
      </figure>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="bulk-layout">
          <div className="card">
            <label>1. Choose Code Type</label>
            <select value={bulkType} onChange={(e) => setBulkType(e.target.value)}>
              <optgroup label="Barcode">
                <option value="CODE128">CODE128</option>
                <option value="CODE39">CODE39</option>
                <option value="EAN13">EAN13</option>
                <option value="EAN8">EAN8</option>
                <option value="UPC">UPC</option>
                <option value="ITF14">ITF14</option>
              </optgroup>
              <optgroup label="QR Code">
                <option value="QR">QR Code</option>
              </optgroup>
            </select>

            <div style={{ marginTop: 18 }}>
              <label>2. Upload CSV (one value per line, or a "value" column)</label>
              <div
                className={`dropzone${dragging ? " dragover" : ""}`}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
                }}
              >
                <span className="icon">📄</span>
                <p><strong>Click to upload</strong> or drag a .csv file here</p>
              </div>
              <input
                type="file"
                accept=".csv,text/csv"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={(e) => { if (e.target.files.length) handleFile(e.target.files[0]); }}
              />
            </div>

            <div style={{ marginTop: 18 }}>
              <label>...or paste values, one per line</label>
              <textarea placeholder={"SKU-00123\nSKU-00124\nSKU-00125"} value={pasteValues} onChange={onPasteChange} />
            </div>

            <div className="grid" style={{ marginTop: 10 }}>
              <div>
                <label>Filename Prefix</label>
                <input type="text" value={filePrefix} onChange={(e) => setFilePrefix(e.target.value)} />
              </div>
              <div>
                <label>Image Size (px)</label>
                <input type="number" min="100" max="1000" value={bulkSize} onChange={(e) => setBulkSize(parseInt(e.target.value, 10) || 400)} />
              </div>
            </div>

            <button className="btn-full" style={{ marginTop: 20 }} onClick={runBulkGenerate}>
              Generate &amp; Download ZIP
            </button>

            <div className="progress-wrap"><div className="progress-bar" style={{ width: `${progress}%` }} /></div>
            {notice && <div className={`notice notice-${notice.type}`}>{notice.msg}</div>}
          </div>

          <div className="card">
            <label>Preview (first 8 values)</label>
            <table className="preview-table">
              <thead><tr><th>#</th><th>Value</th></tr></thead>
              <tbody>
                {loadedValues.length === 0 ? (
                  <tr><td colSpan="2" style={{ color: "var(--dim)" }}>No values loaded yet.</td></tr>
                ) : (
                  loadedValues.slice(0, 8).map((v, i) => (
                    <tr key={i}><td>{i + 1}</td><td>{v}</td></tr>
                  ))
                )}
              </tbody>
            </table>
            <p style={{ color: "var(--dim)", fontSize: 13, marginTop: 14 }}>
              Total values loaded: <strong>{loadedValues.length}</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <h2 className="section-title">How <span className="gradient-text">bulk generation</span> works</h2>
        <div className="step-list">
          <div className="step">
            <div className="num">STEP 1</div>
            <h4>Upload or paste values</h4>
            <p>A CSV file, or a simple list pasted straight into the box — one value per row.</p>
          </div>
          <div className="step">
            <div className="num">STEP 2</div>
            <h4>Pick a code type</h4>
            <p>Choose any supported barcode symbology, or QR code, applied to every row.</p>
          </div>
          <div className="step">
            <div className="num">STEP 3</div>
            <h4>Download the ZIP</h4>
            <p>Every code renders locally in your browser and is packaged into one ZIP file — nothing is uploaded.</p>
          </div>
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 80 }}>
        <h2>Formatting your CSV correctly</h2>
        <p>
          The bulk tool accepts two layouts. The simplest is one value per line with no header. If your spreadsheet
          export includes a header row, add a column literally named <strong>value</strong> (lowercase); the tool
          will detect it and pull data from that column specifically, ignoring any other columns in the file.
        </p>
        <h2>Why some values get skipped</h2>
        <p>
          Different barcode symbologies accept different character sets. CODE39, for example, only supports
          uppercase letters, digits and a small set of symbols. EAN-13 and UPC-A expect a specific digit count and
          will reject values that are too short, too long, or non-numeric. Switching to CODE128 is usually the
          fastest fix if your batch finishes with values skipped.
        </p>
        <h2>Working with large batches</h2>
        <p>
          Because every code renders in your browser rather than on a server, we cap batches at 500 values as a
          practical ceiling for smooth performance. If you have a larger list, split it into a few CSV files and run
          each separately.
        </p>
      </section>
    </>
  );
}
