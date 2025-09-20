// generate-structure.js
const fs = require("fs");
const path = require("path");

// The folder structure you want
const structure = {
  pages: {
    "index.js": "// Home Page\nexport default function Home() { return <h1>Home</h1>; }",
    "about.js": "// About Page\nexport default function About() { return <h1>About</h1>; }",
    projects: {
      "index.js": "// Projects Index\nexport default function Projects() { return <h1>All Projects</h1>; }",
      "[slug].js": "// Project Details\nexport default function Project() { return <h1>Project Details</h1>; }",
    },
    blog: {
      "index.js": "// Blog Index\nexport default function Blog() { return <h1>All Blog Posts</h1>; }",
      "[slug].mdx": "---\ntitle: 'Sample Post'\n---\n\n# Blog Post\nThis is a sample blog post.",
    },
    "contact.js": "// Contact Page\nexport default function Contact() { return <h1>Contact</h1>; }",
  },
  components: {
    "Navbar.js": "export default function Navbar() { return <nav>Navbar</nav>; }",
    "Footer.js": "export default function Footer() { return <footer>Footer</footer>; }",
    "Hero.js": "export default function Hero() { return <section>Hero Section</section>; }",
    "ProjectCard.js": "export default function ProjectCard() { return <div>Project Card</div>; }",
    "BlogCard.js": "export default function BlogCard() { return <div>Blog Card</div>; }",
    "ThemeToggle.js": "export default function ThemeToggle() { return <button>Toggle Theme</button>; }",
  },
  public: {},
  styles: {},
  data: {},
  posts: {},
};

// Recursive function to generate folders & files
function createStructure(basePath, obj) {
  for (const name in obj) {
    const targetPath = path.join(basePath, name);
    if (typeof obj[name] === "string") {
      // Create file with placeholder content
      fs.writeFileSync(targetPath, obj[name]);
      console.log(`Created file: ${targetPath}`);
    } else {
      // Create folder if it doesn’t exist
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
        console.log(`Created folder: ${targetPath}`);
      }
      // Recursively create sub-structure
      createStructure(targetPath, obj[name]);
    }
  }
}

// Run in current directory (where generate-structure.js is located)
const baseDir = __dirname;
createStructure(baseDir, structure);

console.log("✅ Portfolio structure generated successfully!");
