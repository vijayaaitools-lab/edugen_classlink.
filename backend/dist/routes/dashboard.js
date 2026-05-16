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
router.get("/teacher", requireAuth, async (req, res) => {
    const teacherId = req.session.userId;
    const today = new Date().toISOString().split("T")[0];
    const [studentsResult] = await db_1.db.select({ count: (0, drizzle_orm_1.count)() }).from(schema_1.usersTable)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.usersTable.role, "student"), (0, drizzle_orm_1.eq)(schema_1.usersTable.teacherId, teacherId)));
    const [lessonsResult] = await db_1.db.select({ count: (0, drizzle_orm_1.count)() }).from(schema_1.lessonsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, teacherId));
    const [publishedResult] = await db_1.db.select({ count: (0, drizzle_orm_1.count)() }).from(schema_1.lessonsTable)
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, teacherId), (0, drizzle_orm_1.eq)(schema_1.lessonsTable.published, true)));
    const todayAttendance = await db_1.db.select({ att: schema_1.attendanceTable, student: schema_1.usersTable })
        .from(schema_1.attendanceTable)
        .leftJoin(schema_1.usersTable, (0, drizzle_orm_1.eq)(schema_1.attendanceTable.studentId, schema_1.usersTable.id))
        .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.attendanceTable.teacherId, teacherId), (0, drizzle_orm_1.eq)(schema_1.attendanceTable.date, today)));
    const todayAbsent = todayAttendance.filter(r => r.att.status === "absent").length;
    const recentLessons = await db_1.db.select().from(schema_1.lessonsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, teacherId))
        .orderBy((0, drizzle_orm_1.desc)(schema_1.lessonsTable.createdAt))
        .limit(5);
    // Subject breakdown
    const allLessons = await db_1.db.select().from(schema_1.lessonsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, teacherId));
    const subjectCounts = {};
    for (const l of allLessons) {
        subjectCounts[l.subject] = (subjectCounts[l.subject] || 0) + 1;
    }
    const subjectBreakdown = Object.entries(subjectCounts).map(([subject, cnt]) => ({ subject, count: cnt }));
    // Lesson access rate
    const publishedLessons = allLessons.filter(l => l.published);
    let accessCount = 0;
    if (publishedLessons.length > 0) {
        const views = await db_1.db.select().from(schema_1.lessonViewsTable);
        accessCount = views.length;
    }
    const totalStudents = studentsResult.count;
    const lessonAccessRate = publishedLessons.length > 0 && totalStudents > 0
        ? Math.min(100, (accessCount / (publishedLessons.length * totalStudents)) * 100)
        : 0;
    return res.json({
        totalStudents,
        totalLessons: lessonsResult.count,
        publishedLessons: publishedResult.count,
        todayAbsent,
        lessonAccessRate: Math.round(lessonAccessRate),
        recentLessons,
        attendanceToday: todayAttendance.map(r => ({
            ...r.att,
            student: r.student ? { id: r.student.id, name: r.student.name, grade: r.student.grade, division: r.student.division } : null,
        })),
        subjectBreakdown,
    });
});
router.get("/student", requireAuth, async (req, res) => {
    const studentId = req.session.userId;
    // Get student info
    const [student] = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, studentId)).limit(1);
    if (!student)
        return res.status(404).json({ error: "not_found" });
    // Get published lessons from teacher
    let recentLessons = [];
    let missedLessons = [];
    if (student.teacherId) {
        const lessons = await db_1.db.select().from(schema_1.lessonsTable)
            .where((0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(schema_1.lessonsTable.teacherId, student.teacherId), (0, drizzle_orm_1.eq)(schema_1.lessonsTable.published, true)))
            .orderBy((0, drizzle_orm_1.desc)(schema_1.lessonsTable.publishedAt))
            .limit(20);
        const views = await db_1.db.select().from(schema_1.lessonViewsTable).where((0, drizzle_orm_1.eq)(schema_1.lessonViewsTable.studentId, studentId));
        const viewedIds = new Set(views.map(v => v.lessonId));
        recentLessons = lessons.slice(0, 5);
        missedLessons = lessons.filter(l => !viewedIds.has(l.id)).slice(0, 10);
    }
    const badges = await db_1.db.select().from(schema_1.badgesTable).where((0, drizzle_orm_1.eq)(schema_1.badgesTable.studentId, studentId));
    const progress = await db_1.db.select().from(schema_1.progressTable).where((0, drizzle_orm_1.eq)(schema_1.progressTable.studentId, studentId));
    const overallScore = progress.length > 0
        ? progress.reduce((sum, p) => sum + parseFloat(p.score || "0"), 0) / progress.length
        : 0;
    // Recommended topics
    const recommendedTopics = await db_1.db.select().from(schema_1.topicsTable)
        .where((0, drizzle_orm_1.eq)(schema_1.topicsTable.grade, student.grade || "1"))
        .limit(6);
    return res.json({
        missedLessons,
        recentLessons,
        badges,
        progress,
        totalBadges: badges.length,
        overallScore: Math.round(overallScore),
        streak: 0, // simplified
        recommendedTopics,
    });
});
exports.default = router;
