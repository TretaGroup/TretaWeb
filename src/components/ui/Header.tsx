"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/public/data/siteContent";
import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";
import MegaMenuPortal from "./MegaMenuPortal";
import { useHoverIntent } from "./useHoverIntent";
import { Search, Menu } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<any>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setActiveMega(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* HEADER (BLUR STAYS) */}
      <motion.header
        className="fixed top-0 z-50 w-full"
        style={{
          backgroundColor: scrolled ? "var(--glass-bg)" : "transparent",
          borderBottom: scrolled ? "1px solid var(--glass-border)" : "none",
          backdropFilter: scrolled ? "blur(16px)" : "none",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className={`font-extrabold text-xl ${scrolled? "text-[var(--nav-text)]" : "text-[rgb(244 244 245)" }`}
          >
            #TRETA
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-10">
            {siteContent.navigation.map((nav: any) => {
              const ref = useRef<HTMLButtonElement>(null);
              const hover = useHoverIntent(
                () => {
                  setActiveMega(nav);
                  setAnchorRect(
                    ref.current?.getBoundingClientRect() || null
                  );
                },
                () => setActiveMega(null)
              );

              return nav.type === "mega" ? (
                <button
                  key={nav.label}
                  ref={ref}
                  {...hover}
                  className={`relative font-medium ${scrolled? "text-[var(--nav-text)]" : "text-[rgb(244 244 245)" }  group`}
                >
                  {nav.label}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition origin-left" />
                </button>
              ) : (
                <Link
                  key={nav.label}
                  href={nav.href}
                  className={`relative font-medium ${scrolled? "text-[var(--nav-text)]" : "text-[rgb(244 244 245)" }  group`}
                >
                  {nav.label}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition origin-left" />
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <ThemeToggle />
            <button className="md:hidden">
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MEGA MENU PORTAL (ISOLATED) */}
      <AnimatePresence>
        {activeMega && (
          <MegaMenuPortal
            data={activeMega}
            anchorRect={anchorRect}
            onClose={() => setActiveMega(null)}
          />
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
