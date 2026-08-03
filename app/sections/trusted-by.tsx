"use client";

import { useEffect, useRef, useState } from "react";

const firms = [
  { name: "Arup", width: "w-20" },
  { name: "WSP", width: "w-16" },
  { name: "AECOM", width: "w-20" },
  { name: "Mott MacDonald", width: "w-28" },
  { name: "Jacobs", width: "w-16" },
  { name: "Buro Happold", width: "w-28" },
  { name: "Ramboll", width: "w-20" },
  { name: "Arcadis", width: "w-18" },
];

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative border-t border-[rgba(255,255,255,0.04)] bg-[#09090B] py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <p
          className={`text-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#52525B] transition-all duration-1000 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Trusted by leading engineering firms
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {firms.map((firm, i) => (
            <span
              key={firm.name}
              className={`text-[15px] font-light tracking-wide text-[#3F3F46] transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
              style={{
                transitionDelay: `${i * 80}ms`,
                fontFamily: "var(--font-body)",
              }}
            >
              {firm.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
