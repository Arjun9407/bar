import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="logo" style={{ marginBottom: 14 }}>BarcodePro</div>
          <p>Free, unlimited barcode and QR code tools that run entirely in your browser. Nothing you generate or scan is ever uploaded to a server.</p>
        </div>
        <div className="footer-col">
          <h4>Tools</h4>
          <Link to="/#generator">Barcode Generator</Link>
          <Link to="/qr-generator">QR Code Generator</Link>
          <Link to="/bulk-generator">Bulk Generator</Link>
          <Link to="/scanner">Barcode Scanner</Link>
          <Link to="/check-digit-calculator">Check Digit Calculator</Link>
          <Link to="/size-calculator">Size Calculator</Link>
          <Link to="/serial-generator">Serial Generator</Link>
          <Link to="/label-sheet-generator">Label Sheet Generator</Link>
          <Link to="/qr-contrast-checker">Contrast Checker</Link>
        </div>
        <div className="footer-col">
          <h4>Company</h4>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/use-cases">Use Cases</Link>
          <Link to="/glossary">Glossary</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/faq">FAQ</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
      <div className="footer-bottom">© 2026 BarcodePro. All rights reserved.</div>
    </footer>
  );
}
