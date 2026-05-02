import { pgTable, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { lessonsTable } from "./lessons";

export const lessonViewsTable = pgTable("lesson_views", {
  id: serial("id").primaryKey(),
  lessonId: integer("lesson_id").notNull().references(() => lessonsTable.id),
  studentId: integer("student_id").notNull().references(() => usersTable.id),
  viewed: boolean("viewed").default(true),
  viewedAt: timestamp("viewed_at").defaultNow().notNull(),
});

export type LessonView = typeof lessonViewsTable.$inferSelect;
