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
    const { date, grade, division, studentId } = req.query;
    const conditions = [];
    if (date)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.attendanceTable.date, date));
    if (studentId)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.attendanceTable.studentId, parseInt(studentId)));
    const records = conditions.length > 0
        ? await db_1.db.select({ att: schema_1.attendanceTable, student: schema_1.usersTable })
            .from(schema_1.attendanceTable)
            .leftJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.attendanceTable.studentId, schema_1.usersTable.id))
            .where((0, drizzle_orm_1.and)(...conditions))
        : await db_1.db.select({ att: schema_1.attendanceTable, student: schema_1.usersTable })
            .from(schema_1.attendanceTable)
            .leftJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.attendanceTable.studentId, schema_1.usersTable.id));
    return res.json(records.map(r => ({
        ...r.att,
        student: r.student ? { id: r.student.id, name: r.student.name, grade: r.student.grade, division: r.student.division } : null,
    })));
});
router.post("/", requireAuth, async (req, res) => {
    const { date, records } = req.body;
    if (!date || !records || !Array.isArray(records)) {
        return res.status(400).json({ error: "validation_error", message: "date and records array required" });
    }
    const teacherId = req.session.userId;
    const results = [];
    for (const record of records) {
        const { studentId, status } = record;
        const existing = await db_1.db.select().from(schema_1.attendanceTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.attendanceTable.studentId, studentId), (0, drizzle_orm_1.eq)(schema_1.attendanceTable.date, date), (0, drizzle_orm_1.eq)(schema_1.attendanceTable.teacherId, teacherId))).limit(1);
        if (existing.length > 0) {
            const [updated] = await db_1.db.update(schema_1.attendanceTable)
                .set({})
                .where((0, drizzle_orm_1.eq)(schema_1.attendanceTable.id, existing[0].id))
                .returning();
            results.push(updated);
        }
        else {
            const [inserted] = await db_1.db.insert(schema_1.attendanceTable).values({ studentId, teacherId, date }).returning();
            results.push(inserted);
        }
    }
    return res.json(results);
});
exports.default = router;
