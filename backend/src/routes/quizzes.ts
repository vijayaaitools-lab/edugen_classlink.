import { pgTable, serial, integer, text, timestamp, json } from "drizzle-orm/pg-core";
import { z } from "zod";
import usersTable from "./users";
import lessonsTable from "./lessons";

export const quizzesTable = pgTable("quizzes", {
  id: serial("id").primaryKey(),

  // lessonsTable may be a Router export in some setups; cast to any to avoid TS errors
  lessonId: integer("lesson_id").references(() => (lessonsTable as any).id),

  teacherId: integer("teacher_id")
    .notNull()
    .references(() => (usersTable as any).id),

  title: text("title").notNull(),

  subject: text("subject").notNull(),

  grade: text("grade").notNull(),

  topic: text("topic").notNull(),

  questions: json("questions")
    .$type<
      {
        id: number;
        question: string;
        options: string[];
        correctIndex: number;
        explanation?: string;
      }[]
    >()
    .notNull(),

  timeLimit: integer("time_limit"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizSchema = z.object({
  lessonId: z.number().optional().nullable(),
  teacherId: z.number(),
  title: z.string(),
  subject: z.string(),
  grade: z.string(),
  topic: z.string(),
  questions: z.any(),
  timeLimit: z.number().optional().nullable(),
});

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzesTable.$inferSelect;