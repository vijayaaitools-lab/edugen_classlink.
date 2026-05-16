"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const router = (0, express_1.Router)();
function requireAuth(req, res, next) {
    if (!req.session?.userId)
        return res.status(401).json({ error: "unauthorized" });
    next();
}
router.get("/", requireAuth, async (req, res) => {
    const { grade, subject, board, search } = req.query;
    const conditions = [];
    if (grade)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.topicsTable.grade, grade));
    if (subject)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.topicsTable.subject, subject));
    if (board)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.topicsTable.board, board));
    if (search)
        conditions.push((0, drizzle_orm_1.ilike)(schema_1.topicsTable.title, `%${search}%`));
    const topics = conditions.length > 0
        ? await db_1.db.select().from(schema_1.topicsTable).where((0, drizzle_orm_1.and)(...conditions))
        : await db_1.db.select().from(schema_1.topicsTable);
    return res.json(topics);
});
exports.default = router;
