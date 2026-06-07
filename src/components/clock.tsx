"use client";

import { useState, useEffect } from "react";

export function Clock() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-xs text-zinc-400 font-medium tabular-nums">
      <span suppressHydrationWarning>{time}</span>
    </div>
  );
}
