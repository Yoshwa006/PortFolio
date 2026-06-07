"use client";

import { useState } from "react";
import { getFileSystem, listDir, findNode, FileNode } from "./virtual-fs";

interface FinderProps {
  onFocus?: () => void;
}

export function Finder({ onFocus }: FinderProps) {
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);

  const contents = listDir(currentPath);
  const pathStr = currentPath.length === 0 ? "/" : "/" + currentPath.join("/");

  const navigate = (name: string) => {
    const node = findNode([...currentPath, name]);
    if (node?.type === "folder") {
      setCurrentPath([...currentPath, name]);
      setSelectedFile(null);
    } else if (node?.type === "file") {
      setSelectedFile(node);
    }
  };

  const goBack = () => {
    setCurrentPath((p) => p.slice(0, -1));
    setSelectedFile(null);
  };

  const folders = contents?.filter((n) => n.type === "folder") || [];
  const files = contents?.filter((n) => n.type === "file") || [];

  return (
    <div className="flex flex-col h-full" onFocus={onFocus}>
      <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/10 bg-white/[0.02]">
        <button
          onClick={goBack}
          disabled={currentPath.length === 0}
          className="text-xs text-white/40 hover:text-white/80 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ← Back
        </button>
        <span className="text-xs text-white/40 font-mono">{pathStr}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-2" onClick={() => setSelectedFile(null)}>
        {selectedFile ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-white/60 border-b border-white/10 pb-1.5">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              <span>{selectedFile.name}</span>
            </div>
            <pre className="text-xs text-green-100/70 font-mono whitespace-pre-wrap leading-relaxed">
              {selectedFile.content}
            </pre>
          </div>
        ) : (
          <div className="space-y-1">
            {folders.map((folder) => (
              <div
                key={folder.name}
                onDoubleClick={() => navigate(folder.name)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-xs"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" className="shrink-0">
                  <path d="M2 5c0-1.1.9-2 2-2h5l2 2h9c1.1 0 2 .9 2 2v1H2V5z" fill="#60a5fa" opacity="0.8"/>
                  <rect x="2" y="7" width="20" height="13" rx="1.5" fill="#60a5fa" opacity="0.6"/>
                </svg>
                <span className="text-white/80">{folder.name}/</span>
              </div>
            ))}
            {files.map((file) => (
              <div
                key={file.name}
                onDoubleClick={() => setSelectedFile(file)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors text-xs"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="white" strokeWidth="1.5" className="shrink-0 opacity-50"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span className="text-white/70">{file.name}</span>
              </div>
            ))}
            {contents?.length === 0 && (
              <p className="text-xs text-white/30 text-center py-8">Empty folder</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
