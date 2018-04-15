const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const sourceDir = path.resolve(__dirname);
const packageJSON = JSON.parse(fs.readFileSync(path.join(sourceDir, 'package.json')));
const bundleName = packageJSON.name

const projectDir = process.env.INIT_CWD || path.resolve("../../", __dirname);
const bundlesDir = path.resolve(projectDir, 'bundles');
const destinationDir = path.join(bundlesDir, bundleName);

console.log('Symlinking bundle')
console.log('from: ' + sourceDir)
console.log('to:   ' + destinationDir)
const cp = spawnSync('ln', ['-s', sourceDir, destinationDir], { env: process.env, cwd: projectDir, stdio: 'inherit' })
const ranvierJSONPath = path.join(projectDir, 'ranvier.json')
const ranvierJSON = require(ranvierJSONPath);

if (ranvierJSON.bundles.indexOf(bundleName) == -1) {
  console.log('Adding ' + bundleName + ' to ranvier.json bundles')
  ranvierJSON.bundles.push(bundleName);
  fs.writeFileSync(ranvierJSONPath, JSON.stringify(ranvierJSON, null, 2));
}

process.exit();
