"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteContent } from "@/public/data/siteContent";
import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";
import MegaMenuPortal from "./MegaMenuPortal";
import { useHoverIntent } from "./useHoverIntent";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { caldina } from "@/src/app/fonts";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<any>(null);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false); // ✅ REQUIRED

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
      if (e.key === "Escape") {
        setActiveMega(null);
        setMobileOpen(false);
      }
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
           className="
            font-extrabold text-3xl
            bg-[linear-gradient(90deg,#FD3516_0%,#F96229_33%,#F9812B_66%,#FEB125_100%)]
            bg-clip-text  
            text-transparent
          "

            style={caldina.style}
          >
            #TRETA
          </Link>


          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-10">
            {siteContent.navigation.map((nav: any) => {
              const ref = useRef<HTMLButtonElement>(null);
              const hover = useHoverIntent(
                () => {
                  requestAnimationFrame(() => {
                    const rect = ref.current?.getBoundingClientRect();
                    if (!rect) return;
                    setAnchorRect(rect);
                    setActiveMega(nav);
                  });
                },
                () => setActiveMega(null)
              );

              return nav.type === "mega" ? (
                <button
                  key={nav.label}
                  ref={ref}
                  {...hover}
                  className="relative font-medium text-[var(--nav-text)] group"
                >
                  {nav.label}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-full bg-gradient-to-r from-indigo-500 to-pink-500 scale-x-0 group-hover:scale-x-100 transition origin-left" />
                </button>
              ) : (
                <Link
                  key={nav.label}
                  href={nav.href}
                  className="relative font-medium text-[var(--nav-text)] group"
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
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden"
            >
              <Menu />
            </button>
          </div>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[998] bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* BOTTOM SHEET */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.y > 120 || info.velocity.y > 800) {
                  setMobileOpen(false);
                }
              }}
              className="
          fixed bottom-0 left-0 right-0 z-[999]
          max-h-[85vh]
          rounded-t-3xl
          bg-[var(--glass-bg)]
          backdrop-blur-2xl
          border-t border-[var(--glass-border)]
          shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.5)]
          p-6
          overscroll-contain
          md:hidden
        "
            >
              {/* DRAG HANDLE */}
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-gray-400/40" />

              {/* HEADER */}
              <div className="mb-6 flex items-center justify-between">
               <span
           className="
            font-extrabold text-3xl
            bg-[linear-gradient(90deg,#FD3516_0%,#F96229_33%,#F9812B_66%,#FEB125_100%)]
            bg-clip-text  
            text-transparent
          "

            style={caldina.style}
          >
            #TRETA
          </span>
                <button onClick={() => setMobileOpen(false)}>
                  <X />
                </button>
              </div>

              {/* NAV */}
              <nav className="space-y-6 overflow-y-auto pb-6">
                {siteContent.navigation.map((nav: any) =>
                  nav.type === "mega" ? (
                    <details key={nav.label} className="group">
                      <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold">
                        {nav.label}
                        <ChevronDown className="transition group-open:rotate-180" />
                      </summary>

                      <div className="mt-4 space-y-4 pl-4">
                        {nav.sections.flatMap((s: any) =>
                          s.items.map((i: any) => (
                            <Link
                              key={i.label}
                              href={i.href}
                              onClick={() => setMobileOpen(false)}
                              className="block"
                            >
                              <p className="font-medium">{i.label}</p>
                              {i.description && (
                                <p className="text-sm text-gray-400">
                                  {i.description}
                                </p>
                              )}
                            </Link>
                          ))
                        )}
                      </div>
                    </details>
                  ) : (
                    <Link
                      key={nav.label}
                      href={nav.href}
                      onClick={() => setMobileOpen(false)}
                      className="block text-lg font-semibold"
                    >
                      {nav.label}
                    </Link>
                  )
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>


      {/* MEGA MENU PORTAL */}
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
