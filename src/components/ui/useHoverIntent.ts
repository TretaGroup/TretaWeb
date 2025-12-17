import { useRef } from "react";

export function useHoverIntent(
  onOpen: () => void,
  onClose: () => void,
  delay = 120
) {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return {
    onMouseEnter() {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(onOpen, delay);
    },
    onMouseLeave() {
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(onClose, delay);
    },
  };
}
