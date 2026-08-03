const stats = [
  { value: "12,000+", label: "models processed weekly" },
  { value: "140+", label: "countries served" },
  { value: "$18.4B", label: "in bids supported" },
  { value: "99.98%", label: "uptime" },
  { value: "30×", label: "faster takeoffs" },
];

export default function StatsBar() {
  return (
    <section
      aria-label="Datum by the numbers"
      className="border-b border-[#E2E8F0] bg-white"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-8 px-6 py-12 sm:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-serif text-[34px] font-medium leading-none tracking-tight text-[#0F172A] tabular-nums">
              {stat.value}
            </p>
            <p className="mt-2 text-[13px] text-[#64748B]">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
