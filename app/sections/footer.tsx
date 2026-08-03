const columns = [
  {
    title: "Product",
    links: ["Features", "Architecture", "Workflow", "Integrations", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Blog", "Press"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Help Center", "Community"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Security", "DPA"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-6">
          <div className="col-span-2">
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
            <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-[#64748B]">
              The AI platform for structural engineering teams who build the
              world&apos;s infrastructure.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                {column.title}
              </h3>
              <ul className="mt-4 flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-[14px] text-[#64748B] transition-colors hover:text-[#0F172A]"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#E2E8F0] pt-8 sm:flex-row">
          <p className="text-[13px] text-[#94A3B8]">
            © {new Date().getFullYear()} Datum. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#top" className="text-[13px] text-[#64748B] transition-colors hover:text-[#0F172A]">
              X / Twitter
            </a>
            <a href="#top" className="text-[13px] text-[#64748B] transition-colors hover:text-[#0F172A]">
              LinkedIn
            </a>
            <a href="#top" className="text-[13px] text-[#64748B] transition-colors hover:text-[#0F172A]">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
