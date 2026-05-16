"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQuizSchema = exports.quizzesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const users_1 = require("./users");
const lessons_1 = require("./lessons");
const routes_1 = __importDefault(require("../routes"));
exports.quizzesTable = (0, pg_core_1.pgTable)("quizzes", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    lessonId: (0, pg_core_1.integer)("lesson_id").references(() => lessons_1.lessonsTable.id),
    teacherId: (0, pg_core_1.integer)("teacher_id").references(() => users_1.usersTable.id),
    title: (0, pg_core_1.text)("title").notNull(),
    subject: (0, pg_core_1.text)("subject").notNull(),
    grade: (0, pg_core_1.text)("grade").notNull(),
    topic: (0, pg_core_1.text)("topic").notNull(),
    questions: (0, pg_core_1.json)("questions").$type().default([]),
    timeLimit: (0, pg_core_1.integer)("time_limit"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertQuizSchema = zod_1.z.object({
    lessonId: zod_1.z.number().optional().nullable(),
    teacherId: zod_1.z.number().optional().nullable(),
    title: zod_1.z.string(),
    subject: zod_1.z.string(),
    grade: zod_1.z.string(),
    topic: zod_1.z.string(),
    questions: zod_1.z.array(zod_1.z.object({
        id: zod_1.z.number(),
        question: zod_1.z.string(),
        options: zod_1.z.array(zod_1.z.string()),
        correctIndex: zod_1.z.number(),
        explanation: zod_1.z.string().optional(),
    })).optional(),
    timeLimit: zod_1.z.number().optional().nullable(),
});
exports.default = routes_1.default;
