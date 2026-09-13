import fs from 'node:fs/promises';
import sharp from 'sharp';
const source = 'C:/Users/PERSADA - MIS PORTO/.codex/generated_images/01a09543-e4e8-7ba0-9fc5-5e2fd3f568fb/';
const images = { cover: 'exec-c90ee1c2-a780-455f-9605-23440409b9c3.png', intimate: 'exec-b91bbe48-b350-4555-bd02-713876c60977.png', closing: 'exec-2be916fb-6514-413d-b5d9-fa0873ef787c.png', groom: 'exec-85c5d42c-8d47-4e69-9d4a-4ef6f02a6dea.png', bride: 'exec-c01d6a99-a609-40d3-b72c-3f3bfd0a37a6.png', casual: 'exec-5b4a1a46-b513-496d-aa52-4163698d182b.png', engagement: 'exec-c78c5fe9-f789-4f6a-a56b-4a32694fa026.png' };
await fs.mkdir('work/original-images', { recursive: true });
for (const [name, file] of Object.entries(images)) {
  await fs.copyFile(source + file, 'work/original-images/' + name + '.png');
  await sharp(source + file).resize({ width: 1024 }).webp({ quality: 85, effort: 5 }).toFile('public/images/' + name + '.webp');
  await sharp(source + file).resize({ width: 512 }).webp({ quality: 80, effort: 5 }).toFile('public/images/' + name + '-small.webp');
}
console.log('Prepared 7 full-size and 7 mobile WebP images.');
