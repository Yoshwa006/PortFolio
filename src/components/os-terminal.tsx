"use client";

import { useState, useRef, useEffect } from "react";
import { getFileSystem, listDir, findNode } from "./virtual-fs";

interface TerminalProps {
  onClose?: () => void;
  onFocus?: () => void;
}

export function Terminal({ onClose, onFocus }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([
    "Welcome to Developer Corner Terminal v1.0",
    "Type 'help' for available commands.",
    "",
  ]);
  const [cwd, setCwd] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const cwdStr = cwd.length === 0 ? "~" : "~/" + cwd.join("/");

  const runCommand = (cmd: string) => {
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase();
    const args = parts.slice(1);

    const newHistory = [...history, `${cwdStr} $ ${cmd}`];

    switch (command) {
      case "help":
        newHistory.push(
          "",
          "Available commands:",
          "  help          - Show this help",
          "  whoami        - About me",
          "  skills        - List technical skills",
          "  projects      - Show projects",
          "  experience    - Work experience",
          "  education     - Education details",
          "  ls            - List files",
          "  cd <dir>      - Change directory",
          "  cat <file>    - View file content",
          "  pwd           - Print working directory",
          "  neofetch      - System info",
          "  leetcode      - LeetCode stats",
          "  contact       - Contact info",
          "  clear         - Clear terminal",
          "  date          - Current date & time",
          "  banner        - Display banner",
          "",
        );
        break;

      case "banner":
        newHistory.push(
          "",
          "╔══════════════════════════════════╗",
          "║     DEVELOPER CORNER v1.0        ║",
          "║     Yoshwa R - Backend Engineer   ║",
          "╚══════════════════════════════════╝",
          "",
        );
        break;

      case "whoami":
        newHistory.push(
          "",
          "Yoshwa R",
          "Backend Software Engineer",
          "Building scalable systems with Java, Spring Boot & Kafka",
          "LeetCode 1700 | CodeForces Top 24 (Coimbatore)",
          "",
        );
        break;

      case "skills":
        newHistory.push(
          "",
          "┌─ TECHNICAL SKILLS ──────────────────────────────┐",
          "│ Languages:  Java, JavaScript, SQL, HTML, CSS     │",
          "│ Backend:    Spring Boot, Spring Security, Kafka, │",
          "│             REST APIs, Microservices, Redis      │",
          "│ Databases:  PostgreSQL, MySQL, MongoDB, Neo4j,   │",
          "│             Solr                                 │",
          "│ Cloud:      Docker, AWS EC2, AWS S3, Linux,      │",
          "│             APISIX                               │",
          "│ Frontend:   React.js                              │",
          "│ Tools:      Git, Maven, Postman, IntelliJ IDEA   │",
          "└──────────────────────────────────────────────────┘",
          "",
        );
        break;

      case "projects":
        newHistory.push(
          "",
          "PROJECTS:",
          "",
          "1. Real-Time Competitive Coding Examination",
          "   Tech: Spring Boot, React.js, MySQL, AWS, Docker",
          "   Real-time coding battle with Judge0 API integration",
          "",
          "2. Distributed Log Analytics Platform",
          "   Tech: Spring Boot, Kafka, Docker, AWS EC2",
          "   Log aggregation with microservices architecture",
          "",
        );
        break;

      case "experience":
        newHistory.push(
          "",
          "WORK EXPERIENCE:",
          "",
          "  Software Engineer @ NectarIT Technologies",
          "  May 2026 - Present",
          "  • IoT-integrated CAFM platform (Java, Spring Boot, Kafka)",
          "  • Centralized RBAC and access-control systems",
          "  • Migrated enterprise data from Neo4j to PostgreSQL",
          "  • Built REST APIs with distributed backend architecture",
          "",
          "  Backend Software Engineer Intern @ NectarIT Technologies",
          "  Oct 2025 - Apr 2026",
          "  • Backend APIs with Spring Boot & PostgreSQL",
          "  • Access-control implementation & API optimization",
          "",
          "  Web Development Intern @ NXTLOGIC",
          "  May 2025 - Jul 2025",
          "  • Full-stack apps with Spring Boot, React.js & MySQL",
          "  • REST API design & frontend-backend integration",
          "",
        );
        break;

      case "education":
        newHistory.push(
          "",
          "EDUCATION:",
          "",
          "  Kongunadu Arts and Science College",
          "  Bachelor of Computer Applications",
          "  CGPA: 8.54/10 | Graduated Apr 2026",
          "  Tamil Nadu, India",
          "",
        );
        break;

      case "leetcode":
        newHistory.push(
          "",
          "LeetCode Stats:",
          "  Problems Solved: 450+",
          "  Contest Rating: 1700",
          "  Profile: https://leetcode.com/u/yoshwa006/",
          "",
        );
        break;

      case "contact":
        newHistory.push(
          "",
          "Contact:",
          "  Email:   ryoshwaa@gmail.com",
          "  Phone:   +91 6385766426",
          "  GitHub:  github.com/yoshwa006",
          "  LinkedIn: linkedin.com/in/yos",
          "",
        );
        break;

      case "neofetch":
        newHistory.push(
          "",
          "       ████████████        Yoshwa@developer-corner",
          "     ████████████████      -----------------------",
          "    ██████████████████     OS:     Developer Corner v1.0",
          "   ████████████████████    Kernel: Java 17, Spring Boot",
          "   ████████████████████    Uptime: building cool stuff",
          "   ████████████████████    Shell:  dev-corner terminal",
          "   ████████████████████    Skills: Java, Kafka, Docker",
          "    ██████████████████     LeetCode: 1700 rating",
          "     ████████████████      Projects: 2 shipped",
          "       ████████████        Education: BCA (8.54 CGPA)",
          "",
        );
        break;

      case "date": {
        newHistory.push("", new Date().toString(), "");
        break;
      }

      case "clear":
        setHistory([]);
        return;

      case "pwd":
        newHistory.push("", "/home/yoshwa" + (cwd.length ? "/" + cwd.join("/") : ""), "");
        break;

      case "ls": {
        const contents = listDir(cwd);
        if (!contents) {
          newHistory.push("", "ls: " + (args[0] || "directory") + ": No such directory", "");
        } else if (contents.length === 0) {
          newHistory.push("", "(empty)", "");
        } else {
          const maxName = Math.max(...contents.map((n) => n.name.length));
          const lines: string[] = [];
          let currentLine = "";
          for (const node of contents) {
            const entry = node.type === "folder" ? `${node.name}/` : node.name;
            const padded = entry.padEnd(maxName + 3);
            if ((currentLine + padded).length > 60) {
              lines.push(currentLine);
              currentLine = padded;
            } else {
              currentLine += padded;
            }
          }
          if (currentLine) lines.push(currentLine);
          newHistory.push("", ...lines, "");
        }
        break;
      }

      case "cd": {
        if (args.length === 0 || args[0] === "~" || args[0] === "/") {
          setCwd([]);
        } else if (args[0] === "..") {
          setCwd((p) => p.slice(0, -1));
        } else {
          const newPath = [...cwd, args[0]];
          const contents = listDir(newPath);
          if (!contents) {
            newHistory.push("", `cd: ${args[0]}: No such directory`, "");
          } else {
            setCwd(newPath);
          }
        }
        break;
      }

      case "cat": {
        if (args.length === 0) {
          newHistory.push("", "cat: missing filename", "");
        } else {
          const file = findNode([...cwd, args[0]]);
          if (!file || file.type !== "file") {
            newHistory.push("", `cat: ${args[0]}: No such file`, "");
          } else {
            newHistory.push("", file.content || "(empty)", "");
          }
        }
        break;
      }

      case "":
        break;

      default:
        newHistory.push("", `zsh: command not found: ${command}`, "");
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (trimmed) {
      runCommand(trimmed);
    } else {
      setHistory([...history, `${cwdStr} $ `]);
    }
    setInput("");
  };

  return (
    <div className="flex flex-col h-full" onClick={() => inputRef.current?.focus()} onFocus={onFocus}>
      <div className="flex-1 overflow-y-auto font-mono text-xs leading-relaxed p-3 space-y-0.5" onClick={() => inputRef.current?.focus()}>
        {history.map((line, i) => (
          <div key={i} className={line.startsWith("┌") || line.startsWith("│") || line.startsWith("└") || line.startsWith("╔") || line.startsWith("║") || line.startsWith("╚") ? "text-green-400" : line.startsWith("  •") ? "text-blue-300" : line.startsWith("Error") || line.startsWith("zsh") || line.startsWith("cat:") || line.startsWith("cd:") || line.startsWith("ls:") ? "text-red-400" : "text-green-100/80"}>
            {line || "\u00A0"}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 px-3 py-2">
        <span className="text-green-400 font-mono text-xs shrink-0">{cwdStr} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-xs font-mono text-green-100/90"
          autoFocus
        />
      </form>
    </div>
  );
}
