"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertLessonSchema = exports.lessonsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const users_1 = require("./users");
exports.lessonsTable = (0, pg_core_1.pgTable)("lessons", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    teacherId: (0, pg_core_1.integer)("teacher_id").notNull().references(() => users_1.usersTable.id),
    title: (0, pg_core_1.text)("title").notNull(),
    subject: (0, pg_core_1.text)("subject").notNull(),
    grade: (0, pg_core_1.text)("grade").notNull(),
    division: (0, pg_core_1.text)("division"),
    board: (0, pg_core_1.text)("board"),
    topic: (0, pg_core_1.text)("topic").notNull(),
    description: (0, pg_core_1.text)("description"),
    content: (0, pg_core_1.text)("content"),
    videoUrl: (0, pg_core_1.text)("video_url"),
    resourceUrls: (0, pg_core_1.json)("resource_urls").$type().default([]),
    published: (0, pg_core_1.boolean)("published").default(false).notNull(),
    publishedAt: (0, pg_core_1.timestamp)("published_at"),
    lessonDate: (0, pg_core_1.text)("lesson_date"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertLessonSchema = zod_1.z.object({
    teacherId: zod_1.z.number(),
    title: zod_1.z.string(),
    subject: zod_1.z.string(),
    grade: zod_1.z.string(),
    division: zod_1.z.string().optional().nullable(),
    board: zod_1.z.string().optional().nullable(),
    topic: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    content: zod_1.z.string().optional().nullable(),
    videoUrl: zod_1.z.string().optional().nullable(),
    resourceUrls: zod_1.z.array(zod_1.z.string()).optional(),
    published: zod_1.z.boolean().optional(),
    publishedAt: zod_1.z.date().optional().nullable(),
    lessonDate: zod_1.z.string().optional().nullable(),
});
