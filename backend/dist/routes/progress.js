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
    const { studentId, subject } = req.query;
    const conditions = [];
    if (studentId)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.progressTable.studentId, parseInt(studentId)));
    else
        conditions.push((0, drizzle_orm_1.eq)(schema_1.progressTable.studentId, req.session.userId));
    if (subject)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.progressTable.subject, subject));
    const records = await db_1.db.select().from(schema_1.progressTable).where((0, drizzle_orm_1.and)(...conditions));
    return res.json(records);
});
router.post("/", requireAuth, async (req, res) => {
    const { subject, topic, score, gamesPlayed, lessonsCompleted, quizzesCompleted } = req.body;
    const studentId = req.session.userId;
    const existing = await db_1.db.select().from(schema_1.progressTable)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.progressTable.studentId, studentId), (0, drizzle_orm_1.eq)(schema_1.progressTable.subject, subject)))
        .limit(1);
    if (existing.length > 0) {
        const current = existing[0];
        const updates = {
            updatedAt: new Date(),
        };
        if (score !== undefined)
            updates.score = String(score);
        if (topic !== undefined)
            updates.topic = topic;
        if (gamesPlayed !== undefined)
            updates.gamesPlayed = (current.gamesPlayed || 0) + gamesPlayed;
        if (lessonsCompleted !== undefined)
            updates.lessonsCompleted = (current.lessonsCompleted || 0) + lessonsCompleted;
        if (quizzesCompleted !== undefined)
            updates.quizzesCompleted = (current.quizzesCompleted || 0) + quizzesCompleted;
        const [updated] = await db_1.db.update(schema_1.progressTable).set(updates).where((0, drizzle_orm_1.eq)(schema_1.progressTable.id, current.id)).returning();
        return res.json(updated);
    }
    else {
        const [created] = await db_1.db.insert(schema_1.progressTable).values({
            studentId,
            subject,
            topic: topic || null,
            score: score !== undefined ? String(score) : "0",
            gamesPlayed: gamesPlayed || 0,
            lessonsCompleted: lessonsCompleted || 0,
            quizzesCompleted: quizzesCompleted || 0,
        }).returning();
        return res.json(created);
    }
});
exports.default = router;
