import { Router } from "express";
import { db } from "../db";
import { lessonsTable, usersTable, lessonViewsTable } from "../schema";
import { eq, and, desc } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/", requireAuth, async (req, res) => {
  const { grade, subject, board, published, teacherId } = req.query as Record<string, string>;

  let query = db.select({ lesson: lessonsTable, teacher: usersTable }).from(lessonsTable)
    .leftJoin(usersTable, eq(lessonsTable.teacherId, usersTable.id));

  const conditions: any[] = [];
  if (grade) conditions.push(eq(lessonsTable.grade, grade));
  if (subject) conditions.push(eq(lessonsTable.subject, subject));
  if (board) conditions.push(eq(lessonsTable.board, board));
  if (published !== undefined) conditions.push(eq(lessonsTable.published, published === "true"));
  if (teacherId) conditions.push(eq(lessonsTable.teacherId, parseInt(teacherId)));

  const results = conditions.length > 0
    ? await query.where(and(...conditions)).orderBy(desc(lessonsTable.createdAt))
    : await query.orderBy(desc(lessonsTable.createdAt));

  return res.json(results.map(r => ({
    ...r.lesson,
    teacher: r.teacher ? { id: r.teacher.id, name: r.teacher.name, email: r.teacher.email } : null
  })));
});

router.post("/", requireAuth, async (req, res) => {
  const { title, subject, grade, division, board, topic, description, content, videoUrl, resourceUrls, lessonDate } = req.body;

  if (!title || !subject || !grade || !topic) {
    return res.status(400).json({ error: "validation_error", message: "Title, subject, grade and topic required" });
  }

  const [lesson] = await db.insert(lessonsTable).values({
    teacherId: req.session!.userId,
    title,
    subject,
    grade,
    division: division || null,
    board: board || null,
    topic,
    description: description || null,
    content: content || null,
    videoUrl: videoUrl || null,
    resourceUrls: resourceUrls || [],
    lessonDate: lessonDate || null,
    published: false,
  }).returning();

  return res.status(201).json(lesson);
});

router.get("/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const [result] = await db.select({ lesson: lessonsTable, teacher: usersTable })
    .from(lessonsTable)
    .leftJoin(usersTable, eq(lessonsTable.teacherId, usersTable.id))
    .where(eq(lessonsTable.id, id))
    .limit(1);

  if (!result) return res.status(404).json({ error: "not_found" });

  const views = await db.select().from(lessonViewsTable).where(eq(lessonViewsTable.lessonId, id));
  const teacher = result.lesson.teacherId;
  const students = await db.select().from(usersTable).where(and(
    eq(usersTable.role, "student"),
    eq(usersTable.teacherId, teacher)
  ));

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

  const updates: any = {};
  if (title !== undefined) updates.title = title;
  if (subject !== undefined) updates.subject = subject;
  if (grade !== undefined) updates.grade = grade;
  if (division !== undefined) updates.division = division;
  if (board !== undefined) updates.board = board;
  if (topic !== undefined) updates.topic = topic;
  if (description !== undefined) updates.description = description;
  if (content !== undefined) updates.content = content;
  if (videoUrl !== undefined) updates.videoUrl = videoUrl;
  if (resourceUrls !== undefined) updates.resourceUrls = resourceUrls;
  if (lessonDate !== undefined) updates.lessonDate = lessonDate;
  if (published !== undefined) updates.published = published;

  const [lesson] = await db.update(lessonsTable).set(updates).where(eq(lessonsTable.id, id)).returning();
  return res.json(lesson);
});

router.delete("/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  await db.delete(lessonViewsTable).where(eq(lessonViewsTable.lessonId, id));
  await db.delete(lessonsTable).where(eq(lessonsTable.id, id));
  return res.json({ message: "Lesson deleted" });
});

router.post("/:id/publish", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const [lesson] = await db.update(lessonsTable)
    .set({ published: true, publishedAt: new Date() })
    .where(eq(lessonsTable.id, id))
    .returning();
  return res.json(lesson);
});

router.get("/:id/access", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const views = await db.select({ view: lessonViewsTable, student: usersTable })
    .from(lessonViewsTable)
    .leftJoin(usersTable, eq(lessonViewsTable.studentId, usersTable.id))
    .where(eq(lessonViewsTable.lessonId, id));

  return res.json(views.map(v => ({
    studentId: v.view.studentId,
    studentName: v.student?.name || "Unknown",
    accessedAt: v.view.viewedAt,
    viewed: v.view.viewed,
  })));
});

router.post("/:id/viewed", requireAuth, async (req, res) => {
  const lessonId = parseInt(req.params.id);
  const studentId = req.session!.userId;

  const existing = await db.select().from(lessonViewsTable)
    .where(and(eq(lessonViewsTable.lessonId, lessonId), eq(lessonViewsTable.studentId, studentId)))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(lessonViewsTable).values({ lessonId, studentId, viewed: true });
  }

  return res.json({ message: "Marked as viewed" });
});

export default router;
