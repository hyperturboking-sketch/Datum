"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(255,255,255,0.04)] bg-[#09090B] py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <span
              className="text-[18px] font-normal text-[#F5F5F5]"
              style={{ fontFamily: "var(--font-brand)" }}
            >
              Datum
            </span>
            <p className="mt-3 text-[13px] leading-relaxed text-[#52525B] font-light">
              The operating system for modern structural engineering.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: [
                "IFC Parser",
                "Quantity Takeoff",
                "Code Compliance",
                "Bid Automation",
                "RFI Generation",
                "API Documentation",
              ],
            },
            {
              title: "Company",
              links: [
                "About",
                "Careers",
                "Blog",
                "Press",
                "Contact",
                "Partners",
              ],
            },
            {
              title: "Resources",
              links: [
                "Documentation",
                "Case Studies",
                "Webinars",
                "Training",
                "Support",
                "Status",
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#52525B]">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[13px] text-[#71717A] font-light transition-colors duration-300 hover:text-[#A1A1AA]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[rgba(255,255,255,0.04)] pt-8 md:flex-row">
          <p className="text-[12px] text-[#3F3F46] font-light">
            © 2026 Datum. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Security"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] text-[#3F3F46] font-light transition-colors duration-300 hover:text-[#71717A]"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
