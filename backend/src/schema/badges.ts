import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";

export const badgesTable = pgTable("badges", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  name: text("name").notNull(),
  description: text("description"),
  icon: text("icon").notNull(),
  category: text("category"),
  awardedAt: timestamp("awarded_at").defaultNow().notNull(),
});

export const insertBadgeSchema = z.object({
  studentId: z.number(),
  name: z.string(),
  description: z.string().optional().nullable(),
  icon: z.string(),
  category: z.string().optional().nullable(),
});

export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badgesTable.$inferSelect;