import Link from "next/link";

interface SectionHeadingProps {
  title: string;
  href: string;
}

export function SectionHeading({ title, href }: SectionHeadingProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl md:text-3xl font-bold"><span className="gradient-text">{title}</span></h2>
      <Link
        href={href}
        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
      >
        View All →
      </Link>
    </div>
  );
}
