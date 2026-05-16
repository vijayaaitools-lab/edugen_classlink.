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
    const { grade, subject, board, published, teacherId } = req.query;
    let query = db_1.db.select({ lesson: schema_1.lessonsTable, teacher: schema_1.usersTable }).from(schema_1.lessonsTable)
        .leftJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, schema_1.usersTable.id));
    const conditions = [];
    if (grade)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.lessonsTable.grade, grade));
    if (subject)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.lessonsTable.subject, subject));
    if (board)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.lessonsTable.board, board));
    if (published !== undefined)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.lessonsTable.published, published === "true"));
    if (teacherId)
        conditions.push((0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, parseInt(teacherId)));
    const results = conditions.length > 0
        ? await query.where((0, drizzle_orm_1.and)(...conditions)).orderBy((0, drizzle_orm_1.desc)(schema_1.lessonsTable.createdAt))
        : await query.orderBy((0, drizzle_orm_1.desc)(schema_1.lessonsTable.createdAt));
    return res.json(results.map(r => ({
        ...r.lesson,
        teacher: r.teacher ? { id: r.teacher.id, name: r.teacher.name, email: r.teacher.email } : null
    })));
});
router.post("/", requireAuth, async (req, res) => {
    const { title, subject, grade, topic } = req.body;
    if (!title || !subject || !grade || !topic) {
        return res.status(400).json({ error: "validation_error", message: "Title, subject, grade and topic required" });
    }
    const [lesson] = await db_1.db.insert(schema_1.lessonsTable).values({
        title,
        subject,
        grade,
        topic,
        teacherId: req.session.userId,
    }).returning();
    return res.status(201).json(lesson);
});
router.get("/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const [result] = await db_1.db.select({ lesson: schema_1.lessonsTable, teacher: schema_1.usersTable })
        .from(schema_1.lessonsTable)
        .leftJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, schema_1.usersTable.id))
        .where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.id, id))
        .limit(1);
    if (!result)
        return res.status(404).json({ error: "not_found" });
    const views = await db_1.db.select().from(schema_1.lessonViewsTable).where((0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.lessonId, id));
    const teacher = result.lesson.teacherId;
    const students = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.usersTable.role, "student"), (0, drizzle_orm_1.eq)(schema_1.usersTable.teacherId, teacher)));
    return res.json({
        ...result.lesson,
        teacher: result.teacher ? { id: result.teacher.id, name: result.teacher.name } : null,
        accessCount: views.length,
        totalStudents: students.length,
    });
});
router.patch("/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, subject, grade, division, board, topic, description, content, videoUrl, resourceUrls, lessonDate, published } = req.body;
    const updates = {};
    if (title !== undefined)
        updates.title = title;
    if (subject !== undefined)
        updates.subject = subject;
    if (grade !== undefined)
        updates.grade = grade;
    if (division !== undefined)
        updates.division = division;
    if (board !== undefined)
        updates.board = board;
    if (topic !== undefined)
        updates.topic = topic;
    if (description !== undefined)
        updates.description = description;
    if (content !== undefined)
        updates.content = content;
    if (videoUrl !== undefined)
        updates.videoUrl = videoUrl;
    if (resourceUrls !== undefined)
        updates.resourceUrls = resourceUrls;
    if (lessonDate !== undefined)
        updates.lessonDate = lessonDate;
    if (published !== undefined)
        updates.published = published;
    const [lesson] = await db_1.db.update(schema_1.lessonsTable).set(updates).where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.id, id)).returning();
    return res.json(lesson);
});
router.delete("/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    await db_1.db.delete(schema_1.lessonViewsTable).where((0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.lessonId, id));
    await db_1.db.delete(schema_1.lessonsTable).where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.id, id));
    return res.json({ message: "Lesson deleted" });
});
router.post("/:id/publish", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const [lesson] = await db_1.db.update(schema_1.lessonsTable)
        // cast to any because drizzle's generated types may not include 'published' in the partial update type
        .set({ published: true })
        .where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.id, id))
        .returning();
    return res.json(lesson);
});
router.get("/:id/access", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const views = await db_1.db.select({ view: schema_1.lessonViewsTable, student: schema_1.usersTable })
        .from(schema_1.lessonViewsTable)
        .leftJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.studentId, schema_1.usersTable.id))
        .where((0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.lessonId, id));
    return res.json(views.map(v => ({
        studentId: v.view.studentId,
        studentName: v.student?.name || "Unknown",
        accessedAt: v.view.viewedAt,
        viewed: v.view.viewed,
    })));
});
router.post("/:id/viewed", requireAuth, async (req, res) => {
    const lessonId = parseInt(req.params.id);
    const studentId = req.session.userId;
    const existing = await db_1.db.select().from(schema_1.lessonViewsTable)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.lessonId, lessonId), (0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.studentId, studentId)))
        .limit(1);
    if (existing.length === 0) {
        await db_1.db.insert(schema_1.lessonViewsTable).values({ lessonId, studentId });
    }
    return res.json({ message: "Marked as viewed" });
});
exports.default = router;
