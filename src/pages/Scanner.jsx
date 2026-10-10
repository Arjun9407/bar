import { useRef, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function Scanner() {
  const [previewSrc, setPreviewSrc] = useState(null);
  const [notice, setNotice] = useState(null);
  const [result, setResult] = useState(null); // { text, format }
  const [dragging, setDragging] = useState(false);
  const [copyMsg, setCopyMsg] = useState(null);
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);

  const decode = async (imgEl) => {
    try {
      const codeReader = new BrowserMultiFormatReader();
      const res = await codeReader.decodeFromImageElement(imgEl);
      const text = res.getText();
      const format = res.getBarcodeFormat ? res.getBarcodeFormat() : "";
      setResult({ text, format: String(format) });
    } catch (err) {
      setResult(null);
      setNotice({ type: "info", msg: "No code could be decoded from that image. Try a clearer, more direct photo." });
    }
  };

  const handleImage = (file) => {
    if (!file.type.startsWith("image/")) {
      setNotice({ type: "error", msg: "Please upload an image file." });
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewSrc(url);
    setNotice(null);
    setResult("decoding");
  };

  const onImgLoad = () => {
    if (imgRef.current) decode(imgRef.current);
  };

  const copyResult = () => {
    if (!result || !result.text) return;
    navigator.clipboard
      .writeText(result.text)
      .then(() => setCopyMsg({ type: "success", msg: "Copied to clipboard." }))
      .catch(() => setCopyMsg({ type: "error", msg: "Could not copy automatically — please select and copy manually." }));
  };

  return (
    <>
      <Seo
        title="Free Barcode & QR Code Scanner | BarcodePro"
        description="Decode barcodes and QR codes from any uploaded photo or screenshot, right in your browser. No app install, no upload to a server."
        path="/scanner"
      jsonLd={[
        softwareAppJsonLd("Barcode & QR Scanner", "Decode barcodes and QR codes from any uploaded photo or screenshot, right in your browser. No app install, no upload to a server.", "/scanner"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["Barcode & QR Scanner", `${SITE}/scanner`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Decode Instantly</span>
        <h1>Barcode &amp; QR <span className="gradient-text">Scanner</span></h1>
        <p>Upload a photo or screenshot containing a barcode or QR code and read its value instantly. Decoding happens locally in your browser.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A photo of a barcode being decoded into text locally in the browser">
          <rect width="800" height="200" fill="#161f32" />
          <g fontFamily="Arial, sans-serif">
            <g transform="translate(60,45)">
              <rect width="150" height="110" rx="10" fill="#334155" />
              <rect x="10" y="10" width="130" height="90" fill="#ffffff" rx="4" />
              <g transform="translate(35,40)" fill="#0f172a"><rect x="0" width="3" height="35" /><rect x="7" width="5" height="35" /><rect x="16" width="3" height="35" /></g>
              <circle cx="130" cy="18" r="6" fill="#f87171" />
            </g>
            <text x="135" y="175" fill="#96a9c7" fontSize="11" textAnchor="middle">uploaded photo</text>
            <path d="M230,100 L300,100" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow2)" />
            <g transform="translate(330,60)">
              <rect width="90" height="90" rx="45" fill="none" stroke="#8b5cf6" strokeWidth="3" />
            </g>
            <text x="375" y="170" fill="#96a9c7" fontSize="11" textAnchor="middle">finder patterns located</text>
            <path d="M460,100 L530,100" stroke="#06b6d4" strokeWidth="2" strokeDasharray="5,5" markerEnd="url(#arrow2)" />
            <g transform="translate(560,55)">
              <rect width="190" height="90" rx="12" fill="#1e293b" stroke="#38bdf8" />
              <text x="95" y="35" fill="#a5e6f2" fontSize="11" textAnchor="middle">Decoded value:</text>
              <text x="95" y="58" fill="#e2e8f0" fontSize="13" fontWeight="bold" textAnchor="middle">0123456789012</text>
            </g>
          </g>
          <defs><marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#06b6d4" /></marker></defs>
        </svg>
        <figcaption>Upload a photo, and the decoder finds and reads the code entirely inside your browser — no server round-trip.</figcaption>
      </figure>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="scan-layout">
          <div className="card">
            <label>Upload an image</label>
            <div
              className={`dropzone${dragging ? " dragover" : ""}`}
              onClick={() => fileInputRef.current.click()}
              onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                if (e.dataTransfer.files.length) handleImage(e.dataTransfer.files[0]);
              }}
            >
              <span className="icon">📷</span>
              <p><strong>Click to upload</strong> or drag an image here</p>
              <p style={{ fontSize: 12 }}>JPG, PNG or WEBP — clear, well-lit photos decode best</p>
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => { if (e.target.files.length) handleImage(e.target.files[0]); }}
            />
            {previewSrc && (
              <img ref={imgRef} src={previewSrc} onLoad={onImgLoad} alt="Uploaded code preview" style={{ maxWidth: "100%", borderRadius: 14, marginTop: 16 }} />
            )}
            {notice && <div className={`notice notice-${notice.type}`}>{notice.msg}</div>}
          </div>

          <div className="card">
            <label>Result</label>
            {result === "decoding" && <p style={{ color: "var(--dim)" }}>Decoding…</p>}
            {result && result !== "decoding" && (
              <>
                <div className="result-line">
                  <span className="label">{result.format || "Decoded"}</span>
                  {result.text}
                </div>
                <button className="copy-btn btn-outline" onClick={copyResult}>Copy Value</button>
                {copyMsg && <div className={`notice notice-${copyMsg.type}`}>{copyMsg.msg}</div>}
              </>
            )}
            {!result && <p style={{ color: "var(--dim)" }}>Upload an image to see the decoded value here.</p>}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <h2 className="section-title">Tips for a <span className="gradient-text">clean scan</span></h2>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">💡</span>
            <h3>Good lighting</h3>
            <p>Avoid glare and shadows across the code — even lighting decodes far more reliably.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔍</span>
            <h3>Fill the frame</h3>
            <p>Crop the photo so the code takes up most of the image before uploading.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📐</span>
            <h3>Keep it flat</h3>
            <p>Steep angles distort the pattern. Shoot as straight-on as possible.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔒</span>
            <h3>Stays on your device</h3>
            <p>Images are decoded locally in the browser and are never uploaded anywhere.</p>
          </div>
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 80 }}>
        <h2>How the scanner works</h2>
        <p>
          The scanner uses a browser-based decoding library that analyzes the pixel data of your uploaded image
          directly, looking for the finder patterns and timing markers that identify a barcode or QR code region,
          then reading the encoded bars or modules within it. The image is never transmitted anywhere.
        </p>
        <h2>What formats can it read?</h2>
        <p>
          The decoder recognizes both major families: linear barcodes (CODE128, CODE39, EAN-13, EAN-8, UPC-A,
          UPC-E, ITF, Codabar) and 2D formats (QR Code, Data Matrix, Aztec, PDF417). It automatically detects which
          format it's looking at.
        </p>
        <h2>Common reasons a scan fails</h2>
        <p>
          If an upload doesn't decode, it's almost always the code being too small in the frame, motion blur or poor
          focus, glare, a steep viewing angle, or low contrast in the original print.
        </p>
      </section>
    </>
  );
}
