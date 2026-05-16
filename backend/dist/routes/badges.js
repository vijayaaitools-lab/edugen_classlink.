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
    const { studentId } = req.query;
    const targetId = studentId ? parseInt(studentId) : req.session.userId;
    const badges = await db_1.db.select().from(schema_1.badgesTable).where((0, drizzle_orm_1.eq)(schema_1.badgesTable.studentId, targetId));
    return res.json(badges);
});
router.post("/", requireAuth, async (req, res) => {
    const { studentId, name, description, icon, category } = req.body;
    if (!studentId || !name || !icon) {
        return res.status(400).json({ error: "validation_error", message: "studentId, name and icon required" });
    }
    const [badge] = await db_1.db.insert(schema_1.badgesTable).values({
        studentId,
        name,
        description: description || null,
        icon,
        category: category || null,
    }).returning();
    return res.status(201).json(badge);
});
exports.default = router;
