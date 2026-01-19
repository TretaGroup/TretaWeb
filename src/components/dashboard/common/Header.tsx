

import Link from "next/link";
import { useState } from "react";
import ThemeSwitcher from "../../common/ThemeSwitcher";

const menuItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Users", href: "/dashboard/users" },
  { name: "Content", href: "/dashboard/content" },
];

const DashboardHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="w-full shadow-sm backdrop-blur-xl"
      style={{
        background: "var(--header-background)",
        color: "#222",
        boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl text-primary">
          <span className="text-2xl font-black text-primary" style={{ letterSpacing: "2px" }}>#treta</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8 items-center">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium transition-colors text-foreground"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.08)" }}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Home Button */}
          <Link
            href="/"
            className="hidden sm:inline-block px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition-transform"
            style={{ background: "var(--primary)", color: "#fff" }}
          >
            Home
          </Link>
          {/* Theme Switcher */}
          <div className="text-foreground">

          <ThemeSwitcher />
          </div>
          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 p-2 rounded-lg text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {open && (
        <nav
          className="md:hidden border-t px-4 py-2 flex flex-col gap-2 animate-in fade-in slide-in-from-top duration-300 backdrop-blur-xl"
          style={{
            background: "var(--header-background)",
            borderRadius: "0 0 1.5rem 1.5rem",
            boxShadow: "0 4px 24px 0 rgba(0,0,0,0.08)",
          }}
        >
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="font-medium py-2 px-2 rounded transition-colors text-foreground"
              style={{ textShadow: "0 1px 8px rgba(0,0,0,0.08)" }}
              onClick={() => setOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/"
            className="px-4 py-2 rounded-lg font-semibold shadow mt-2"
            style={{ background: "var(--primary)", color: "#fff" }}
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
        </nav>
      )}
    </header>
  );
};

export default DashboardHeader;
