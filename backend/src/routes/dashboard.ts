import { Router } from "express";
import { db, usersTable, lessonsTable, attendanceTable, progressTable, badgesTable, topicsTable, lessonViewsTable } from "../db";
import { eq, and, desc, count, sql } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/teacher", requireAuth, async (req, res) => {
  const teacherId = req.session!.userId;
  const today = new Date().toISOString().split("T")[0];

  const [studentsResult] = await db.select({ count: count() }).from(usersTable)
    .where(and(eq(usersTable.role, "student"), eq(usersTable.teacherId, teacherId)));

  const [lessonsResult] = await db.select({ count: count() }).from(lessonsTable)
    .where(eq(lessonsTable.teacherId, teacherId));

  const [publishedResult] = await db.select({ count: count() }).from(lessonsTable)
    .where(and(eq(lessonsTable.teacherId, teacherId), eq(lessonsTable.published, true)));

  const todayAttendance = await db.select({ att: attendanceTable, student: usersTable })
    .from(attendanceTable)
    .leftJoin(usersTable, eq(attendanceTable.studentId, usersTable.id))
    .where(and(eq(attendanceTable.teacherId, teacherId), eq(attendanceTable.date, today)));

  const todayAbsent = todayAttendance.filter(r => r.att.status === "absent").length;

  const recentLessons = await db.select().from(lessonsTable)
    .where(eq(lessonsTable.teacherId, teacherId))
    .orderBy(desc(lessonsTable.createdAt))
    .limit(5);

  // Subject breakdown
  const allLessons = await db.select().from(lessonsTable)
    .where(eq(lessonsTable.teacherId, teacherId));
  const subjectCounts: Record<string, number> = {};
  for (const l of allLessons) {
    subjectCounts[l.subject] = (subjectCounts[l.subject] || 0) + 1;
  }
  const subjectBreakdown = Object.entries(subjectCounts).map(([subject, cnt]) => ({ subject, count: cnt }));

  // Lesson access rate
  const publishedLessons = allLessons.filter(l => l.published);
  let accessCount = 0;
  if (publishedLessons.length > 0) {
    const views = await db.select().from(lessonViewsTable);
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
  const studentId = req.session!.userId;

  // Get student info
  const [student] = await db.select().from(usersTable).where(eq(usersTable.id, studentId)).limit(1);
  if (!student) return res.status(404).json({ error: "not_found" });

  // Get published lessons from teacher
  let recentLessons: any[] = [];
  let missedLessons: any[] = [];

  if (student.teacherId) {
    const lessons = await db.select().from(lessonsTable)
      .where(and(eq(lessonsTable.teacherId, student.teacherId), eq(lessonsTable.published, true)))
      .orderBy(desc(lessonsTable.publishedAt))
      .limit(20);

    const views = await db.select().from(lessonViewsTable).where(eq(lessonViewsTable.studentId, studentId));
    const viewedIds = new Set(views.map(v => v.lessonId));

    recentLessons = lessons.slice(0, 5);
    missedLessons = lessons.filter(l => !viewedIds.has(l.id)).slice(0, 10);
  }

  const badges = await db.select().from(badgesTable).where(eq(badgesTable.studentId, studentId));
  const progress = await db.select().from(progressTable).where(eq(progressTable.studentId, studentId));

  const overallScore = progress.length > 0
    ? progress.reduce((sum, p) => sum + parseFloat(p.score || "0"), 0) / progress.length
    : 0;

  // Recommended topics
  const recommendedTopics = await db.select().from(topicsTable)
    .where(eq(topicsTable.grade, student.grade || "1"))
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

export default router;
