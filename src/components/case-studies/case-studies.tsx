'use client';

import { useEffect, useState, useRef } from 'react';
import Button from '../common/Button';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  ChevronDown,
  ChevronUp,
  Search,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudy {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
  date: string;
}

export default function CaseStudies() {
  const router = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();
  const PAGE_SIZE = 6;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CaseStudy[]>([]);

  /* ------------------- FILTER STATE ------------------- */

  const [sort, setSort] = useState<'asc' | 'desc' | 'newest' | 'oldest'>(
    (query.get('sort') as any) ?? 'asc'
  );

  const [selectedTags, setSelectedTags] = useState<string[]>(
    query.get('tags')?.split(',').filter(Boolean) ?? []
  );

  const [search, setSearch] = useState(query.get('q') ?? '');
  const [page, setPage] = useState<number>(Number(query.get('page')) || 1);

  /* ------------------- HYDRATION GUARD ------------------- */
  const hasHydrated = useRef(false);

  /* ------------------- LOCALSTORAGE HYDRATION ------------------- */
  useEffect(() => {
    const storedTags = localStorage.getItem('selectedTags');
    const storedSearch = localStorage.getItem('search');
    const storedPage = localStorage.getItem('page');

    if (storedTags) setSelectedTags(JSON.parse(storedTags).filter(Boolean));
    if (storedSearch) setSearch(storedSearch);
    if (storedPage) setPage(Number(storedPage));

    hasHydrated.current = true;
  }, []);

  /* Persist to localStorage */
  useEffect(() => {
    localStorage.setItem('selectedTags', JSON.stringify(selectedTags));
    localStorage.setItem('search', search);
    localStorage.setItem('page', page.toString());
  }, [selectedTags, search, page]);

  /* ------------------- CLEAN URL SYNC (THE ONLY ONE) ------------------- */
  useEffect(() => {
    if (!hasHydrated.current) return;

    const params = new URLSearchParams();

    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    }

    if (search.trim()) {
      params.set('q', search.trim());
    }

    if (sort !== 'asc') {
      params.set('sort', sort);
    }

    if (page > 1) {
      params.set('page', page.toString());
    }

    const qs = params.toString();
    const nextUrl = qs ? `${pathname}?${qs}` : pathname;

    router.replace(nextUrl, { scroll: false });
  }, [selectedTags, search, sort, page, pathname]);

  /* ------------------- FETCH ------------------- */
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState('');

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch('/api/case-studies');
      const body = await res.json();
      setData(body.caseStudies);
      setTimeout(() => setLoading(false), 400);
    }
    load();
  }, []);

  /* ------------------- FILTERING ------------------- */
  const allTags = Array.from(new Set(data.flatMap((c) => c.tags)));
  let filtered = [...data];

  if (search.trim()) {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  if (selectedTags.length > 0) {
    filtered = filtered.filter((c) =>
      c.tags.some((t) => selectedTags.includes(t))
    );
  }

  filtered.sort((a, b) => {
    switch (sort) {
      case 'desc':
        return b.title.localeCompare(a.title);
      case 'newest':
        return Date.parse(b.date) - Date.parse(a.date);
      case 'oldest':
        return Date.parse(a.date) - Date.parse(b.date);
      default:
        return a.title.localeCompare(b.title);
    }
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const showing = Math.min(page * PAGE_SIZE, filtered.length);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const toggleTag = (tag: string) =>
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );

  const removePill = (tag: string) =>
    setSelectedTags((p) => p.filter((t) => t !== tag));

  /* ---------------- CLOSE DROPDOWN ---------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    };
    if (openDropdown) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openDropdown]);

  /* ---------------- SMART PAGINATION ---------------- */
  const pages: (number | string)[] = [];
  const windowStart = Math.max(2, page - 1);
  const windowEnd = Math.min(totalPages - 1, page + 1);

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (windowStart > 2) pages.push('leftDot');
    for (let i = windowStart; i <= windowEnd; i++) pages.push(i);
    if (windowEnd < totalPages - 1) pages.push('rightDot');
    pages.push(totalPages);
  }

  const jumpLeft = () => setPage((p) => Math.max(1, p - 2));
  const jumpRight = () => setPage((p) => Math.min(totalPages, p + 2));

  /* ---------------- RENDER (UI UNCHANGED) ---------------- */
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">

      <div className="max-w-7xl mx-auto space-y-10">

        <h2 className="text-4xl font-bold">
          How We Helped Clients Grow <span className="italic font-serif">Smarter</span>
        </h2>

        {/* FILTER BAR */}
        <div className="sticky top-0 z-30 bg-background/90 backdrop-blur-lg py-4 border-b  space-y-4">

          <div className="flex flex-wrap items-center gap-4">

            {/* Search */}
            <div className="relative flex items-center gap-2 px-3 py-2 border rounded-md w-full sm:max-w-xs">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                className="bg-transparent w-full text-sm outline-none"
                placeholder="Search..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              />
              {search && (
                <X className="w-4 h-4 cursor-pointer hover:text-red-500"
                  onClick={() => { setSearch(''); setPage(1); }} />
              )}
            </div>

            {/* TAG DROPDOWN */}
            <div ref={dropdownRef} className="relative w-60">
              <button
                onClick={() => setOpenDropdown(!openDropdown)}
                className="flex justify-between items-center w-full px-4 py-2 border rounded-md cursor-pointer hover:bg-secondary/40"
              >
                <span className="truncate text-sm">
                  {selectedTags.length ? selectedTags.join(', ') : 'Select tags'}
                </span>
                {openDropdown ? <ChevronUp /> : <ChevronDown />}
              </button>

              {openDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute mt-1 w-full bg-background border rounded-md shadow-lg z-50 max-h-80 overflow-auto"
                >
                  <div className="flex items-center gap-2 px-3 py-2 border-b sticky top-0 bg-background">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <input
                      className="w-full bg-transparent text-sm outline-none"
                      placeholder="Search tags..."
                      value={dropdownSearch}
                      onChange={(e) => setDropdownSearch(e.target.value)}
                    />
                    {selectedTags.length > 0 && (
                      <X className="w-4 h-4 text-red-500 cursor-pointer"
                        onClick={() => setSelectedTags([])} />
                    )}
                  </div>

                  {allTags
                    .filter((t) =>
                      t.toLowerCase().includes(dropdownSearch.toLowerCase())
                    )
                    .map((t) => {
                      const active = selectedTags.includes(t);
                      return (
                        <label
                          key={t}
                          className="flex items-center justify-between px-4 py-2 text-sm border-b last:border-0 cursor-pointer hover:bg-secondary/40"
                        >
                          <div className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              checked={active}
                              onChange={() => { toggleTag(t); setPage(1); }}
                              className="cursor-pointer accent-primary"
                            />
                            {t}
                          </div>
                          {active && <Check className="w-4 h-4 text-primary" />}
                        </label>
                      );
                    })}
                </motion.div>
              )}
            </div>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value as any); setPage(1); }}
              className="px-4 py-2 border rounded-md bg-background text-sm cursor-pointer hover:bg-secondary/40"
            >
              <option value="asc">A → Z</option>
              <option value="desc">Z → A</option>
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>

            <span className="ml-auto text-sm">{showing} of {filtered.length}</span>
          </div>

          {/* TAG PILLS */}
          <AnimatePresence>
            {selectedTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2"
              >
                {selectedTags.map((t) => (
                  <motion.span
                    key={t}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs cursor-pointer"
                    onClick={() => removePill(t)}
                  >
                    {t}
                    <X className="w-3 h-3" />
                  </motion.span>
                ))}
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-xs text-red-500 cursor-pointer hover:underline"
                >
                  Clear all
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* LOADING */}
        {loading && <div className="text-center py-20 animate-pulse">Loading…</div>}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className='relative flex items-center justify-center flex-col'>
            <Image src={"/images/NoCaseStudies.svg"} alt='No Case Studies Found' className='relative! max-w-100' fill />
            <p className="text-center text-3xl font-bold py-10 text-muted-foreground">
              No case studies found.
            </p>
          </div>
        )}

        {/* GRID */}
        {!loading && filtered.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((study, i) => (
                <motion.div
                  key={study.title}
                  className="relative rounded-xl overflow-hidden bg-card shadow hover:shadow-lg cursor-pointer min-h-125 group"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Image src={study.image} fill alt={study.title} className="absolute inset-0 object-cover" />
                  <div className="absolute inset-0 bg-black/30 hover:bg-black/40 transition" />
                  <div className="absolute bottom-0 left-0 right-0 m-4 p-4 bg-background/50 backdrop-blur-md rounded-xl">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {study.tags.map((t) => (
                        <span key={t} className="bg-primary text-background px-2 py-0.5 text-[10px] rounded-full uppercase tracking-wide">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-white">{study.title}</h3>
                    <p className="text-sm line-clamp-3 inline-flex md:hidden group-hover:inline-flex text-white">{study.description}</p>
                    <Button href={study.link} className="mt-3 inline-flex md:hidden group-hover:inline-flex" icon="arrow-up-right" variant="primary">
                      View Case Study
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <motion.div
                className="flex justify-center items-center gap-2 mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {/* Prev */}
                <motion.button
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="
        p-2 rounded-full border
        bg-primary text-primary-foreground
        hover:bg-primary/90 cursor-pointer
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors
      "
                >
                  <ChevronLeft />
                </motion.button>

                {/* Pages */}
                {pages.map((p, idx) => {
                  if (p === 'leftDot')
                    return (
                      <span
                        key={`leftDot-${idx}-${page}`}
                        className="px-2 cursor-pointer text-sm text-muted-foreground hover:text-primary transition"
                        onClick={jumpLeft}
                      >
                        …
                      </span>
                    );

                  if (p === 'rightDot')
                    return (
                      <span
                        key={`rightDot-${idx}-${page}`}
                        className="px-2 cursor-pointer text-sm text-muted-foreground hover:text-primary transition"
                        onClick={jumpRight}
                      >
                        …
                      </span>
                    );

                  const active = p === page;

                  return (
                    <motion.button
                      key={`page-${p}`}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setPage(p as number)}
                      className={`
            px-3 py-1 rounded-full border text-sm transition-all cursor-pointer
            ${active
                          ? 'bg-primary text-white border-foreground shadow-md'
                          : 'bg-background hover:bg-primary/10 hover:text-primary'
                        }
          `}
                    >
                      {p}
                    </motion.button>
                  );
                })}

                {/* Next */}
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="
        p-2 rounded-full border
        bg-primary text-primary-foreground cursor-pointer
        hover:bg-primary/90
        disabled:opacity-40 disabled:cursor-not-allowed
        transition-colors
      "
                >
                  <ChevronRight />
                </motion.button>
              </motion.div>
            )}

          </>
        )}
      </div>
    </section>
  );
}
