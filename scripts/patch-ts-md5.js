/**
 * Postinstall patch for ts-md5 package.
 *
 * ngx-gravatar imports "ts-md5/dist/md5" without a .js extension.
 * Node's ESM resolver requires either the extension or an "exports" map
 * in the package so it can find the file. ts-md5 doesn't ship one,
 * so we add it here after every npm install.
 */
const fs = require('fs');
const path = require('path');

const pkgPath = path.join(__dirname, '..', 'node_modules', 'ts-md5', 'package.json');

if (!fs.existsSync(pkgPath)) {
  // ts-md5 not installed — nothing to patch
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

if (pkg.exports) {
  // Already has exports — skip
  process.exit(0);
}

pkg.exports = {
  '.': {
    import: './dist/md5.js',
    require: './dist/md5.js',
  },
  './dist/md5': {
    import: './dist/md5.js',
    require: './dist/md5.js',
  },
};

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
console.log('Patched ts-md5 package.json with exports field.');
