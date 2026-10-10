import { useState } from "react";
import emailjs from "@emailjs/browser";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    emailjs
      .send(
        "service_v8o1us7",
        "template_ttz40in",
        { name, email, message },
        { publicKey: "8efS4c4n9VopFRhQS" }
      )
      .then(() => {
        setStatus({ type: "success", msg: "Message sent successfully!" });
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err) => {
        setStatus({ type: "error", msg: "Failed to send message. Please try again." });
        console.log(err);
      });
  };

  return (
    <>
      <Seo
        title="Contact BarcodePro"
        description="Contact BarcodePro for support, feedback or partnership inquiries."
        path="/contact"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Contact BarcodePro", `${SITE}/contact`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Get in Touch</span>
        <h1>Contact <span className="gradient-text">Us</span></h1>
        <p>Questions, feedback, or a feature you'd like to see? Send us a message — we usually reply within 48 hours.</p>
      </section>

      <figure className="page-illustration">
        <svg viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An envelope with a barcode stamp sending a message">
          <rect width="800" height="200" fill="#161f32" />
          <g transform="translate(300,45)">
            <rect x="0" y="0" width="200" height="120" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="2" />
            <path d="M0,10 L100,80 L200,10" fill="none" stroke="#334155" strokeWidth="2" />
            <rect x="30" y="30" width="60" height="24" fill="#ffffff" rx="2" />
          </g>
          <path d="M510,105 C560,95 600,60 630,40" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="6,6" />
          <circle cx="630" cy="40" r="5" fill="#8b5cf6" />
          <text x="670" y="45" fill="#a5e6f2" fontFamily="Arial, sans-serif" fontSize="13" textAnchor="middle">Reply in</text>
          <text x="670" y="62" fill="#a5e6f2" fontFamily="Arial, sans-serif" fontSize="13" textAnchor="middle">~48 hours</text>
        </svg>
        <figcaption>Send a message using the form below, or email us directly — either way reaches the same inbox.</figcaption>
      </figure>

      <section className="wrap-narrow" style={{ paddingBottom: 90 }}>
        <div className="card">
          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label>Your Name</label>
              <input type="text" placeholder="Jane Doe" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label>Your Email</label>
              <input type="email" placeholder="jane@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Message</label>
              <textarea placeholder="How can we help?" required value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <button type="submit" className="btn-full">Send Message</button>
          </form>
          {status && <div className={`notice notice-${status.type}`} style={{ marginTop: 14 }}>{status.msg}</div>}
        </div>

        <p style={{ textAlign: "center", color: "var(--muted)", marginTop: 30 }}>
          Or email us directly at{" "}
          <a href="mailto:support@barcodepro.com" style={{ color: "var(--accent-3)" }}>support@barcodepro.com</a>
        </p>
      </section>
    </>
  );
}
