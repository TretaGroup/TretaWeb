"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { searchIndex } from "@/src/lib/searchIndex";

/* ---------------- HIGHLIGHT ---------------- */

function highlight(text: string, query: string) {
  if (!query) return text;

  return text.split(new RegExp(`(${query})`, "gi")).map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark
        key={i}
        className="rounded bg-indigo-500/20 px-1 text-indigo-600 dark:text-indigo-400"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

/* ---------------- FUZZY + SIMILAR ---------------- */

function fuzzyMatch(query: string, text: string) {
  let qi = 0;
  for (const char of text) {
    if (char === query[qi]) qi++;
    if (qi === query.length) return true;
  }
  return false;
}

function similarity(a: string, b: string) {
  let matches = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] === b[i]) matches++;
  }
  return matches / Math.max(a.length, b.length);
}

/* ---------------- COMPONENT ---------------- */

export default function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  /* Load recent searches */
  useEffect(() => {
    const stored = localStorage.getItem("recent-searches");
    if (stored) setRecent(JSON.parse(stored));
  }, []);

  /* Results (search mode) */
  const results = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();

    return searchIndex
      .map((item) => {
        const title = item.title.toLowerCase();
        let score = 0;

        if (title.includes(q)) score += 3;
        if (fuzzyMatch(q, title)) score += 2;
        score += similarity(q, title);

        return { ...item, score };
      })
      .filter((r) => r.score > 1)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  /* Initial options (no query) */
  const initialOptions = useMemo(() => {
    if (recent.length > 0) {
      return searchIndex
        .filter((i) => recent.includes(i.title))
        .slice(0, 5);
    }
    return searchIndex.slice(0, 5);
  }, [recent]);

  /* Suggestions (no strong match) */
  const suggestions = useMemo(() => {
    if (!query || results.length > 0) return [];
    return searchIndex
      .filter(
        (i) =>
          similarity(query.toLowerCase(), i.title.toLowerCase()) > 0.4
      )
      .map((i) => i.title);
  }, [query, results]);

  /* Keyboard navigation */
  useEffect(() => {
    const list = query ? results : initialOptions;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown")
        setActive((i) => Math.min(i + 1, list.length - 1));
      if (e.key === "ArrowUp")
        setActive((i) => Math.max(i - 1, 0));
      if (e.key === "Enter" && list[active]) {
        saveRecent(list[active].title);
        window.location.href = list[active].href;
      }
      if (e.key === "Escape") {
        setQuery("");
        onClose();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, results, initialOptions, query, onClose]);

  /* Save recent */
  function saveRecent(value: string) {
    const next = [value, ...recent.filter((r) => r !== value)].slice(0, 5);
    setRecent(next);
    localStorage.setItem("recent-searches", JSON.stringify(next));
    setQuery("");
    onClose();
  }

  const list = query ? results : initialOptions;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 bg-[rgba(0,0,0,0.45)] backdrop-blur-xl px-6"
        >
          {/* Close */}
          <button
            onClick={() => {
              setQuery("");
              onClose();
            }}
            className="absolute right-6 top-6 rounded-lg p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition cursor-pointer"
          >
            <X size={28} />
          </button>

          {/* Panel */}
          <div className="mx-auto mt-32 w-full max-w-2xl">
            {/* Input */}
            <div className="flex items-center gap-4 border-b border-white/15 pb-4">
              <Search className="opacity-60" />
              <input
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                placeholder="Search or type a command…"
                className="w-full bg-transparent text-2xl outline-none placeholder:text-gray-400"
              />
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="mt-4 text-sm text-gray-400">
                Did you mean:{" "}
                <span className="text-indigo-400">
                  {suggestions.join(", ")}
                </span>
              </div>
            )}

            {/* Results / Initial options */}
            <div className="mt-6 space-y-2">
              {list.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => saveRecent(item.title)}
                  className={`block rounded-xl p-4 transition ${
                    i === active
                      ? "bg-indigo-500/20"
                      : "hover:bg-indigo-500/10"
                  }`}
                >
                  <p className="font-medium">
                    {highlight(item.title, query)}
                  </p>
                  {item.href && (
                    <p className="text-sm text-gray-500">
                      {highlight(item.href, query)}
                    </p>
                  )}
                </Link>
              ))}
            </div>

            <p className="mt-8 text-xs text-gray-400">
              ↑ ↓ navigate • Enter select • Esc close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
