import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Splits text into words that sharpen out of a blur one after another the
 * first time the block scrolls into view. Wrap words in *asterisks* to set
 * them in the muted grey.
 */
export function BlurWords({ text, className }: { text: string; className?: string }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{text.replace(/\*/g, "")}</span>
      <span aria-hidden>
        {words.map((w, i) => {
          const accent = w.startsWith("*");
          const word = w.replace(/\*/g, "");
          return (
            <React.Fragment key={i}>
              <span
                className={cn(
                  "blur-word",
                  inView && "is-in",
                  accent && "text-muted-foreground",
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                {word}
              </span>{" "}
            </React.Fragment>
          );
        })}
      </span>
    </p>
  );
}
