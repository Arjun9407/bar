import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

const navClass = ({ isActive }) => (isActive ? "active" : undefined);

export default function Header({ onSearch }) {
  return (
    <header className="site-header">
      <div className="navbar">
        <NavLink to="/" className="logo" end>
          BarcodePro
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={navClass}>Home</NavLink>
          <NavLink to="/#generator">Generator</NavLink>
          <NavLink to="/qr-generator" className={navClass}>QR Code</NavLink>
          <NavLink to="/bulk-generator" className={navClass}>Bulk</NavLink>
          <NavLink to="/scanner" className={navClass}>Scanner</NavLink>
          <NavLink to="/check-digit-calculator" className={navClass}>Check Digit</NavLink>
          <NavLink to="/size-calculator" className={navClass}>Size Calculator</NavLink>
          <NavLink to="/serial-generator" className={navClass}>Serial Generator</NavLink>
          <NavLink to="/label-sheet-generator" className={navClass}>Label Sheets</NavLink>
          <NavLink to="/qr-contrast-checker" className={navClass}>Contrast Checker</NavLink>
          <NavLink to="/blog" className={navClass}>Blog</NavLink>
          <NavLink to="/use-cases" className={navClass}>Use Cases</NavLink>
          <NavLink to="/glossary" className={navClass}>Glossary</NavLink>
          <NavLink to="/about" className={navClass}>About</NavLink>
          <NavLink to="/contact" className={navClass}>Contact</NavLink>
          <button className="icon-btn" onClick={onSearch} aria-label="Search the site">
            🔍 Search <kbd>Ctrl K</kbd>
          </button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
