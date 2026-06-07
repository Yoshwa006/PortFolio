"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FinderIcon, SafariIcon, TerminalIcon, TrashIcon,
  MusicIcon, GameIcon, WifiIcon, BatteryIcon,
} from "@/components/os-icons";
import { Terminal } from "@/components/os-terminal";
import { Finder } from "@/components/os-finder";

type AppId = "finder" | "terminal" | "games" | "music";

export default function OsPage() {
  const [entered, setEntered] = useState(false);
  const [booted, setBooted] = useState(false);
  const [bootProgress, setBootProgress] = useState(0);
  const [openWindows, setOpenWindows] = useState<AppId[]>([]);
  const [windowPositions, setWindowPositions] = useState<Record<string, { x: number; y: number }>>({});

  useEffect(() => {
    if (!entered) return;
    const interval = setInterval(() => {
      setBootProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setBooted(true), 400);
          return 100;
        }
        return p + Math.floor(Math.random() * 15) + 5;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [entered]);

  const openWindow = useCallback((name: AppId) => {
    if (!openWindows.includes(name)) {
      setOpenWindows((w) => [...w, name]);
      setWindowPositions((pos) => ({
        ...pos,
        [name]: { x: 80 + openWindows.length * 30, y: 60 + openWindows.length * 30 },
      }));
    }
  }, [openWindows]);

  const closeWindow = useCallback((name: AppId) => {
    setOpenWindows((w) => w.filter((n) => n !== name));
  }, []);

  const bringToFront = useCallback((name: AppId) => {
    setOpenWindows((w) => {
      const idx = w.indexOf(name);
      if (idx === -1 || idx === w.length - 1) return w;
      const copy = [...w];
      copy.splice(idx, 1);
      copy.push(name);
      return copy;
    });
  }, []);

  if (!entered) {
    return <WorkInProgress onEnter={() => setEntered(true)} />;
  }

  if (!booted) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
        <div className="mb-8">
          <svg viewBox="0 0 24 24" width="64" height="64" fill="white" className="opacity-80">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
          </svg>
        </div>
        <div className="w-64 h-1 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-full"
            style={{ width: `${Math.min(bootProgress, 100)}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>
        <p className="text-zinc-500 text-sm mt-4 tabular-nums">{Math.min(bootProgress, 100)}%</p>
        <p className="text-zinc-600 text-xs mt-2">Loading...</p>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-cover bg-center select-none"
      style={{ backgroundImage: "url(https://images.pexels.com/photos/2085998/pexels-photo-2085998.jpeg)" }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <MenuBar />
      <DesktopIcons onOpen={openWindow} />
      <AnimatePresence>
        {openWindows.map((id) => (
          <AppWindow
            key={id}
            title={id.charAt(0).toUpperCase() + id.slice(1)}
            onClose={() => closeWindow(id)}
            onFocus={() => bringToFront(id)}
            zIndex={openWindows.indexOf(id) + 10}
            defaultPos={windowPositions[id]}
          >
            {id === "games" && <GamesContent />}
            {id === "music" && <MusicContent />}
            {id === "terminal" && <Terminal onFocus={() => bringToFront("terminal")} />}
            {id === "finder" && <Finder onFocus={() => bringToFront("finder")} />}
          </AppWindow>
        ))}
      </AnimatePresence>
      <Dock onOpen={openWindow} />
    </div>
  );
}

function WorkInProgress({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6 text-center px-6"
      >
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <svg viewBox="0 0 24 24" width="48" height="48" fill="none" className="opacity-80">
            <rect x="2" y="2" width="20" height="20" rx="4" stroke="white" strokeWidth="1.5"/>
            <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
        <div>
          <h1 className="text-2xl font-bold"><span className="gradient-text">Developer Corner</span></h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-sm">
            A macOS desktop simulator — explore the file system, run Terminal commands, play games, and more.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 text-xs text-zinc-600">
          <p>Features:</p>
          <ul className="space-y-1">
            {["File browser with real project files", "Terminal with 15+ commands", "Tic-Tac-Toe game", "Music player", "Draggable windows"].map((f) => (
              <li key={f} className="flex items-center gap-1.5">
                <span className="text-green-500">✓</span>
                <span className="text-zinc-400">{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onEnter}
          className="mt-2 px-8 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-medium border border-white/10 transition-colors"
        >
          Enter Developer Corner →
        </motion.button>
      </motion.div>
    </div>
  );
}

function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const d = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
      setTime(`${d} ${h}:${m}`);
    };
    update();
    const id = setInterval(update, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute top-0 left-0 right-0 h-6 bg-white/10 backdrop-blur-2xl border-b border-white/10 flex items-center px-3 gap-3 text-xs text-white/90 z-50">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="white" className="opacity-90">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>
      <span className="font-semibold text-white/80">Finder</span>
      {["File", "Edit", "View", "Go", "Help"].map((m) => (
        <span key={m} className="hover:bg-white/10 px-1.5 py-0.5 rounded cursor-default">{m}</span>
      ))}
      <div className="flex-1" />
      <WifiIcon className="w-3.5 h-3.5" />
      <BatteryIcon className="w-4 h-4" />
      <span className="tabular-nums opacity-80">{time}</span>
    </div>
  );
}

function DesktopIcons({ onOpen }: { onOpen: (name: AppId) => void }) {
  return (
    <div className="absolute top-10 left-1/2 sm:left-4 -translate-x-1/2 sm:-translate-x-0 flex flex-row sm:flex-col gap-4 sm:gap-6 z-10">
      <DesktopIcon label="Finder" onDoubleClick={() => onOpen("finder")}>
        <FinderIcon className="w-8 h-8" />
      </DesktopIcon>
      <DesktopIcon label="Terminal" onDoubleClick={() => onOpen("terminal")}>
        <TerminalIcon className="w-8 h-8" />
      </DesktopIcon>
      <DesktopIcon label="Games" onDoubleClick={() => onOpen("games")}>
        <GameIcon className="w-8 h-8" />
      </DesktopIcon>
      <DesktopIcon label="Music" onDoubleClick={() => onOpen("music")}>
        <MusicIcon className="w-8 h-8" />
      </DesktopIcon>
    </div>
  );
}

function DesktopIcon({ label, children, onDoubleClick }: {
  label: string; children: React.ReactNode; onDoubleClick: () => void;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 cursor-pointer group w-20"
      onDoubleClick={onDoubleClick}
    >
      <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:border-white/30 group-hover:scale-105 transition-all">
        {children}
      </div>
      <span className="text-[11px] text-white/80 text-center drop-shadow-lg bg-black/20 px-2 py-0.5 rounded">{label}</span>
    </div>
  );
}

function Dock({ onOpen }: { onOpen: (name: AppId) => void }) {
  const apps = [
    { name: "Finder", icon: <FinderIcon className="w-6 h-6" />, action: "finder" as AppId },
    { name: "Terminal", icon: <TerminalIcon className="w-6 h-6" />, action: "terminal" as AppId },
    { name: "Music", icon: <MusicIcon className="w-6 h-6" />, action: "music" as AppId },
    { name: "Games", icon: <GameIcon className="w-6 h-6" />, action: "games" as AppId },
    { name: "Safari", icon: <SafariIcon className="w-6 h-6" /> },
    { name: "Trash", icon: <TrashIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-end gap-1 px-4 py-2 bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/10">
        {apps.map((app) => (
          <div
            key={app.name}
            onDoubleClick={() => app.action && onOpen(app.action!)}
            className="flex flex-col items-center gap-0.5 cursor-pointer group px-2 py-1 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              {app.icon}
            </div>
            <span className="text-[9px] text-white/60">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppWindow({ title, children, onClose, onFocus, zIndex, defaultPos }: {
  title: string; children: React.ReactNode; onClose: () => void;
  onFocus: () => void; zIndex: number;
  defaultPos?: { x: number; y: number };
}) {
  const [pos, setPos] = useState(defaultPos || { x: 80, y: 60 });
  const [size, setSize] = useState({ w: typeof window !== "undefined" ? Math.min(460, window.innerWidth - 24) : 460, h: 420 });
  const [dragStart, setDragStart] = useState<{ x: number; y: number; startX: number; startY: number } | null>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus();
    if ((e.target as HTMLElement).closest(".window-controls")) return;
    setDragStart({ x: e.clientX, y: e.clientY, startX: pos.x, startY: pos.y });
  };

  useEffect(() => {
    if (!dragStart) return;
    const handleMove = (e: MouseEvent) => {
      setPos({ x: dragStart.startX + e.clientX - dragStart.x, y: dragStart.startY + e.clientY - dragStart.y });
    };
    const handleUp = () => setDragStart(null);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => { window.removeEventListener("mousemove", handleMove); window.removeEventListener("mouseup", handleUp); };
  }, [dragStart]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute"
      style={{ left: pos.x, top: pos.y, zIndex }}
      onMouseDown={onFocus}
    >
      <div
        className="bg-black/50 backdrop-blur-2xl rounded-xl border border-white/15 overflow-hidden shadow-2xl"
        style={{ width: size.w, height: size.h }}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-white/5 window-controls cursor-default shrink-0">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-125 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-[#febc2e] opacity-80" />
            <div className="w-3 h-3 rounded-full bg-[#28c840] opacity-80" />
          </div>
          <span className="flex-1 text-center text-xs text-white/60 font-medium">{title}</span>
          <div className="w-14" />
        </div>
        <div className="h-[calc(100%-32px)] window-controls">
          {children}
        </div>
      </div>
    </motion.div>
  );
}

function GamesContent() {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [turn, setTurn] = useState<"X" | "O">("X");
  const [winner, setWinner] = useState<string | null>(null);

  const checkWinner = (b: string[]) => {
    const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for (const [a,bc,c] of lines) {
      if (b[a] && b[a] === b[bc] && b[a] === b[c]) return b[a];
    }
    return b.every((s) => s) ? "Draw" : null;
  };

  const play = (i: number) => {
    if (board[i] || winner) return;
    const nb = [...board];
    nb[i] = turn;
    setBoard(nb);
    const w = checkWinner(nb);
    if (w) setWinner(w);
    else setTurn(turn === "X" ? "O" : "X");
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setTurn("X");
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h3 className="text-sm font-semibold text-white/90">Tic-Tac-Toe</h3>
      {winner && (
        <p className="text-xs text-white/70">{winner === "Draw" ? "It's a draw!" : `${winner} wins!`}</p>
      )}
      <div className="grid grid-cols-3 gap-1.5">
        {board.map((cell, i) => (
          <button
            key={i}
            onClick={() => play(i)}
            className="w-14 h-14 bg-white/5 hover:bg-white/10 rounded-lg text-lg font-bold text-white/80 transition-colors"
          >
            {cell}
          </button>
        ))}
      </div>
      <button onClick={reset} className="text-xs text-blue-300 hover:text-blue-200 transition-colors">New Game</button>
    </div>
  );
}

function MusicContent() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentSong, setCurrentSong] = useState(0);

  const songs = [
    { title: "Midnight Dreams", artist: "Lofi Beats" },
    { title: "Ocean Waves", artist: "Ambient" },
    { title: "Neon Lights", artist: "Synthwave" },
    { title: "Stargazer", artist: "Chillhop" },
    { title: "Electric Pulse", artist: "Electronic" },
  ];

  return (
    <div className="p-4 space-y-4 h-full overflow-y-auto">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shrink-0">
          <MusicIcon className="w-6 h-6" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-white/90 truncate">{songs[currentSong].title}</h3>
          <p className="text-xs text-white/50">{songs[currentSong].artist}</p>
        </div>
      </div>
      <div className="space-y-1">
        {songs.map((song, i) => (
          <div
            key={i}
            onClick={() => setCurrentSong(i)}
            className={`flex items-center gap-3 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
              i === currentSong ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <span className="text-xs text-white/40 w-4">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white/80 truncate">{song.title}</p>
              <p className="text-[10px] text-white/40">{song.artist}</p>
            </div>
            <span className="text-[10px] text-white/30 shrink-0">3:30</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4">
        <button className="text-white/60 hover:text-white/80 text-lg transition-colors">⏮</button>
        <button
          onClick={() => setPlaying(!playing)}
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 transition-colors text-sm"
        >
          {playing ? "⏸" : "▶️"}
        </button>
        <button className="text-white/60 hover:text-white/80 text-lg transition-colors">⏭</button>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-white/40">🔊</span>
        <input type="range" min="0" max="100" value={volume} onChange={(e) => setVolume(Number(e.target.value))} className="flex-1 h-1 accent-white/60" />
      </div>
    </div>
  );
}
