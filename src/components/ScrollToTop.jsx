import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on route change, unless the URL has a hash (e.g. /#generator),
// in which case it scrolls that element into view instead.
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
