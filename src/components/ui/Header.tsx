"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/public/data/siteContent";
import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";
import MegaMenuPortal from "./MegaMenuPortal";
import { useHoverIntent } from "./useHoverIntent";
import {
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { caldina } from "@/src/app/fonts";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<any>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  /* 🔥 MOBILE SLIDER STATE */
  const [[slide, direction], setSlide] = useState<[number, number]>([0, 0]);
  const slides = siteContent.navigation;

  const paginate = (dir: number) => {
    setSlide(([i]) => [
      (i + dir + slides.length) % slides.length,
      dir,
    ]);
  };

  /* SCROLL */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* KEYS */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setActiveMega(null);
        setMobileOpen(false);
      }
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      {/* HEADER */}
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
            className="font-extrabold text-3xl bg-[linear-gradient(90deg,#FD3516,#FEB125)] bg-clip-text text-transparent"
            style={caldina.style}
          >
            #TRETA
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-10">
            {slides.map((nav: any) => {
              const ref = useRef<HTMLButtonElement>(null);
              const hover = useHoverIntent(
                () => {
                  const rect = ref.current?.getBoundingClientRect();
                  if (!rect) return;
                  setAnchorRect(rect);
                  setActiveMega(nav);
                },
                () => {
                  // ❌ intentionally empty
                }
              );


              return nav.type === "mega" ? (
                <button
                  key={nav.label}
                  ref={ref}
                  {...hover}
                  className="relative font-medium cursor-pointer text-[var(--nav-text)]"
                >
                  {nav.label}
                </button>
              ) : (
                <Link className="text-[var(--nav-text)]" key={nav.label} href={nav.href}>
                  {nav.label}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-3">
            <button className="text-[var(--nav-text)] cursor-pointer" onClick={() => setSearchOpen(true)}>
              <Search size={18} />
            </button>
            <ThemeToggle />
            <button className="text-[var(--nav-text)] cursor-pointer md:hidden" onClick={() => setMobileOpen(true)} >
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              className="fixed bottom-0 left-0 right-0 z-50 rounded-t-3xl bg-[var(--glass-bg)] backdrop-blur-2xl p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold" style={caldina.style}>
                  #TRETA
                </span>
                <button className="cursor-pointer" onClick={() => setMobileOpen(false)}>
                  <X />
                </button>
              </div>

              {/* SLIDER */}
              <div className="relative overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={slide}
                    custom={direction}
                    initial={{ x: direction > 0 ? 200 : -200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction > 0 ? -200 : 200, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <nav className="space-y-4">
                      <h3 className="text-lg font-semibold">
                        {slides[slide].label}
                      </h3>

                      {slides[slide].type === "mega"
                        ? slides[slide].sections.flatMap((s: any) =>
                          s.items.map((i: any) => (
                            <Link
                              key={i.label}
                              href={i.href}
                              onClick={() => setMobileOpen(false)}
                              className="block text-[var(--nav-text)]"
                            >
                              {i.label}
                            </Link>
                          ))
                        )
                        : (
                          <Link
                            href={slides[slide].href || "#"}
                            onClick={() => setMobileOpen(false)}
                            className="text-[var(--nav-text)]"
                          >
                            Go to {slides[slide].label}
                          </Link>
                        )}
                    </nav>
                  </motion.div>
                </AnimatePresence>

                {/* ARROWS */}
                <button
                  onClick={() => paginate(-1)}
                  className="absolute left-0 top-1/2 cursor-pointer -translate-y-1/2 text-[var(--nav-text)]"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={() => paginate(1)}
                  className="absolute right-0 top-1/2 cursor-pointer -translate-y-1/2 text-[var(--nav-text)]"
                >
                  <ChevronRight />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MEGA MENU */}
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
