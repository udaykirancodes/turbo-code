import { relations } from "drizzle-orm";
import { integer, pgTable, text, varchar } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const files = pgTable("files", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  filename: varchar().notNull(),
  slug: varchar().notNull(),
  content: text(),
  owner: integer()
    .notNull()
    .references(() => users.id),
});

export const fileRelations = relations(files, ({ one }) => ({
  user: one(users, {
    fields: [files.owner],
    references: [users.id],
  }),
}));
