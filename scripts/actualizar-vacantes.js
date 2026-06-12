const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const csvPath = path.join(rootDir, 'assets', 'data', 'vacantes-resumen.csv');
const jsPath = path.join(rootDir, 'assets', 'data', 'vacantes-resumen-data.js');

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

if (!fs.existsSync(csvPath)) {
  fail(`No existe ${path.relative(rootDir, csvPath)}`);
}

const csv = fs.readFileSync(csvPath, 'utf8').replace(/\r\n/g, '\n').replace(/\r/g, '\n');
const trimmed = csv.trim();

if (!trimmed) {
  fail('El CSV esta vacio.');
}

if (!trimmed.toUpperCase().includes('SABORES') || !trimmed.toUpperCase().includes('EXTREMAS')) {
  fail('El CSV debe incluir las secciones SABORES EXPRESS y HAMBURGUESAS EXTREMAS.');
}

const escaped = trimmed
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${');

const output = `window.VACANTES_RESUMEN_CSV = \`${escaped}\n\`;\n`;
fs.writeFileSync(jsPath, output, 'utf8');

const rows = trimmed.split('\n').filter(Boolean).length;
console.log(`Actualizado ${path.relative(rootDir, jsPath)} desde ${path.relative(rootDir, csvPath)} (${rows} filas).`);
