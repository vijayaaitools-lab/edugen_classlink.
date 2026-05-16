"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertProgressSchema = exports.progressTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const users_1 = require("./users");
exports.progressTable = (0, pg_core_1.pgTable)("progress", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    studentId: (0, pg_core_1.integer)("student_id").notNull().references(() => users_1.usersTable.id),
    subject: (0, pg_core_1.text)("subject").notNull(),
    topic: (0, pg_core_1.text)("topic"),
    score: (0, pg_core_1.numeric)("score", { precision: 5, scale: 2 }).default("0"),
    gamesPlayed: (0, pg_core_1.integer)("games_played").default(0),
    lessonsCompleted: (0, pg_core_1.integer)("lessons_completed").default(0),
    quizzesCompleted: (0, pg_core_1.integer)("quizzes_completed").default(0),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow().notNull(),
});
exports.insertProgressSchema = zod_1.z.object({
    studentId: zod_1.z.number(),
    subject: zod_1.z.string(),
    topic: zod_1.z.string().optional().nullable(),
    score: zod_1.z.string().optional(),
    gamesPlayed: zod_1.z.number().optional(),
    lessonsCompleted: zod_1.z.number().optional(),
    quizzesCompleted: zod_1.z.number().optional(),
});
