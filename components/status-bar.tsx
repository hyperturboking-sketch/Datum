export function StatusBar() {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-[rgba(255,255,255,0.12)] pt-4">
      <p className="text-[12px] text-[#737373]">System operational</p>
      <div className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-[#525866]" />
        <p className="text-[12px] text-[#525252]">v2.4.1-stable</p>
      </div>
    </div>
  );
}
