import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { ICENWordmark } from "./ICENEmblem";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/pillars", label: "Pillars" },
  { to: "/membership", label: "Membership" },
  { to: "/chapters", label: "Chapters" },
  { to: "/governance", label: "Governance" },
  { to: "/programs", label: "Programs" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  return (
    <header
      data-testid="main-navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-icen-navy/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-[76px] flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="shrink-0">
          <ICENWordmark />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              data-testid={`nav-${n.label.toLowerCase()}`}
              className={({ isActive }) =>
                `px-4 py-2 text-[13px] tracking-wide font-medium transition-colors ${
                  isActive ? "text-white" : "text-slate-400 hover:text-white"
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/admin/login" data-testid="nav-admin" className="text-[12px] uppercase tracking-[0.2em] text-slate-500 hover:text-slate-300 transition-colors">Admin</Link>
          <Link to="/apply" data-testid="nav-apply-cta" className="icen-btn-primary text-[12px] uppercase tracking-[0.18em] py-3 px-6">
            Apply
          </Link>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen(!open)}
          data-testid="nav-mobile-toggle"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-icen-navy/98 backdrop-blur-xl border-t border-white/10" data-testid="nav-mobile-panel">
          <div className="px-6 py-6 flex flex-col gap-1">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `py-3 text-base tracking-wide font-medium ${isActive ? "text-white" : "text-slate-400"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/apply" className="icen-btn-primary mt-4 justify-center">Apply for Membership</Link>
            <Link to="/admin/login" className="text-center mt-2 text-[12px] uppercase tracking-[0.2em] text-slate-500">Admin Login</Link>
          </div>
        </div>
      )}
    </header>
  );
}
