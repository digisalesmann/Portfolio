const fs = require("fs");
const path = require("path");

// Path to your devicon icons (already copied into public/icons)
const ICONS_DIR = path.join(__dirname, "public", "icons");

// Recursive function to walk through subfolders
function walkDir(dir, callback) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

let logos = [];

// Scan icons
walkDir(ICONS_DIR, (filePath) => {
  if (filePath.endsWith(".svg")) {
    const relativePath = path.relative(path.join(__dirname, "public"), filePath).replace(/\\/g, "/");

    // Extract name from folder name (e.g., "react", "nextjs")
    const parts = relativePath.split("/");
    const techName = parts[1]; // folder name = tech name
    const formattedName = techName.charAt(0).toUpperCase() + techName.slice(1);

    logos.push({
      name: formattedName,
      icon: "/" + relativePath,
    });
  }
});

// Save JSON
const outputPath = path.join(__dirname, "logos.json");
fs.writeFileSync(outputPath, JSON.stringify(logos, null, 2));

console.log(`✅ Generated logos.json with ${logos.length} entries!`);
