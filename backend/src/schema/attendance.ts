import { pgTable, serial, integer, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod";
import { usersTable } from "./users";

export const attendanceTable = pgTable("attendance", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  teacherId: integer("teacher_id").notNull().references(() => usersTable.id),
  date: text("date").notNull(),
  status: text("status").notNull().default("present"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAttendanceSchema = z.object({
  studentId: z.number(),
  teacherId: z.number(),
  date: z.string(),
  status: z.string().optional(),
});

export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
export type Attendance = typeof attendanceTable.$inferSelect;