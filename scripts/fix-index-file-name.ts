// Weird, I know, but check this out (article from the best author on Medium):
// * https://medium.com/javascript-in-plain-english/deploy-angular-20-ssr-on-vercel-a-hack-that-actually-works-184a9afde5f4

const fs = require('fs');
const path = require('path');

const projectName = 'pushserbia-fe';
const filePath = path.join(__dirname, '../dist', projectName, 'server', 'main.server.mjs');

if (!fs.existsSync(filePath)) {
  console.error('❌ main.server.mjs not found at:', filePath);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

const oldString = 'index.csr.html';
const newString = 'indexFile.html';

if (content.includes(oldString)) {
  content = content.replace(new RegExp(oldString, 'g'), newString);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Replaced "${oldString}" with "${newString}" in main.server.mjs`);
} else {
  console.warn(`⚠️ String "${oldString}" not found in main.server.mjs`);
}
