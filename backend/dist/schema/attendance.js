"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertAttendanceSchema = exports.attendanceTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const users_1 = require("./users");
exports.attendanceTable = (0, pg_core_1.pgTable)("attendance", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    studentId: (0, pg_core_1.integer)("student_id").notNull().references(() => users_1.usersTable.id),
    teacherId: (0, pg_core_1.integer)("teacher_id").notNull().references(() => users_1.usersTable.id),
    date: (0, pg_core_1.text)("date").notNull(),
    status: (0, pg_core_1.text)("status").notNull().default("present"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow().notNull(),
});
exports.insertAttendanceSchema = zod_1.z.object({
    studentId: zod_1.z.number(),
    teacherId: zod_1.z.number(),
    date: zod_1.z.string(),
    status: zod_1.z.string().optional(),
});
