"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "mt-4 mx-auto w-[calc(100%-2rem)] max-w-6xl rounded-full border border-[#E5E7EB]/60 bg-white/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
          : "border-b border-[#F3F4F6] bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        <a
          href="#top"
          className="text-[18px] font-normal text-[#111827]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Datum
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            { label: "Platform", href: "#product" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Solutions", href: "#features" },
            { label: "Pricing", href: "#pricing" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-light text-[#6B7280] transition-colors duration-300 hover:text-[#111827]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#"
            className="hidden text-[13px] font-light text-[#6B7280] transition-colors duration-300 hover:text-[#111827] sm:block"
          >
            Sign In
          </a>
          <a
            href="#"
            className="rounded-full bg-[#111827] px-5 py-2 text-[13px] font-medium text-white transition-all duration-500 hover:bg-[#1F2937] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)] active:scale-[0.98]"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  );
}
