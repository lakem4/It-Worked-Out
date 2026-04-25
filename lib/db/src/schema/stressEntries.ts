import { pgTable, text, serial, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const stressEntriesTable = pgTable("stress_entries", {
  id: serial("id").primaryKey(),
  description: text("description").notNull(),
  loggedDate: date("logged_date").notNull(),
  reflectionDate: date("reflection_date").notNull(),
  status: text("status", { enum: ["pending", "worked_out", "still_stressing"] })
    .notNull()
    .default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertStressEntrySchema = createInsertSchema(stressEntriesTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStressEntry = z.infer<typeof insertStressEntrySchema>;
export type StressEntry = typeof stressEntriesTable.$inferSelect;
