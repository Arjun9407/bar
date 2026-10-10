import { useEffect } from "react";

const SITE = "https://barcodepro.pages.dev";
const OG_IMAGE = "https://cdn-icons-png.flaticon.com/512/1041/1041916.png";

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets title, meta description, canonical, Open Graph/Twitter tags,
 * and optional JSON-LD structured data blocks for the current page.
 *
 * jsonLd: an object or array of objects to serialize as
 * <script type="application/ld+json"> blocks (replaced on every render).
 */
export default function Seo({ title, description, path, type = "website", jsonLd }) {
  useEffect(() => {
    const canonical = `${SITE}${path}`;

    document.title = title;
    setMeta("name", "description", description);
    setLink("canonical", canonical);

    setMeta("property", "og:type", type);
    setMeta("property", "og:site_name", "BarcodePro");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", OG_IMAGE);

    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", OG_IMAGE);
    setMeta("name", "robots", "index,follow,max-image-preview:large");

    // Clear any JSON-LD blocks we previously injected, then add fresh ones.
    document.querySelectorAll('script[data-seo-jsonld="1"]').forEach((n) => n.remove());

    if (jsonLd) {
      const blocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
      blocks.forEach((obj) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.setAttribute("data-seo-jsonld", "1");
        script.text = JSON.stringify(obj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, path, type, jsonLd]);

  return null;
}

export { SITE, OG_IMAGE };
