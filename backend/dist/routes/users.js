"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const router = (0, express_1.Router)();
function requireAuth(req, res, next) {
    if (!req.session?.userId) {
        return res.status(401).json({ error: "unauthorized", message: "Not authenticated" });
    }
    next();
}
function sanitizeUser(user) {
    const { passwordHash, aiApiKey, ...rest } = user;
    return { ...rest, aiApiKey: aiApiKey ? "***" : null };
}
router.get("/", requireAuth, async (req, res) => {
    const { role, grade, division } = req.query;
    const conditions = [];
    if (role)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.usersTable.role, role));
    if (grade)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.usersTable.grade, grade));
    if (division)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.usersTable.division, division));
    const users = conditions.length > 0
        ? await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.and)(...conditions))
        : await db_1.db.select().from(schema_1.usersTable);
    return res.json(users.map(sanitizeUser));
});
router.get("/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const [user] = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id)).limit(1);
    if (!user)
        return res.status(404).json({ error: "not_found", message: "User not found" });
    return res.json(sanitizeUser(user));
});
router.patch("/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (req.session.userId !== id) {
        return res.status(403).json({ error: "forbidden", message: "Cannot update other users" });
    }
    const { name, grade, division, board, subject, school, avatarUrl, aiApiKey } = req.body;
    const updates = {};
    if (name !== undefined)
        updates.name = name;
    if (grade !== undefined)
        updates.grade = grade;
    if (division !== undefined)
        updates.division = division;
    if (board !== undefined)
        updates.board = board;
    if (subject !== undefined)
        updates.subject = subject;
    if (school !== undefined)
        updates.school = school;
    if (avatarUrl !== undefined)
        updates.avatarUrl = avatarUrl;
    if (aiApiKey !== undefined)
        updates.aiApiKey = aiApiKey;
    const [user] = await db_1.db.update(schema_1.usersTable).set(updates).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id)).returning();
    return res.json(sanitizeUser(user));
});
exports.default = router;
