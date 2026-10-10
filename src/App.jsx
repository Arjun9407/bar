import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import PageLoading from "./components/PageLoading.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const QrGenerator = lazy(() => import("./pages/QrGenerator.jsx"));
const BulkGenerator = lazy(() => import("./pages/BulkGenerator.jsx"));
const Scanner = lazy(() => import("./pages/Scanner.jsx"));
const CheckDigitCalculator = lazy(() => import("./pages/CheckDigitCalculator.jsx"));
const SizeCalculator = lazy(() => import("./pages/SizeCalculator.jsx"));
const SerialGenerator = lazy(() => import("./pages/SerialGenerator.jsx"));
const LabelSheetGenerator = lazy(() => import("./pages/LabelSheetGenerator.jsx"));
const QrContrastChecker = lazy(() => import("./pages/QrContrastChecker.jsx"));

const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogHistory = lazy(() => import("./pages/blog/BlogHistory.jsx"));
const BlogQrVsBarcode = lazy(() => import("./pages/blog/BlogQrVsBarcode.jsx"));
const BlogPrinting = lazy(() => import("./pages/blog/BlogPrinting.jsx"));
const BlogTypes = lazy(() => import("./pages/blog/BlogTypes.jsx"));
const BlogEcommerce = lazy(() => import("./pages/blog/BlogEcommerce.jsx"));
const BlogGs1 = lazy(() => import("./pages/blog/BlogGs1.jsx"));
const BlogScanners = lazy(() => import("./pages/blog/BlogScanners.jsx"));

const UseCases = lazy(() => import("./pages/UseCases.jsx"));
const Glossary = lazy(() => import("./pages/Glossary.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Faq = lazy(() => import("./pages/Faq.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Tools = lazy(() => import("./pages/Tools.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/qr-generator" element={<QrGenerator />} />
            <Route path="/bulk-generator" element={<BulkGenerator />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/check-digit-calculator" element={<CheckDigitCalculator />} />
            <Route path="/size-calculator" element={<SizeCalculator />} />
            <Route path="/serial-generator" element={<SerialGenerator />} />
            <Route path="/label-sheet-generator" element={<LabelSheetGenerator />} />
            <Route path="/qr-contrast-checker" element={<QrContrastChecker />} />

            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/history-of-barcodes" element={<BlogHistory />} />
            <Route path="/blog/qr-vs-barcode" element={<BlogQrVsBarcode />} />
            <Route path="/blog/printing-barcode-labels" element={<BlogPrinting />} />
            <Route path="/blog/barcode-types-explained" element={<BlogTypes />} />
            <Route path="/blog/barcodes-ecommerce-shipping" element={<BlogEcommerce />} />
            <Route path="/blog/gs1-ean-upc-explained" element={<BlogGs1 />} />
            <Route path="/blog/how-scanners-work" element={<BlogScanners />} />

            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/glossary" element={<Glossary />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
