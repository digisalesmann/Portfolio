import { useState, useEffect, useRef } from "react";

const DURATION = 11000; // ms

const WORDS = [
  { text: "BUILDER", tracking: "0.62em", start: 0, fadeIn: 400, hold: 3000, fadeOut: 400 },
  { text: "CREATOR", tracking: "0.62em", start: 3400, fadeIn: 400, hold: 3000, fadeOut: 400 },
  { text: "VISIONARY", tracking: "0.5em", start: 6800, fadeIn: 400, hold: 3000, fadeOut: 400 },
];
const CARD_START = 10200;
const CARD_FADE_IN = 600;

const lerp = (a, b, t) => a + (b - a) * t;

function segmentOpacity(elapsed, { start, fadeIn, hold, fadeOut }) {
  const fadeInEnd = start + fadeIn;
  const holdEnd = fadeInEnd + hold;
  const fadeOutEnd = holdEnd + fadeOut;
  if (elapsed < start) return 0;
  if (elapsed < fadeInEnd) return (elapsed - start) / fadeIn;
  if (elapsed < holdEnd) return 1;
  if (elapsed < fadeOutEnd) return 1 - (elapsed - holdEnd) / fadeOut;
  return 0;
}

function cardOpacity(elapsed) {
  if (elapsed < CARD_START) return 0;
  if (elapsed < CARD_START + CARD_FADE_IN) return (elapsed - CARD_START) / CARD_FADE_IN;
  return 1;
}

function useAutoTimeline(duration) {
  const [elapsed, setElapsed] = useState(0);
  const rafRef = useRef(null);
  const lastTsRef = useRef(null);

  useEffect(() => {
    const tick = (ts) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const delta = ts - lastTsRef.current;
      lastTsRef.current = ts;
      setElapsed((prev) => Math.min(prev + delta, duration));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [duration]);

  return elapsed;
}

export default function PortraitRevealHero() {
  const elapsed = useAutoTimeline(DURATION);
  const progress = elapsed / DURATION;

  // Ken Burns zoom: ease-out cubic, more zoomed-in at start, settles wider by the end.
  const scale = lerp(1.85, 2.6, Math.pow(1 - progress, 3));
  const contrast = lerp(0.98, 1.08, progress);
  const brightness = lerp(0.85, 0.96, progress);
  const vignetteInner = lerp(13, 45, progress);
  const vignetteOuter = lerp(30, 77, progress);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: "9 / 16", height: "min(78vh, 760px)" }}
    >
      {/* Portrait image, Ken Burns + grayscale filter */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url(/images/portrait-hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "50% 26%",
          transform: `scale(${scale})`,
          transformOrigin: "50% 33%",
          filter: `grayscale(1) contrast(${contrast}) brightness(${brightness})`,
        }}
      />

      {/* Expanding vignette — fades portrait into the page's black */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(120% 90% at 50% 33%, rgba(0,0,0,0) ${vignetteInner}%, rgba(0,0,0,1) ${vignetteOuter}%)`,
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.07,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom legibility gradient */}
      <div
        className="absolute left-0 right-0 bottom-0 pointer-events-none"
        style={{ height: "34%", background: "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0))" }}
      />

      {/* Beat words */}
      {WORDS.map((w) => {
        const o = segmentOpacity(elapsed, w);
        return (
          <div
            key={w.text}
            className="absolute left-0 right-0 text-center pointer-events-none"
            style={{ top: "76%", opacity: o, transform: `translateY(${(1 - o) * 10}px)` }}
          >
            <span
              className="font-sans font-medium uppercase"
              style={{
                letterSpacing: w.tracking,
                fontSize: "clamp(16px, 3.2vw, 22px)",
                color: "#f4f4f2",
                textShadow: "0 2px 30px rgba(0,0,0,0.6)",
              }}
            >
              {w.text}
            </span>
          </div>
        );
      })}

      {/* Final title card */}
      {(() => {
        const o = cardOpacity(elapsed);
        return (
          <div
            className="absolute left-0 right-0 text-center pointer-events-none"
            style={{ top: "78%", opacity: o, transform: `translateY(${(1 - o) * 8}px)` }}
          >
            <div className="w-14 h-px bg-white/55 mx-auto mb-5" />
            <div
              className="font-serif italic"
              style={{ fontSize: "clamp(22px, 4vw, 28px)", color: "#f4f4f2", letterSpacing: "0.01em", textShadow: "0 2px 30px rgba(0,0,0,0.6)" }}
            >
              Creative Technologist
            </div>
            <div
              className="font-sans font-medium uppercase mt-4"
              style={{ fontSize: "10px", letterSpacing: "0.42em", color: "rgba(244,244,242,0.62)" }}
            >
              Portfolio
            </div>
          </div>
        );
      })()}
    </div>
  );
}
