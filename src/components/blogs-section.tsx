import { SectionHeading } from "./section-heading";

const blogs = [
  {
    title: "CrabGit — Building Git from Scratch in Rust",
    description:
      "I use Git every day, but honestly had no idea how it worked under the hood. So I spent a few weeks building my own version in Rust to figure it out. Turns out, Git is way cooler than I thought.",
    date: "16/11/2025",
    href: "/blogs/crabgit-rust",
    tags: ["Rust", "Git"],
  },
  {
    title: "Building My First Solana Smart Contract: A Simple Counter Explained",
    description:
      "Blockchain development is an exciting space, and Solana stands out for its high speed and low fees. As someone starting my journey in Solana smart contract programming, I wrote a very basic program to understand the fundamentals.",
    date: "21/07/2025",
    href: "/blogs/solana-smart-contract-counter",
    tags: ["Solana", "Rust", "Smart Contract"],
  },
  {
    title: "How I Built a Discord Bot in Go",
    description:
      "I've always found Discord bots fun to mess with, they're like little automated sidekicks living in your server. But instead of using the usual Node.js setup, I decided to try something different: writing a bot in Go.",
    date: "20/04/2025",
    href: "/blogs/discord-bot-go",
    tags: ["Go", "Discord", "Bot"],
  },
  {
    title: "What I Learned About TCP by Building My Own Server in Go",
    description:
      "Recently, I decided to dive a little deeper into how the internet works, not just using APIs or libraries, but actually writing something that communicates over the network at a lower level. So I built a basic TCP server in Go.",
    date: "06/04/2025",
    href: "/blogs/tcp-server-go",
    tags: ["Go", "TCP", "Networking"],
  },
];

export function BlogsSection() {
  return (
    <section className="space-y-6">
      <SectionHeading title="Blogs" href="/blogs" />
      <div className="space-y-4">
        {blogs.map((blog) => (
          <a
            key={blog.title}
            href={blog.href}
            className="blog-card block space-y-3"
          >
            <h3 className="font-semibold text-lg leading-snug">{blog.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed line-clamp-2">
              {blog.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-zinc-500">
              <span>{blog.date}</span>
              <span className="text-zinc-700">·</span>
              <div className="flex gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="hover:text-zinc-300 transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
              <span className="ml-auto text-blue-400 hover:text-blue-300 transition-colors">
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
