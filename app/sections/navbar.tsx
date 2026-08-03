"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Product", href: "#features" },
  { label: "Architecture", href: "#architecture" },
  { label: "Workflow", href: "#workflow" },
  { label: "Integrations", href: "#integrations" },
  { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-[8px] bg-[#0F172A]">
            <svg viewBox="0 0 512 512" fill="none" aria-hidden="true" className="size-4">
              <g fill="#FFFFFF">
                <path d="M118 150C118 132 132 118 150 118L150 118C168 118 182 132 182 150L182 362C182 380 168 394 150 394C132 394 118 380 118 362Z" />
                <path d="M230 120C230 108 240 98 252 98L370 98C387 98 401 112 401 129L401 212C401 224 388 231 378 225L248 151C237 145 230 133 230 120Z" />
                <path d="M230 392C230 404 240 414 252 414L370 414C387 414 401 400 401 383L401 300C401 288 388 281 378 287L248 361C237 367 230 379 230 392Z" />
              </g>
            </svg>
          </span>
          <span className="font-serif text-[22px] font-normal leading-none tracking-tight text-[#0F172A]">
            datum
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[14px] text-[#64748B] transition-colors hover:text-[#0F172A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="/login"
            className="text-[14px] font-medium text-[#0F172A] transition-colors hover:text-[#4F46E5]"
          >
            Log in
          </a>
          <button
            type="button"
            onClick={() => alert("Sign up")}
            className="inline-flex h-9 items-center rounded-[8px] bg-[#0F172A] px-4 text-[14px] font-medium text-white transition-colors hover:bg-[#1E293B]"
          >
            Get Started
          </button>
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="flex size-9 items-center justify-center rounded-[8px] text-[#0F172A] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[#E2E8F0] bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-[8px] px-3 py-2.5 text-[15px] text-[#0F172A] transition-colors hover:bg-[#F8FAFC]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-[8px] px-3 py-2.5 text-[15px] font-medium text-[#0F172A]"
            >
              Log in
            </a>
            <button
              type="button"
              onClick={() => alert("Sign up")}
              className="mt-2 inline-flex h-10 items-center justify-center rounded-[8px] bg-[#0F172A] px-4 text-[15px] font-medium text-white transition-colors hover:bg-[#1E293B]"
            >
              Get Started
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
