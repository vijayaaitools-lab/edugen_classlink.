"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertBadgeSchema = exports.badgesTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const zod_1 = require("zod");
const users_1 = require("./users");
exports.badgesTable = (0, pg_core_1.pgTable)("badges", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    studentId: (0, pg_core_1.integer)("student_id").notNull().references(() => users_1.usersTable.id),
    name: (0, pg_core_1.text)("name").notNull(),
    description: (0, pg_core_1.text)("description"),
    icon: (0, pg_core_1.text)("icon").notNull(),
    category: (0, pg_core_1.text)("category"),
    awardedAt: (0, pg_core_1.timestamp)("awarded_at").defaultNow().notNull(),
});
exports.insertBadgeSchema = zod_1.z.object({
    studentId: zod_1.z.number(),
    name: zod_1.z.string(),
    description: zod_1.z.string().optional().nullable(),
    icon: zod_1.z.string(),
    category: zod_1.z.string().optional().nullable(),
});
