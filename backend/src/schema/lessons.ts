import { pgTable, text, serial, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";

export const lessonsTable = pgTable("lessons", {
  id: serial("id").primaryKey(),
  teacherId: integer("teacher_id").notNull().references(() => usersTable.id),
  title: text("title").notNull(),
  subject: text("subject").notNull(),
  grade: text("grade").notNull(),
  division: text("division"),
  board: text("board"),
  topic: text("topic").notNull(),
  description: text("description"),
  content: text("content"),
  videoUrl: text("video_url"),
  resourceUrls: json("resource_urls").$type<string[]>().default([]),
  published: boolean("published").default(false).notNull(),
  publishedAt: timestamp("published_at"),
  lessonDate: text("lesson_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertLessonSchema = z.object({
  teacherId: z.number(),
  title: z.string(),
  subject: z.string(),
  grade: z.string(),
  division: z.string().optional().nullable(),
  board: z.string().optional().nullable(),
  topic: z.string(),
  description: z.string().optional().nullable(),
  content: z.string().optional().nullable(),
  videoUrl: z.string().optional().nullable(),
  resourceUrls: z.array(z.string()).optional(),
  published: z.boolean().optional(),
  publishedAt: z.date().optional().nullable(),
  lessonDate: z.string().optional().nullable(),
});

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessonsTable.$inferSelect;