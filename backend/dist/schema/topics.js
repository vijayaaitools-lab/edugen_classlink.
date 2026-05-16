"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topicsTable = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.topicsTable = (0, pg_core_1.pgTable)("topics", {
    id: (0, pg_core_1.serial)("id").primaryKey(),
    subject: (0, pg_core_1.text)("subject").notNull(),
    grade: (0, pg_core_1.text)("grade").notNull(),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description"),
    board: (0, pg_core_1.text)("board"),
    keywords: (0, pg_core_1.json)("keywords").$type().default([]),
    gameType: (0, pg_core_1.text)("game_type"),
    difficulty: (0, pg_core_1.text)("difficulty"),
    gameUrl: (0, pg_core_1.text)("game_url"),
});
