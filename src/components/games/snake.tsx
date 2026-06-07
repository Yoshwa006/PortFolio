"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const GRID = 16;
const TICK = 150;

type Dir = "UP" | "DOWN" | "LEFT" | "RIGHT";

function randPos(snake: [number, number][]): [number, number] {
  let p: [number, number];
  do { p = [Math.floor(Math.random() * GRID), Math.floor(Math.random() * GRID)]; }
  while (snake.some((s) => s[0] === p[0] && s[1] === p[1]));
  return p;
}

export function SnakeGame({ compact }: { compact?: boolean }) {
  const [snake, setSnake] = useState<[number, number][]>([[5, 5], [4, 5], [3, 5]]);
  const [food, setFood] = useState<[number, number]>([10, 10]);
  const [dir, setDir] = useState<Dir>("RIGHT");
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const dirRef = useRef<Dir>("RIGHT");

  const reset = () => {
    setSnake([[5, 5], [4, 5], [3, 5]]);
    setFood([10, 10]);
    setDir("RIGHT");
    dirRef.current = "RIGHT";
    setScore(0);
    setRunning(true);
    setGameOver(false);
  };

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); if (!running || gameOver) reset(); else setRunning(false); return; }
    const map: Record<string, Dir> = { ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT" };
    const nd = map[e.key];
    if (!nd) return;
    e.preventDefault();
    const opposite: Record<Dir, Dir> = { UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT" };
    if (nd !== opposite[dirRef.current]) { dirRef.current = nd; setDir(nd); }
  }, [running, gameOver]);

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  useEffect(() => {
    if (!running || gameOver) return;
    const id = setInterval(() => {
      setSnake((prev) => {
        const d = dirRef.current;
        const head = prev[0];
        const nh: [number, number] =
          d === "UP" ? [head[0], head[1] - 1] :
          d === "DOWN" ? [head[0], head[1] + 1] :
          d === "LEFT" ? [head[0] - 1, head[1]] :
          [head[0] + 1, head[1]];
        if (nh[0] < 0 || nh[0] >= GRID || nh[1] < 0 || nh[1] >= GRID || prev.some((s) => s[0] === nh[0] && s[1] === nh[1])) {
          setGameOver(true);
          setRunning(false);
          return prev;
        }
        const ate = nh[0] === food[0] && nh[1] === food[1];
        if (ate) { setScore((s) => s + 1); setFood(randPos(prev)); }
        return [nh, ...prev.slice(0, ate ? prev.length : prev.length - 1)];
      });
    }, TICK);
    return () => clearInterval(id);
  }, [running, gameOver, food]);

  const cell = compact ? "w-3.5 h-3.5" : "w-4 h-4 sm:w-5 sm:h-5";

  return (
    <div className="flex flex-col items-center gap-2 h-full overflow-y-auto p-2">
      <div className="flex items-center gap-3">
        <h3 className={`font-semibold text-white/90 ${compact ? "text-xs" : "text-sm"}`}>Snake</h3>
        <span className="text-[10px] text-zinc-400">Score: {score}</span>
        {!running && !gameOver && (
          <button onClick={reset} className="text-[10px] text-blue-300 hover:text-blue-200">
            Start
          </button>
        )}
        {gameOver && (
          <button onClick={reset} className="text-[10px] text-blue-300 hover:text-blue-200">
            Restart
          </button>
        )}
      </div>
      {gameOver && <p className="text-[10px] text-red-400">Game Over</p>}
      <div className={`grid grid-cols-16 gap-px bg-zinc-700 ${compact ? "p-1" : "p-1"}`}
        style={{ gridTemplateColumns: `repeat(${GRID}, 1fr)` }}>
        {Array.from({ length: GRID * GRID }).map((_, i) => {
          const x = i % GRID, y = Math.floor(i / GRID);
          const isSnake = snake.some((s) => s[0] === x && s[1] === y);
          const isHead = snake[0]?.[0] === x && snake[0]?.[1] === y;
          const isFood = food[0] === x && food[1] === y;
          return (
            <div
              key={i}
              className={`${cell} ${isHead ? "bg-green-400" : isSnake ? "bg-green-600" : isFood ? "bg-red-500 rounded-full" : "bg-zinc-800"}`}
            />
          );
        })}
      </div>
      <p className="text-[9px] text-zinc-500">Arrow keys to move · Space to pause</p>
    </div>
  );
}
