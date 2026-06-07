"use client";

import { useState, useEffect } from "react";

function generateActivityData() {
  const cells: number[] = [];
  for (let i = 0; i < 364; i++) {
    const r = Math.random();
    if (r < 0.44) cells.push(0);
    else if (r < 0.64) cells.push(1);
    else if (r < 0.82) cells.push(2);
    else if (r < 0.94) cells.push(3);
    else cells.push(4);
  }
  return cells;
}

function getCellClass(level: number) {
  if (level === 0) return "";
  if (level === 1) return "l1";
  if (level === 2) return "l2";
  if (level === 3) return "l3";
  return "l4";
}

export function ActivityGraph() {
  const [data, setData] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setData(generateActivityData());
    setMounted(true);
  }, []);

  const months = ["Jun","Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];

  return (
    <section className="space-y-2">
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <span>{months[0]}</span>
        <span className="text-zinc-700">—</span>
        <span>{months[months.length - 1]}</span>
        <span className="text-zinc-700">·</span>
        <span suppressHydrationWarning>{mounted ? `${data.filter((d) => d > 0).length} activities in 2026` : "— activities in 2026"}</span>
      </div>
      <div className="overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex">
          <div className="activity-grid">
            {mounted ? (
              data.map((level, i) => (
                <div key={i} className={`activity-cell ${getCellClass(level)}`} />
              ))
            ) : (
              Array.from({ length: 364 }).map((_, i) => (
                <div key={i} className="activity-cell" />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-600">
        <span>Less</span>
        <div className="activity-cell" />
        <div className="activity-cell l1" />
        <div className="activity-cell l2" />
        <div className="activity-cell l3" />
        <div className="activity-cell l4" />
        <span>More</span>
      </div>
    </section>
  );
}
