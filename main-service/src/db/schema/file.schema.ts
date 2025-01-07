import { relations, sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const files = pgTable("files", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  filename: varchar().notNull(),
  slug: varchar().notNull(),
  content: text(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
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
