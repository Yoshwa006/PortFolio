export interface FileNode {
  name: string;
  type: "file" | "folder";
  content?: string;
  children?: FileNode[];
}

const fileSystem: FileNode[] = [
  {
    name: "Documents",
    type: "folder",
    children: [
      {
        name: "resume.txt",
        type: "file",
        content: `Yoshwa R
Backend Software Engineer
+91 6385766426 | ryoshwaa@gmail.com
github.com/yoshwa006 | linkedin.com/in/yos

EXPERIENCE:
- Software Engineer @ NectarIT Technologies (May 2026 - Present)
- Backend Engineer Intern @ NectarIT Technologies (Oct 2025 - Apr 2026)
- Web Dev Intern @ NXTLOGIC (May 2025 - Jul 2025)

EDUCATION:
- BCA @ Kongunadu Arts and Science College (CGPA: 8.54/10)

SKILLS: Java, Spring Boot, Kafka, PostgreSQL, Docker, AWS`,
      },
      {
        name: "notes.txt",
        type: "file",
        content: `TODO:
- Finish the distributed log analytics platform
- Practice LeetCode problems (target: 500+)
- Read up on system design patterns`,
      },
    ],
  },
  {
    name: "Projects",
    type: "folder",
    children: [
      {
        name: "competitive-coding-platform",
        type: "folder",
        children: [
          { name: "README.md", type: "file", content: "# Real-Time Competitive Coding Examination\n\nBuilt a real-time coding battle platform with automatic code execution and evaluation using Judge0 API. Deployed with Docker and AWS." },
          { name: "tech-stack.txt", type: "file", content: "Spring Boot, React.js, MySQL, AWS, Docker" },
        ],
      },
      {
        name: "log-analytics",
        type: "folder",
        children: [
          { name: "README.md", type: "file", content: "# Distributed Log Analytics Platform\n\nLog aggregation platform using microservices and Apache Kafka. Containerized with Docker on AWS EC2." },
          { name: "architecture.txt", type: "file", content: "Spring Boot microservices + Apache Kafka + Docker + AWS EC2" },
        ],
      },
    ],
  },
  {
    name: "Desktop",
    type: "folder",
    children: [
      { name: "welcome.txt", type: "file", content: "Welcome to Yoshwa's Developer Corner!\n\nExplore the file system, play Tic-Tac-Toe, or try the Terminal.\nType 'help' in Terminal for available commands." },
      { name: "todo.txt", type: "file", content: "- Build something cool\n- Ship it\n- Repeat" },
    ],
  },
  {
    name: "skills.json",
    type: "file",
    content: JSON.stringify({
      languages: ["Java", "JavaScript", "SQL", "HTML", "CSS"],
      backend: ["Spring Boot", "Spring Security", "REST APIs", "Microservices", "Apache Kafka", "Redis"],
      databases: ["PostgreSQL", "MySQL", "MongoDB", "Neo4j", "Solr"],
      cloud: ["Docker", "AWS EC2", "AWS S3", "Linux", "APISIX"],
      frontend: ["React.js"],
      tools: ["Git", "Maven", "Postman", "IntelliJ IDEA"],
    }, null, 2),
  },
  {
    name: "about.txt",
    type: "file",
    content: `Yoshwa R — Backend Software Engineer

Backend engineer experienced in building scalable systems using Java 17,
Spring Boot, PostgreSQL, Kafka and Docker. Skilled in distributed systems,
system design, REST APIs, RBAC and cloud-native development.

450+ LeetCode problems solved (rating: 1700)
Top 24 in Coimbatore CodeForces contest`,
  },
];

export function getFileSystem(): FileNode[] {
  return fileSystem;
}

export function findNode(path: string[]): FileNode | null {
  let current: FileNode[] = fileSystem;
  for (const segment of path) {
    const found = current.find((n) => n.name === segment);
    if (!found) return null;
    if (found.type === "file") return found;
    current = found.children || [];
  }
  return null;
}

export function listDir(path: string[]): FileNode[] | null {
  if (path.length === 0) return fileSystem;
  const node = findNode(path);
  if (!node || node.type === "file") return null;
  return node.children || [];
}
