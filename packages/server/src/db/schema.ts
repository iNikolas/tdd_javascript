import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const userTable = pgTable('todo', {
  id: uuid().primaryKey().defaultRandom(),
  text: varchar().notNull(),
});
