"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  data: any;
  anchorRect: DOMRect | null;
  onClose: () => void;
};

export default function MegaMenuPortal({
  data,
  anchorRect,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(0);
  const closeTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  if (!mounted || !anchorRect) return null;

  const items = data.sections.flatMap((s: any) => s.items);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(onClose, 140);
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      tabIndex={-1}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowDown")
          setActive((i) => Math.min(i + 1, items.length - 1));
        if (e.key === "ArrowUp")
          setActive((i) => Math.max(i - 1, 0));
      }}
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
      onMouseMove={(e) =>
        setCursor({ x: e.clientX, y: e.clientY })
      }
      style={{
        position: "fixed",
        top: anchorRect.bottom + 16,
        left: anchorRect.left - anchorRect.width * 5,
        transform: "translate3d(-50%, 0, 0)",
        paddingTop: 24, // invisible hover bridge
      }}
      className="
        z-[1000]
        w-180
        rounded-3xl bg-[rgba(0,0,0,0.65)]
        backdrop-blur-2xl
        isolate
        border border-[var(--glass-border)]
        shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]
        p-10
        outline-none
      "
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{
          background: `radial-gradient(
            420px at ${cursor.x}px ${cursor.y}px,
            rgba(99,102,241,0.18),
            transparent 70%
          )`,
        }}
      />

      <div className="relative grid grid-cols-2 gap-8">
        {data.sections.map((section: any) => (
          <div key={section.title}>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
              {section.title}
            </h4>

            {section.items.map((item: any) => {
              const index = items.indexOf(item);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`block rounded-xl p-3 transition ${
                    index === active
                      ? "bg-indigo-500/20"
                      : "hover:bg-indigo-500/10"
                  }`}
                >
                  <p className="font-medium text-[var(--nav-text)]">
                    {item.label}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-500">
                      {item.description}
                    </p>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </motion.div>,
    document.body
  );
}
