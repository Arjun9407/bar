import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent = null;
    try {
      consent = localStorage.getItem("bp_cookie_consent");
    } catch (e) {
      /* ignore */
    }
    if (!consent) setVisible(true);
  }, []);

  const setConsent = (accepted) => {
    try {
      localStorage.setItem("bp_cookie_consent", accepted ? "accepted" : "declined");
    } catch (e) {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      id="cookieBanner"
      style={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2000,
        background: "#0b1220",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "16px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <p style={{ color: "#cbd5e1", fontSize: 13.5, lineHeight: 1.6, margin: 0, maxWidth: 720 }}>
          We use cookies for basic site functionality and to support advertising, including personalized ads served
          via Google AdSense. See our <Link to="/privacy" style={{ color: "#38bdf8" }}>Privacy Policy</Link> for
          details and opt-out options.
        </p>
        <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
          <button
            onClick={() => setConsent(false)}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#cbd5e1",
              padding: "9px 16px",
              borderRadius: 10,
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            Decline
          </button>
          <button
            onClick={() => setConsent(true)}
            style={{
              background: "linear-gradient(to right,#06b6d4,#8b5cf6)",
              border: "none",
              color: "white",
              padding: "9px 16px",
              borderRadius: 10,
              fontSize: 13,
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
