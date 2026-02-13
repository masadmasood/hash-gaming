import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 left-6 z-50 h-10 w-10 rounded-full border border-border bg-card hover:bg-surface flex items-center justify-center transition-all shadow-sm"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-4 w-4 text-foreground" />
    </button>
  );
}
