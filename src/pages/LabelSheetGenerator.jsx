import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

function renderOne(value, type, size) {
  return new Promise((resolve, reject) => {
    if (type === "QR") {
      const canvas = document.createElement("canvas");
      QRCode.toCanvas(canvas, value, { width: size, margin: 1 }, (err) => {
        if (err) return reject(err);
        resolve(canvas.toDataURL("image/png"));
      });
    } else {
      try {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        JsBarcode(svg, value, { format: type, displayValue: false, width: 2, height: size / 2.6, margin: 6 });
        const svgData = new XMLSerializer().serializeToString(svg);
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width || size;
          canvas.height = img.height || size / 2.6;
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

const PRESETS = {
  "3x10": { cols: 3, rows: 10, w: 63.5, h: 25.4, gap: 3 },
  "2x8": { cols: 2, rows: 8, w: 99.1, h: 33.9, gap: 2 },
  "1x1": { cols: 1, rows: 1, w: 190, h: 260, gap: 0 },
};

export default function LabelSheetGenerator() {
  const [sheetType, setSheetType] = useState("CODE128");
  const [pageSize, setPageSize] = useState("letter");
  const [preset, setPreset] = useState("custom");
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(10);
  const [labelW, setLabelW] = useState(63.5);
  const [labelH, setLabelH] = useState(25.4);
  const [gap, setGap] = useState(3);
  const [showCaption, setShowCaption] = useState(true);
  const [pasteValues, setPasteValues] = useState("");
  const [loadedValues, setLoadedValues] = useState([]);
  const [notice, setNotice] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [pages, setPages] = useState([]); // array of arrays of {value, dataUrl|null}
  const [showPrint, setShowPrint] = useState(false);
  const fileInputRef = useRef(null);
  const outputRef = useRef(null);

  const applyPreset = (key) => {
    setPreset(key);
    const p = PRESETS[key];
    if (p) {
      setCols(p.cols);
      setRows(p.rows);
      setLabelW(p.w);
      setLabelH(p.h);
      setGap(p.gap);
    }
  };

  const parseCSV = (text) => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length === 0) { setLoadedValues([]); return; }
    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const valueIdx = header.indexOf("value");
    let values;
    if (valueIdx !== -1) {
      values = lines.slice(1).map((l) => l.split(",")[valueIdx]?.trim()).filter(Boolean);
    } else {
      values = lines.map((l) => l.split(",")[0].trim()).filter(Boolean);
    }
    setPasteValues(values.join("\n"));
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
    setLoadedValues(text.split("\n").map((l) => l.trim()).filter(Boolean));
  };

  const pageDimsFor = (size) => (size === "a4" ? { w: 210, h: 297 } : { w: 215.9, h: 279.4 });

  const generateSheet = async () => {
    if (loadedValues.length === 0) {
      setNotice({ type: "error", msg: "Load some values first — upload a CSV or paste a list." });
      return;
    }

    const perPage = cols * rows;
    const totalPages = Math.ceil(loadedValues.length / perPage);

    if (totalPages > 25) {
      setNotice({ type: "error", msg: `That layout would need ${totalPages} pages for ${loadedValues.length} values. Increase rows/columns per page or reduce your list.` });
      return;
    }

    setShowPrint(false);
    setNotice({ type: "info", msg: "Rendering codes…" });

    const renderSize = Math.max(200, Math.round((Math.min(labelW, labelH) / 25.4) * 250));
    const newPages = [];
    let idx = 0;
    let failures = 0;

    for (let p = 0; p < totalPages; p++) {
      const cells = [];
      for (let c = 0; c < perPage && idx < loadedValues.length; c++, idx++) {
        const value = loadedValues[idx];
        try {
          const dataUrl = await renderOne(value, sheetType, renderSize);
          cells.push({ value, dataUrl });
        } catch (err) {
          failures++;
          cells.push({ value, dataUrl: null });
        }
      }
      newPages.push(cells);
      if (p % 2 === 0) await new Promise((r) => setTimeout(r, 0));
    }

    setPages(newPages);
    setShowPrint(true);

    if (failures > 0) {
      setNotice({ type: "error", msg: `Generated ${totalPages} page(s). ${failures} value(s) weren't valid for the chosen format and were skipped.` });
    } else {
      setNotice({ type: "success", msg: `Generated ${totalPages} page(s) covering ${loadedValues.length} code(s). Scroll down, then use Print / Save as PDF.` });
    }

    setTimeout(() => outputRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const dims = pageDimsFor(pageSize);

  return (
    <>
      <Seo
        title="Barcode & QR Label Sheet Generator | BarcodePro"
        description="Arrange dozens of barcodes or QR codes onto a printable label sheet. Set rows, columns and label size, then print or save as PDF."
        path="/label-sheet-generator"
      jsonLd={[
        softwareAppJsonLd("Label Sheet Generator", "Arrange dozens of barcodes or QR codes onto a printable label sheet. Set rows, columns and label size, then print or save as PDF.", "/label-sheet-generator"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["Label Sheet Generator", `${SITE}/label-sheet-generator`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Free Utility</span>
        <h1>Label Sheet <span className="gradient-text">Generator</span></h1>
        <p>Paste or upload a list of values and lay them out on a printable sheet — set the rows, columns, and label size to match the labels or paper you actually have, then print or save as PDF.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A printable page divided into a grid of label cells, each containing a small barcode">
          <rect width="800" height="220" fill="#161f32" />
          <g transform="translate(260,20)">
            <rect width="280" height="180" fill="#ffffff" rx="4" />
            <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3">
              <line x1="94" y1="10" x2="94" y2="170" /><line x1="188" y1="10" x2="188" y2="170" />
              <line x1="10" y1="70" x2="270" y2="70" /><line x1="10" y1="130" x2="270" y2="130" />
            </g>
          </g>
          <g fontFamily="Arial, sans-serif">
            <text x="20" y="45" fill="#8b5cf6" fontSize="12.5">Columns × rows</text>
            <text x="20" y="62" fill="#96a9c7" fontSize="11">you set</text>
            <text x="710" y="115" fill="#06b6d4" fontSize="12.5">Label width/height</text>
            <text x="710" y="132" fill="#96a9c7" fontSize="11">in millimeters</text>
          </g>
        </svg>
        <figcaption>Every value in your list becomes one cell, sized to your real label sheet — ready to print or save as a PDF.</figcaption>
      </figure>

      <section className="wrap" style={{ paddingBottom: 40 }}>
        <div className="card">
          <div className="grid">
            <div>
              <label>Code Type</label>
              <select value={sheetType} onChange={(e) => setSheetType(e.target.value)}>
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
            </div>
            <div>
              <label>Page Size</label>
              <select value={pageSize} onChange={(e) => setPageSize(e.target.value)}>
                <option value="letter">US Letter (215.9 × 279.4mm)</option>
                <option value="a4">A4 (210 × 297mm)</option>
              </select>
            </div>
            <div>
              <label>Preset Layout</label>
              <select value={preset} onChange={(e) => applyPreset(e.target.value)}>
                <option value="custom">Custom (set manually)</option>
                <option value="3x10">3 × 10 — small address-style labels</option>
                <option value="2x8">2 × 8 — medium shipping labels</option>
                <option value="1x1">1 × 1 — full-page label</option>
              </select>
            </div>
          </div>

          <div className="grid" style={{ marginTop: 6 }}>
            <div><label>Columns</label><input type="number" min="1" max="10" value={cols} onChange={(e) => setCols(parseInt(e.target.value, 10) || 1)} /></div>
            <div><label>Rows per page</label><input type="number" min="1" max="20" value={rows} onChange={(e) => setRows(parseInt(e.target.value, 10) || 1)} /></div>
            <div><label>Label width (mm)</label><input type="number" min="10" max="200" step="0.1" value={labelW} onChange={(e) => setLabelW(parseFloat(e.target.value) || 60)} /></div>
            <div><label>Label height (mm)</label><input type="number" min="10" max="200" step="0.1" value={labelH} onChange={(e) => setLabelH(parseFloat(e.target.value) || 30)} /></div>
            <div><label>Gap between labels (mm)</label><input type="number" min="0" max="30" step="0.5" value={gap} onChange={(e) => setGap(parseFloat(e.target.value) || 0)} /></div>
          </div>

          <div className="checkbox-row">
            <input type="checkbox" id="showCaption" checked={showCaption} onChange={(e) => setShowCaption(e.target.checked)} />
            <label htmlFor="showCaption">Show the value as text under each code</label>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "20px 0" }} />

          <label>Values (one per line)</label>
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
          <input type="file" accept=".csv,text/csv" ref={fileInputRef} style={{ display: "none" }}
            onChange={(e) => { if (e.target.files.length) handleFile(e.target.files[0]); }} />

          <label style={{ marginTop: 14 }}>...or paste values, one per line</label>
          <textarea placeholder={"SKU-00123\nSKU-00124\nSKU-00125"} value={pasteValues} onChange={onPasteChange} />

          <p style={{ color: "var(--dim)", fontSize: 13, marginTop: 6 }}>Loaded values: <strong>{loadedValues.length}</strong></p>

          <button className="btn-full" style={{ marginTop: 14 }} onClick={generateSheet}>Generate Sheet</button>
          {showPrint && (
            <button className="btn-outline btn-full" style={{ marginTop: 10 }} onClick={() => window.print()}>
              Print / Save as PDF
            </button>
          )}
          {notice && <div className={`notice notice-${notice.type}`}>{notice.msg}</div>}
        </div>
      </section>

      {pages.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 60 }} ref={outputRef}>
          <div id="sheetOutputWrap" style={{ margin: "30px 0", padding: 24, background: "#334155", borderRadius: 20, overflowX: "auto" }}>
            <div id="sheetOutput">
              {pages.map((cells, pIdx) => (
                <div
                  className="sheet-page"
                  key={pIdx}
                  style={{
                    width: `${dims.w}mm`,
                    height: `${dims.h}mm`,
                    gridTemplateColumns: `repeat(${cols}, ${labelW}mm)`,
                    gridTemplateRows: `repeat(${rows}, ${labelH}mm)`,
                    gap: `${gap}mm`,
                    padding: `${gap}mm`,
                    justifyContent: "center",
                  }}
                >
                  {cells.map((cell, cIdx) => (
                    <div className="sheet-cell" key={cIdx}>
                      {cell.dataUrl ? (
                        <img src={cell.dataUrl} alt={cell.value} />
                      ) : (
                        <span style={{ fontSize: 10, color: "#b91c1c" }}>invalid value</span>
                      )}
                      {showCaption && <div className="cap">{cell.value}</div>}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <h2>Matching real label sheets</h2>
        <p>
          Measure your actual label sheet for the exact label width, height and gap, and set the page size to match
          what your printer expects — most home and office printers default to US Letter in North America and A4
          elsewhere.
        </p>
        <h2>Getting a clean print</h2>
        <p>
          Before running a full batch, print a single test page and check it against your physical sheet. If the
          grid is slightly offset, set your printer's scaling to "100% / Actual size" rather than "Fit to page."
        </p>
        <h2>Where the values come from</h2>
        <p>
          Paste a plain list, upload a CSV with a <code>value</code> column, or drop in a file exported from the{" "}
          <Link to="/serial-generator" style={{ color: "var(--accent-3)" }}>serial generator</Link>. For very large
          runs, the <Link to="/bulk-generator" style={{ color: "var(--accent-3)" }}>bulk generator</Link> is still
          the better choice for producing individual PNG files.
        </p>
      </section>
    </>
  );
}
