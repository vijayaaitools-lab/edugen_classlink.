import { pgTable, serial, integer, text, timestamp, json } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";
import { lessonsTable } from "./lessons";

export const quizzesTable = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").references(() => lessonsTable.id),
  teacherId: integer("teacher_id").references(() => usersTable.id),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  grade: text("grade").notNull(),
  topic: text("topic").notNull(),
  questions: json("questions").$type<Array<{id: number; question: string; options: string[]; correctIndex: number; explanation?: string}>>().default([]),
  timeLimit: integer("time_limit"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizSchema = z.object({
  lessonId: z.number().optional().nullable(),
  teacherId: z.number().optional().nullable(),
  title: z.string(),
  subject: z.string(),
  grade: z.string(),
  topic: z.string(),
  questions: z.array(z.object({
    id: z.number(),
    question: z.string(),
    options: z.array(z.string()),
    correctIndex: z.number(),
    explanation: z.string().optional(),
  })).optional(),
  timeLimit: z.number().optional().nullable(),
});

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzesTable.$inferSelect;