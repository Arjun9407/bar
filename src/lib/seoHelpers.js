import { SITE, OG_IMAGE } from "../components/Seo.jsx";

export function breadcrumbJsonLd(items) {
  // items: array of [name, url]
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: url,
    })),
  };
}

export function blogPostingJsonLd(headline, description, path, dateIso) {
  const url = `${SITE}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description,
    url,
    datePublished: dateIso,
    dateModified: dateIso,
    author: { "@type": "Organization", name: "BarcodePro" },
    publisher: {
      "@type": "Organization",
      name: "BarcodePro",
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
}

export function softwareAppJsonLd(name, description, path) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    url: `${SITE}${path}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any (runs in browser)",
    description,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };
}
