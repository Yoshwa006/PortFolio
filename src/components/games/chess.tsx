"use client";

import { useState, useCallback } from "react";
import { Chess, type Square } from "chess.js";

const PIECES: Record<string, string> = {
  wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
  bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟",
};

const pieceVal: Record<string, number> = {
  p: 100, n: 320, b: 330, r: 500, q: 900, k: 20000,
};

const pst: Record<string, number[]> = {
  p: [0,0,0,0,0,0,0,0,50,50,50,50,50,50,50,50,10,10,20,30,30,20,10,10,5,5,10,25,25,10,5,5,0,0,0,20,20,0,0,0,5,-5,-10,0,0,-10,-5,5,5,10,10,-20,-20,10,10,5,0,0,0,0,0,0,0,0],
  n: [-50,-40,-30,-30,-30,-30,-40,-50,-40,-20,0,0,0,0,-20,-40,-30,0,10,15,15,10,0,-30,-30,5,15,20,20,15,5,-30,-30,0,15,20,20,15,0,-30,-30,5,10,15,15,10,5,-30,-40,-20,0,5,5,0,-20,-40,-50,-40,-30,-30,-30,-30,-40,-50],
};

function evalBoard(g: Chess): number {
  let score = 0;
  const b = g.board();
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const p = b[y][x];
      if (!p) continue;
      const v = pieceVal[p.type] || 0;
      const idx = y * 8 + x;
      const pstIdx = p.color === "w" ? 63 - idx : idx;
      score += p.color === "w" ? v + (pst[p.type]?.[pstIdx] || 0) : -(v + (pst[p.type]?.[pstIdx] || 0));
    }
  }
  return score;
}

function minimax(g: Chess, depth: number, alpha: number, beta: number, isMax: boolean): number {
  if (depth === 0 || g.isGameOver()) return evalBoard(g);
  const moves = g.moves();
  if (isMax) {
    let best = -Infinity;
    for (const m of moves) { g.move(m); best = Math.max(best, minimax(g, depth - 1, alpha, beta, false)); g.undo(); alpha = Math.max(alpha, best); if (beta <= alpha) break; }
    return best;
  } else {
    let best = Infinity;
    for (const m of moves) { g.move(m); best = Math.min(best, minimax(g, depth - 1, alpha, beta, true)); g.undo(); beta = Math.min(beta, best); if (beta <= alpha) break; }
    return best;
  }
}

function findBest(g: Chess): string | null {
  const moves = g.moves();
  if (moves.length === 0) return null;
  let best = moves[0], bestScore = -Infinity;
  for (const m of moves) { g.move(m); const s = -minimax(g, 2, -Infinity, Infinity, false); g.undo(); if (s > bestScore) { bestScore = s; best = m; } }
  return best;
}

export function ChessGame({ compact }: { compact?: boolean }) {
  const [game] = useState(() => new Chess());
  const [fen, setFen] = useState(game.fen());
  const [selected, setSelected] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [status, setStatus] = useState("");
  const [thinking, setThinking] = useState(false);

  const sync = useCallback((g: Chess) => {
    setFen(g.fen());
    setSelected(null);
    setLegalMoves([]);
    if (g.isCheckmate()) setStatus(g.turn() === "w" ? "Black wins!" : "White wins!");
    else if (g.isDraw()) setStatus("Draw");
    else if (g.isCheck()) setStatus("Check");
    else setStatus(g.turn() === "w" ? "Your turn" : "AI thinking...");
  }, []);

  const aiMove = useCallback((g: Chess) => {
    setThinking(true);
    setTimeout(() => {
      const m = findBest(g);
      if (m) { g.move(m); sync(g); }
      setThinking(false);
    }, 150);
  }, [sync]);

  const click = useCallback((square: string) => {
    if (game.turn() !== "w" || thinking || game.isGameOver()) return;
    const piece = game.get(square as Square);
    if (selected) {
      if (legalMoves.includes(square)) {
        game.move({ from: selected as Square, to: square as Square, promotion: "q" });
        sync(game);
        if (!game.isGameOver()) aiMove(game);
        return;
      }
      setSelected(null);
      setLegalMoves([]);
    }
    if (piece && piece.color === "w") {
      setSelected(square);
      const moves = game.moves({ square: square as Square, verbose: true }) as { to: string }[];
      setLegalMoves(moves.map(m => m.to));
    }
  }, [game, selected, legalMoves, thinking, sync, aiMove]);

  const reset = () => { game.reset(); sync(game); };

  const rows = [8, 7, 6, 5, 4, 3, 2, 1];
  const cols = ["a", "b", "c", "d", "e", "f", "g", "h"];

  return (
    <div className="flex flex-col items-center gap-2 h-full overflow-y-auto p-2">
      <div className="flex items-center gap-3">
        <h3 className={`font-semibold text-white/90 ${compact ? "text-xs" : "text-sm"}`}>
          Chess
        </h3>
        <span className={`text-zinc-400 ${compact ? "text-[9px]" : "text-[10px]"}`}>{status}</span>
      </div>
      <div className={`grid grid-cols-8 gap-0 ${compact ? "w-56" : "w-64 sm:w-72"}`}>
        {rows.map((row) =>
          cols.map((col) => {
            const square = col + row;
            const p = game.get(square as Square);
            const isSelected = selected === square;
            const isLegal = legalMoves.includes(square);
            const dark = (row + cols.indexOf(col)) % 2 === 1;
            return (
              <button
                key={square}
                onClick={() => click(square)}
                className={`aspect-square flex items-center justify-center text-lg sm:text-xl relative transition-all
                  ${dark ? "bg-[#b58863]" : "bg-[#f0d9b5]"}
                  ${isSelected ? "ring-2 ring-yellow-400 ring-inset" : ""}
                  ${p ? "cursor-pointer" : ""}
                  hover:brightness-110`}
              >
                {p && (
                  <span className="text-zinc-900">
                    {PIECES[`${p.color}${p.type.toUpperCase()}`] || p.type}
                  </span>
                )}
                {!p && isLegal && <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />}
              </button>
            );
          })
        )}
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[10px] text-zinc-500">
          {game.history().slice(-6).join(" ")}
        </span>
        <button onClick={reset} className="text-[10px] text-blue-300 hover:text-blue-200">
          New Game
        </button>
      </div>
    </div>
  );
}
