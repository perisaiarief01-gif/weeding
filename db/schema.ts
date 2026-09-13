import { sqliteTable, text, integer, index, check } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
export const rsvps = sqliteTable('rsvps', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  attendance: text('attendance').notNull(),
  guests: integer('guests').notNull(),
  message: text('message').notNull().default(''),
  createdAt: integer('created_at').notNull(),
  requestKey: text('request_key').notNull(),
}, table => [
  index('rsvps_created_idx').on(table.createdAt, table.id),
  index('rsvps_rate_idx').on(table.requestKey, table.createdAt),
  check('rsvps_attendance_check', sql`${table.attendance} IN ('hadir', 'tidak')`),
  check('rsvps_guests_check', sql`(${table.attendance} = 'hadir' AND ${table.guests} BETWEEN 1 AND 5) OR (${table.attendance} = 'tidak' AND ${table.guests} = 0)`),
]);
