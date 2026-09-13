import fs from 'node:fs/promises';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
const result = await postcss([tailwind()]).process(await fs.readFile('app/globals.css', 'utf8'), { from: 'app/globals.css', to: 'work/preview/style.css' });
await fs.writeFile('work/preview/style.css', result.css);
console.log('Compiled invitation styles.');
