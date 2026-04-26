import { pgTable, serial, integer, text, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { usersTable } from "./users";

export const progressTable = pgTable("progress", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  subject: text("subject").notNull(),
  topic: text("topic"),
  score: numeric("score", { precision: 5, scale: 2 }).default("0"),
  gamesPlayed: integer("games_played").default(0),
  lessonsCompleted: integer("lessons_completed").default(0),
  quizzesCompleted: integer("quizzes_completed").default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertProgressSchema = createInsertSchema(progressTable).omit({ id: true, updatedAt: true });
export type InsertProgress = z.infer<typeof insertProgressSchema>;
export type Progress = typeof progressTable.$inferSelect;
