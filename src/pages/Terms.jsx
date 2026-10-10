import { Link } from "react-router-dom";
import Seo, { SITE } from "../components/Seo.jsx";
import { breadcrumbJsonLd } from "../lib/seoHelpers.js";

export default function Terms() {
  return (
    <>
      <Seo
        title="Terms of Service | BarcodePro"
        description="BarcodePro's terms of service covering acceptance, free service, liability and changes."
        path="/terms"
        jsonLd={breadcrumbJsonLd([["Home", `${SITE}/`], ["Terms of Service", `${SITE}/terms`]])}
      />

      <section className="page-hero">
        <span className="eyebrow">Legal</span>
        <h1>Terms of <span className="gradient-text">Service</span></h1>
      </section>

      <section className="wrap-narrow article" style={{ paddingBottom: 90 }}>
        <p style={{ color: "var(--dim)" }}>Effective Date: January 1, 2026</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing or using BarcodePro (the "Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.</p>

        <h2>Description of Service</h2>
        <p>BarcodePro provides free, browser-based tools for generating barcodes and QR codes, batch-generating codes from CSV data, and decoding barcodes and QR codes from uploaded images. All processing happens client-side in your browser; we do not require an account to use any tool.</p>

        <h2>Free Service, No Warranty</h2>
        <p>BarcodePro is provided free of charge, "as is" and "as available," without warranties of any kind, whether express or implied. We do not guarantee that generated codes will be free of errors, that the Service will be uninterrupted, or that it will meet your specific requirements.</p>

        <h2>Your Responsibility for Generated Codes</h2>
        <p>
          You are solely responsible for verifying that any code you generate is correct, scans reliably, and is
          appropriate for its intended use before relying on it. Generating a correctly formatted EAN-13 or UPC-A
          number does not mean that number is registered to you through GS1; see our{" "}
          <Link to="/blog/gs1-ean-upc-explained" style={{ color: "var(--accent-3)" }}>GS1 guide</Link> for details.
        </p>

        <h2>Acceptable Use</h2>
        <p>You agree not to use the Service to generate or distribute codes for unlawful purposes, including but not limited to fraud, counterfeiting of registered product identifiers you do not own, or any use intended to mislead consumers or circumvent another party's rights.</p>

        <h2>Intellectual Property</h2>
        <p>The BarcodePro name, logo, and site design are the property of BarcodePro. The underlying open-source libraries used for encoding and decoding remain subject to their own respective licenses. Codes you generate using the Service are yours to use for any lawful purpose, including commercial use, without attribution to BarcodePro.</p>

        <h2>Third-Party Advertising</h2>
        <p>
          This site may display advertisements served by third-party advertising networks, including Google
          AdSense. We are not responsible for the content of third-party advertisements. See our{" "}
          <Link to="/privacy" style={{ color: "var(--accent-3)" }}>Privacy Policy</Link> for details.
        </p>

        <h2>Limitation of Liability</h2>
        <p>To the fullest extent permitted by law, BarcodePro and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Service or any codes it generates.</p>

        <h2>Indemnification</h2>
        <p>You agree to indemnify and hold BarcodePro harmless from any claims, damages, or expenses arising from your use of the Service or violation of these terms.</p>

        <h2>Changes to the Service or Terms</h2>
        <p>We may modify, suspend, or discontinue any part of the Service at any time. These terms may also change without individual notice; continued use of the site after changes are posted constitutes acceptance of the updated terms.</p>

        <h2>Governing Law</h2>
        <p>These terms are governed by applicable law in the jurisdiction in which BarcodePro operates, without regard to conflict-of-law principles, to the extent permitted by local consumer protection law.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email:{" "}
          <a href="mailto:support@barcodepro.com" style={{ color: "var(--accent-3)" }}>support@barcodepro.com</a>
        </p>
      </section>
    </>
  );
}
