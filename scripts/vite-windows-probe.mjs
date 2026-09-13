// Vite's optional Windows mapped-drive optimization throws synchronously when
// process spawning is unavailable. Keep the safe filesystem implementation.
import fs from 'node:fs/promises';
const file = 'node_modules/vite/dist/node/chunks/node.js';
const code = await fs.readFile(file, 'utf8');
if (!code.includes('/* wedding: optional Windows network probe */')) {
  const start = code.indexOf('\texec("net use", (error, stdout) => {');
  const end = code.indexOf('\n\t});', start);
  if (start < 0 || end < 0) throw new Error('Vite probe structure changed; patch not applied.');
  const updated = code.slice(0, start) + '\ttry { /* wedding: optional Windows network probe */\n' + code.slice(start, end + 5) + '\n\t} catch { safeRealpathSync = fs.realpathSync; }' + code.slice(end + 5);
  await fs.writeFile(file, updated);
  console.log('Optional network-drive probe now tolerates unavailable subprocesses.');
}
