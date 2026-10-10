import Seo, { SITE } from "./Seo.jsx";
import { blogPostingJsonLd, breadcrumbJsonLd } from "../lib/seoHelpers.js";

/**
 * Shared chrome for every blog post: hero, meta line, illustration slot,
 * article body, and the BlogPosting + BreadcrumbList structured data.
 */
export default function BlogArticle({ eyebrow, title, meta, path, seoTitle, seoDescription, dateIso, illustration, children }) {
  return (
    <>
      <Seo
        title={seoTitle}
        description={seoDescription}
        path={path}
        type="article"
        jsonLd={[
          blogPostingJsonLd(seoTitle.replace(/ \| BarcodePro.*/, ""), seoDescription, path, dateIso),
          breadcrumbJsonLd([
            ["Home", `${SITE}/`],
            ["Blog", `${SITE}/blog`],
            [seoTitle.replace(/ \| BarcodePro.*/, ""), `${SITE}${path}`],
          ]),
        ]}
      />

      <section className="page-hero" style={{ paddingBottom: 10 }}>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </section>

      <article className="article">
        <p className="meta">{meta}</p>
        {illustration}
        {children}
      </article>
    </>
  );
}
