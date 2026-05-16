"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertQuizSchema = exports.quizzesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const users_1 = __importDefault(require("./users"));
const lessons_1 = __importDefault(require("./lessons"));
exports.quizzesTable = (0, pg_core_1.pgTable)("quizzes", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    // lessonsTable may be a Router export in some setups; cast to any to avoid TS errors
    lessonId: (0, pg_core_1.integer)("lesson_id").references(() => lessons_1.default.id),
    teacherId: (0, pg_core_1.integer)("teacher_id")
        .notNull()
        .references(() => users_1.default.id),
    title: (0, pg_core_1.text)("title").notNull(),
    subject: (0, pg_core_1.text)("subject").notNull(),
    grade: (0, pg_core_1.text)("grade").notNull(),
    topic: (0, pg_core_1.text)("topic").notNull(),
    questions: (0, pg_core_1.json)("questions")
        .$type()
        .notNull(),
    timeLimit: (0, pg_core_1.integer)("time_limit"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertQuizSchema = zod_1.z.object({
    lessonId: zod_1.z.number().optional().nullable(),
    teacherId: zod_1.z.number(),
    title: zod_1.z.string(),
    subject: zod_1.z.string(),
    grade: zod_1.z.string(),
    topic: zod_1.z.string(),
    questions: zod_1.z.any(),
    timeLimit: zod_1.z.number().optional().nullable(),
});
