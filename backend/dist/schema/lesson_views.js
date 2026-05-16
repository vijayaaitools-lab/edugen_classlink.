"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonViewsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
const lessons_1 = require("./lessons");
exports.lessonViewsTable = (0, pg_core_1.pgTable)("lesson_views", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    lessonId: (0, pg_core_1.integer)("lesson_id").notNull().references(() => lessons_1.lessonsTable.id),
    studentId: (0, pg_core_1.integer)("student_id").notNull().references(() => users_1.usersTable.id),
    viewed: (0, pg_core_1.boolean)("viewed").default(true),
    viewedAt: (0, pg_core_1.timestamp)("viewed_at").defaultNow().notNull(),
});
