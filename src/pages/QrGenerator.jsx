import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import Seo, { SITE } from "../components/Seo.jsx";
import { softwareAppJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

const TABS = [
  { key: "url", label: "Link" },
  { key: "text", label: "Text" },
  { key: "wifi", label: "WiFi" },
  { key: "email", label: "Email" },
  { key: "vcard", label: "Contact Card" },
];

export default function QrGenerator() {
  const [type, setType] = useState("url");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [wifiSsid, setWifiSsid] = useState("");
  const [wifiPass, setWifiPass] = useState("");
  const [wifiSec, setWifiSec] = useState("WPA");
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [vName, setVName] = useState("");
  const [vPhone, setVPhone] = useState("");
  const [vEmail, setVEmail] = useState("");
  const [vCompany, setVCompany] = useState("");

  const [size, setSize] = useState(300);
  const [ecc, setEcc] = useState("M");
  const [fg, setFg] = useState("#0f172a");
  const [bg, setBg] = useState("#ffffff");
  const [notice, setNotice] = useState(null);
  const [svgString, setSvgString] = useState("");

  const canvasRef = useRef(null);

  const buildPayload = () => {
    switch (type) {
      case "url":
        return url.trim() || "https://barcodepro.pages.dev";
      case "text":
        return text.trim() || "Hello from BarcodePro";
      case "wifi":
        return `WIFI:T:${wifiSec};S:${wifiSsid};P:${wifiSec === "nopass" ? "" : wifiPass};;`;
      case "email":
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case "vcard":
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vName}\nORG:${vCompany}\nTEL:${vPhone}\nEMAIL:${vEmail}\nEND:VCARD`;
      default:
        return "";
    }
  };

  const render = async () => {
    const payload = buildPayload();
    const opts = {
      errorCorrectionLevel: ecc,
      margin: 2,
      width: size,
      color: { dark: fg, light: bg },
    };
    try {
      if (canvasRef.current) {
        await QRCode.toCanvas(canvasRef.current, payload, opts);
      }
      const svg = await QRCode.toString(payload, { ...opts, type: "svg" });
      setSvgString(svg);
      setNotice(null);
    } catch (err) {
      setNotice({ type: "error", msg: "Could not generate that QR code. Try shorter input or a lower error-correction level." });
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    render();
  }, [type, url, text, wifiSsid, wifiPass, wifiSec, emailTo, emailSubject, emailBody, vName, vPhone, vEmail, vCompany, size, ecc, fg, bg]);

  const downloadPNG = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const copyImage = () => {
    if (!canvasRef.current) return;
    canvasRef.current.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        setNotice({ type: "success", msg: "QR code image copied to clipboard." });
      } catch (err) {
        setNotice({ type: "error", msg: "Your browser blocked image copying — use Download PNG instead." });
      }
    }, "image/png");
  };

  const downloadSVG = () => {
    if (!svgString) {
      setNotice({ type: "error", msg: "Generate a QR code first." });
      return;
    }
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "qrcode.svg";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <>
      <Seo
        title="Free QR Code Generator | BarcodePro"
        description="Generate free QR codes for links, WiFi, text, email and contact cards. Customize colors and size, download as PNG or SVG."
        path="/qr-generator"
      jsonLd={[
        softwareAppJsonLd("QR Code Generator", "Generate free QR codes for links, WiFi, text, email and contact cards. Customize colors and size, download as PNG or SVG.", "/qr-generator"),
        breadcrumbJsonLd([["Home", `${SITE}/`], ["Tools", `${SITE}/tools`], ["QR Code Generator", `${SITE}/qr-generator`]]),
      ]}
    />

      <section className="page-hero">
        <span className="eyebrow">Free QR Tool</span>
        <h1>QR Code <span className="gradient-text">Generator</span></h1>
        <p>Build a QR code for a website, WiFi network, contact card or plain text. Customize the look, then download it as a PNG or SVG — free and unlimited.</p>
        <div style={{ marginTop: 32 }}>
          <img
            src="/assets/images/qr-code-sample.jpg"
            alt="Example QR code"
            style={{ maxWidth: 200, width: "100%", borderRadius: 18, background: "white", padding: 16, boxShadow: "0 15px 50px rgba(0,0,0,0.45)" }}
          />
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <div className="qr-layout">
          <div className="card">
            <div className="type-tabs">
              {TABS.map((t) => (
                <button key={t.key} className={type === t.key ? "active" : ""} onClick={() => setType(t.key)}>
                  {t.label}
                </button>
              ))}
            </div>

            {type === "url" && (
              <div className="field-group">
                <label>Website URL</label>
                <input type="text" placeholder="https://example.com" value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
            )}

            {type === "text" && (
              <div className="field-group">
                <label>Text</label>
                <textarea placeholder="Any text you want encoded" value={text} onChange={(e) => setText(e.target.value)} />
              </div>
            )}

            {type === "wifi" && (
              <div>
                <div className="field-group">
                  <label>Network Name (SSID)</label>
                  <input type="text" placeholder="MyHomeWiFi" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Password</label>
                  <input type="text" placeholder="••••••••" value={wifiPass} onChange={(e) => setWifiPass(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Security</label>
                  <select value={wifiSec} onChange={(e) => setWifiSec(e.target.value)}>
                    <option value="WPA">WPA/WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">None</option>
                  </select>
                </div>
              </div>
            )}

            {type === "email" && (
              <div>
                <div className="field-group">
                  <label>Email Address</label>
                  <input type="email" placeholder="hello@example.com" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Message</label>
                  <textarea placeholder="Message" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} />
                </div>
              </div>
            )}

            {type === "vcard" && (
              <div className="grid">
                <div className="field-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Jane Doe" value={vName} onChange={(e) => setVName(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Phone</label>
                  <input type="text" placeholder="+1 555 123 4567" value={vPhone} onChange={(e) => setVPhone(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Email</label>
                  <input type="email" placeholder="jane@example.com" value={vEmail} onChange={(e) => setVEmail(e.target.value)} />
                </div>
                <div className="field-group">
                  <label>Company</label>
                  <input type="text" placeholder="Company Inc." value={vCompany} onChange={(e) => setVCompany(e.target.value)} />
                </div>
              </div>
            )}

            <hr style={{ border: "none", borderTop: "1px solid var(--border)", margin: "22px 0" }} />

            <div className="grid">
              <div className="field-group">
                <label>Size (px)</label>
                <input type="number" min="100" max="1000" value={size} onChange={(e) => setSize(parseInt(e.target.value, 10) || 300)} />
              </div>
              <div className="field-group">
                <label>Error Correction</label>
                <select value={ecc} onChange={(e) => setEcc(e.target.value)}>
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
            </div>

            <div className="color-row">
              <div>
                <label>Foreground</label>
                <input type="color" value={fg} onChange={(e) => setFg(e.target.value)} />
              </div>
              <div>
                <label>Background</label>
                <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} />
              </div>
            </div>

            {notice && <div className={`notice notice-${notice.type}`}>{notice.msg}</div>}
          </div>

          <div className="preview-box">
            <canvas ref={canvasRef} width={size} height={size} style={{ maxWidth: "100%", borderRadius: 10 }} />
            <div className="preview-actions" style={{ flexWrap: "wrap" }}>
              <button className="btn-outline" style={{ flex: 1 }} onClick={downloadPNG}>Download PNG</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={downloadSVG}>Download SVG</button>
              <button className="btn-outline" style={{ flex: 1 }} onClick={copyImage}>Copy Image</button>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 80 }}>
        <h2 className="section-title">Why use a <span className="gradient-text">QR code</span>?</h2>
        <p className="section-sub">QR codes pack a link, WiFi login or contact card into a pattern any phone camera can read instantly — no app or typing required.</p>
        <div className="feature-grid">
          <div className="feature-card">
            <span className="icon">🔗</span>
            <h3>Link sharing</h3>
            <p>Point people to a menu, portfolio or landing page with a single scan.</p>
          </div>
          <div className="feature-card">
            <span className="icon">📶</span>
            <h3>Instant WiFi</h3>
            <p>Guests join your network by scanning — no password typing on a tiny keyboard.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🪪</span>
            <h3>Digital business cards</h3>
            <p>Encode a vCard so contacts get saved straight to a phone's address book.</p>
          </div>
          <div className="feature-card">
            <span className="icon">🔒</span>
            <h3>Private by design</h3>
            <p>Everything is generated locally in your browser — nothing is uploaded or logged.</p>
          </div>
        </div>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 80 }}>
        <h2>Choosing an error correction level</h2>
        <p>
          Every QR code has a built-in error-correction level — Low, Medium, Quartile or High — that determines how
          much of the code can be damaged, dirty, or obscured before it stops scanning. Higher correction levels add
          redundant data, which makes the code denser (more modules) for the same content, but means it will still
          scan even if part of it is torn, smudged, or has a small logo placed over the center.
        </p>
        <p>
          For most everyday uses — a link on a flyer, a WiFi card, a menu on a laminated table tent — Medium (15%)
          is a reasonable default. If the code is going somewhere it might get scuffed, printed small, or partially
          covered, step up to Quartile or High. If you're only ever displaying the code on a clean screen and space
          is at a premium, Low (7%) keeps the module count as small as possible.
        </p>
        <h2>Sizing and contrast tips for printed QR codes</h2>
        <p>
          A QR code needs a certain minimum physical size to scan reliably, and that minimum scales with how much
          data it holds. As a rough starting point, aim for at least 2cm (about 0.8in) per side for a simple URL
          viewed from a normal reading distance, and size up for anything with more content or scanned from farther
          away.
        </p>
        <p>
          Keep a clear quiet zone around the code, and stick to strong contrast between the foreground and
          background colors — check your combination on the{" "}
          <a href="/qr-contrast-checker" style={{ color: "var(--accent-3)" }}>contrast checker</a> before printing.
        </p>
      </section>
    </>
  );
}
