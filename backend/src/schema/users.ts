import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("student"),
  grade: text("grade"),
  division: text("division"),
  board: text("board"),
  subject: text("subject"),
  school: text("school"),
  avatarUrl: text("avatar_url"),
  teacherId: integer("teacher_id"),
  aiApiKey: text("ai_api_key"),
  teacherCode: text("teacher_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  role: z.string().optional(),
  grade: z.string().optional().nullable(),
  division: z.string().optional().nullable(),
  board: z.string().optional().nullable(),
  subject: z.string().optional().nullable(),
  school: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  teacherId: z.number().optional().nullable(),
  aiApiKey: z.string().optional().nullable(),
  teacherCode: z.string().optional().nullable(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;