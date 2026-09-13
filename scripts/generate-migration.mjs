import fs from 'node:fs/promises';
import { generateSQLiteDrizzleJson, generateSQLiteMigration } from 'drizzle-kit/api';
import * as schema from '../db/schema.ts';
const journalPath = 'drizzle/meta/_journal.json';
try { const journal=JSON.parse(await fs.readFile(journalPath,'utf8'));if (!journal.entries?.length) throw new Error('Empty journal');console.log('Existing migrations preserved.'); }
catch {
  const previous = await generateSQLiteDrizzleJson({});
  const snapshot = await generateSQLiteDrizzleJson(schema, previous.id);
  const statements = await generateSQLiteMigration(previous, snapshot);
  const tag = '0000_wedding_rsvps';
  await fs.mkdir('drizzle/meta', { recursive: true });
  await fs.writeFile('drizzle/' + tag + '.sql', statements.join('\n--> statement-breakpoint\n') + '\n');
  await fs.writeFile('drizzle/meta/0000_snapshot.json', JSON.stringify(snapshot, null, 2));
  await fs.writeFile(journalPath, JSON.stringify({ version: '7', dialect: 'sqlite', entries: [{ idx: 0, version: snapshot.version, when: Date.now(), tag, breakpoints: true }] }, null, 2));
  console.log('Generated RSVP schema migration: ' + statements.length + ' statements.');
}
