import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("student"), // teacher | student
  grade: text("grade"),
  division: text("division"),
  board: text("board"), // IGCSE | CBSE | IB | ICSE | STATE
  subject: text("subject"), // for teachers
  school: text("school"),
  avatarUrl: text("avatar_url"),
  teacherId: integer("teacher_id"), // for students linking to their teacher
  aiApiKey: text("ai_api_key"),
  teacherCode: text("teacher_code"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, passwordHash: true });
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof usersTable.$inferSelect;
