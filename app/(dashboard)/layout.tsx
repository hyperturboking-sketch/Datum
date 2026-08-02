"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <Header collapsed={collapsed} />
      <main
        className={`min-h-screen px-6 pt-[88px] pb-16 transition-[margin] duration-200 lg:px-8 ${
          collapsed ? "lg:ml-14" : "lg:ml-[200px]"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
