"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertUserSchema = exports.usersTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
exports.usersTable = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    email: (0, pg_core_1.text)("email").notNull().unique(),
    passwordHash: (0, pg_core_1.text)("password_hash").notNull(),
    role: (0, pg_core_1.text)("role").notNull().default("student"),
    grade: (0, pg_core_1.text)("grade"),
    division: (0, pg_core_1.text)("division"),
    board: (0, pg_core_1.text)("board"),
    subject: (0, pg_core_1.text)("subject"),
    school: (0, pg_core_1.text)("school"),
    avatarUrl: (0, pg_core_1.text)("avatar_url"),
    teacherId: (0, pg_core_1.integer)("teacher_id"),
    aiApiKey: (0, pg_core_1.text)("ai_api_key"),
    teacherCode: (0, pg_core_1.text)("teacher_code"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertUserSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.string().optional(),
    grade: zod_1.z.string().optional().nullable(),
    division: zod_1.z.string().optional().nullable(),
    board: zod_1.z.string().optional().nullable(),
    subject: zod_1.z.string().optional().nullable(),
    school: zod_1.z.string().optional().nullable(),
    avatarUrl: zod_1.z.string().optional().nullable(),
    teacherId: zod_1.z.number().optional().nullable(),
    aiApiKey: zod_1.z.string().optional().nullable(),
    teacherCode: zod_1.z.string().optional().nullable(),
});
