export function FinderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="white" opacity="0.9"/>
      <circle cx="8.5" cy="9.5" r="1.5" fill="#2563EB"/>
      <circle cx="15.5" cy="9.5" r="1.5" fill="#2563EB"/>
      <path d="M7 15c1 2 4 3 5 3s4-1 5-3" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function SafariIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="10" fill="white" opacity="0.9"/>
      <path d="M12 2L13.5 10.5L22 12L13.5 13.5L12 22L10.5 13.5L2 12L10.5 10.5Z" fill="#2563EB"/>
    </svg>
  );
}

export function TerminalIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="3" fill="white" opacity="0.9"/>
      <path d="M6 9l3 3-3 3" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 15h5" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function TrashIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="16" rx="2" fill="white" opacity="0.9"/>
      <path d="M8 5V3.5C8 2.67 8.67 2 9.5 2h5c.83 0 1.5.67 1.5 1.5V5" stroke="#0a0a0a" strokeWidth="1.5"/>
      <path d="M10 9v8M14 9v8" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M2 5h20" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export function MusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="7" cy="17" r="4" fill="white" opacity="0.9"/>
      <path d="M11 17V5l10-2v12" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="18" cy="15" r="3.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

export function GameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="7" width="20" height="12" rx="3" fill="white" opacity="0.9"/>
      <circle cx="7" cy="13" r="1.5" fill="#2563EB"/>
      <circle cx="17" cy="13" r="1.5" fill="#2563EB"/>
      <rect x="8.5" y="10.5" width="7" height="2" rx="1" fill="#2563EB"/>
      <rect x="8.5" y="10.5" width="2" height="7" rx="1" fill="#2563EB"/>
    </svg>
  );
}

export function FolderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M2 5c0-1.1.9-2 2-2h5l2 2h9c1.1 0 2 .9 2 2v1H2V5z" fill="white" opacity="0.9"/>
      <rect x="2" y="7" width="20" height="13" rx="1.5" fill="white" opacity="0.9"/>
    </svg>
  );
}

export function WifiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 19.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" fill="white" opacity="0.7"/>
      <path d="M7.5 15.5a6 6 0 019 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <path d="M4 12a10 10 0 0116 0" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
    </svg>
  );
}

export function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="7" width="18" height="10" rx="2" stroke="white" strokeWidth="1.3" opacity="0.7"/>
      <rect x="4" y="9" width="12" height="6" rx="1" fill="white" opacity="0.5"/>
      <path d="M22 10.5v3a1.5 1.5 0 000-3z" fill="white" opacity="0.5"/>
    </svg>
  );
}
