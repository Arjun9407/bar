import { Link } from "react-router-dom";
import Seo from "../components/Seo.jsx";

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found | BarcodePro" description="The page you're looking for doesn't exist." path="/404" />
      <section className="page-hero" style={{ paddingTop: 100, paddingBottom: 100 }}>
        <span className="eyebrow">404</span>
        <h1>Page not <span className="gradient-text">found</span></h1>
        <p>The page you're looking for doesn't exist or has moved.</p>
        <div style={{ marginTop: 28 }}>
          <Link className="btn" to="/">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
