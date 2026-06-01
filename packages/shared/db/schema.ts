import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todo", {
  id: uuid().primaryKey().defaultRandom(),
  text: varchar().notNull(),
});

export const dbSchema = {
  todoTable,
} as const;
