// Minimal static server for a plain HTML site (Railway free hosting for
// Braeden's friend — jgmarketsolutions.com). No dependencies.
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = process.env.PORT || 8080;
const TYPES = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".svg": "image/svg+xml", ".gif": "image/gif", ".ico": "image/x-icon",
  ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".mp4": "video/mp4", ".webm": "video/webm", ".json": "application/json",
  ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml",
};

http.createServer((req, res) => {
  let p = decodeURIComponent((req.url || "/").split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const file = path.normalize(path.join(ROOT, p));
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
  fs.stat(file, (err, st) => {
    let target = file;
    if (err || !st.isFile()) {
      // extensionless path → try .html, else fall back to the homepage
      if (!path.extname(file) && fs.existsSync(file + ".html")) target = file + ".html";
      else target = path.join(ROOT, "index.html");
    }
    const type = TYPES[path.extname(target).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": path.extname(target) === ".html" ? "no-cache" : "public, max-age=86400" });
    fs.createReadStream(target).pipe(res);
  });
}).listen(PORT, () => console.log("jg-market-solutions serving on", PORT));
