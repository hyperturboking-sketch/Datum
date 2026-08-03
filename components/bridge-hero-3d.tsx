"use client";

import { useEffect, useRef } from "react";

interface BridgeHero3DProps {
  images: string[];
}

export default function BridgeHero3D({ images }: BridgeHero3DProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const layerEls = Array.from(
      sectionRef.current?.querySelectorAll<HTMLElement>("[data-layer]") ?? []
    );

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = sectionRef.current?.getBoundingClientRect();
        if (!rect) return;
        const progress = Math.min(
          1,
          Math.max(0, (rect.top + rect.height / 2) / window.innerHeight)
        );
        layerEls.forEach((el, i) => {
          const speed = 20 + i * 14;
          el.style.transform = `translate3d(0, ${(progress - 0.5) * speed}px, 0)`;
        });
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const layers = [
    {
      src: images[0] ?? "",
      className:
        "opacity-[0.18]",
      style: { transform: "scale(1.06)" },
    },
    {
      src: images[1] ?? "",
      className: "opacity-[0.32]",
    },
    {
      src: images[2] ?? "",
      className: "opacity-[0.55]",
    },
    {
      src: images[3] ?? "",
      className: "opacity-[0.8]",
    },
  ];

  return (
    <section
      ref={sectionRef}
      aria-label="Datum hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#FFFFFF]"
    >
      {layers.map((layer, i) => (
        <div
          key={i}
          data-layer
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${layer.className}`}
          style={{
            ...layer.style,
            backgroundImage: layer.src ? `url(${layer.src})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      <div className="relative z-10 mx-auto max-w-4xl px-6 py-32 text-center">
        <p className="mb-6 inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
          <span className="h-px w-8 bg-[#4F46E5]" />
          AEC Intelligence
          <span className="h-px w-8 bg-[#4F46E5]" />
        </p>

        <h1 className="font-serif text-[44px] font-medium leading-[1.05] tracking-[-0.02em] text-[#0F172A] sm:text-[56px] lg:text-[68px]">
          Structural intelligence for the buildings of tomorrow
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-[#64748B] sm:text-[18px]">
          Datum is the AI platform that reads your structural models, calculates
          quantities, checks code compliance, and answers RFIs — all from your
          IFC files.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => alert("Sign up")}
            className="inline-flex h-12 items-center justify-center rounded-[8px] bg-[#0F172A] px-7 text-[15px] font-medium text-white transition-colors hover:bg-[#1E293B]"
          >
            Start Free Trial
          </button>
          <button
            type="button"
            onClick={() => alert("Sign up")}
            className="inline-flex h-12 items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-white px-7 text-[15px] font-medium text-[#0F172A] transition-colors hover:border-[#CBD5E1] hover:shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
          >
            View Live Demo
          </button>
        </div>
      </div>
    </section>
  );
}
