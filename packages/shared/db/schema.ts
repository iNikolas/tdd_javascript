import { relations } from "drizzle-orm/relations";
import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const listTable = pgTable("list", {
  id: uuid().primaryKey().defaultRandom(),
});

export const todoTable = pgTable("item", {
  id: uuid().primaryKey().defaultRandom(),
  text: varchar().notNull(),
  listId: uuid()
    .references(() => listTable.id)
    .notNull(),
});

export const todoTableRelations = relations(todoTable, ({ one }) => ({
  list: one(listTable, {
    fields: [todoTable.listId],
    references: [listTable.id],
  }),
}));

export const listTableRelations = relations(listTable, ({ many }) => ({
  items: many(todoTable),
}));

export const dbSchema = {
  todoTable,
  listTable,
  todoTableRelations,
  listTableRelations,
} as const;
