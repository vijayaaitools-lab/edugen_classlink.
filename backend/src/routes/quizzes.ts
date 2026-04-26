import { Router } from "express";
import { db, quizzesTable, progressTable } from "../db";
import { eq, and } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/", requireAuth, async (req, res) => {
  const { lessonId, grade, subject } = req.query as Record<string, string>;

  const conditions: any[] = [];
  if (lessonId) conditions.push(eq(quizzesTable.lessonId, parseInt(lessonId)));
  if (grade) conditions.push(eq(quizzesTable.grade, grade));
  if (subject) conditions.push(eq(quizzesTable.subject, subject));

  const quizzes = conditions.length > 0
    ? await db.select().from(quizzesTable).where(and(...conditions))
    : await db.select().from(quizzesTable);

  return res.json(quizzes);
});

router.post("/", requireAuth, async (req, res) => {
  const { lessonId, title, subject, grade, topic, questions, timeLimit } = req.body;

  if (!title || !subject || !grade || !topic || !questions) {
    return res.status(400).json({ error: "validation_error", message: "title, subject, grade, topic and questions required" });
  }

  const [quiz] = await db.insert(quizzesTable).values({
    lessonId: lessonId || null,
    teacherId: req.session!.userId,
    title,
    subject,
    grade,
    topic,
    questions,
    timeLimit: timeLimit || null,
  }).returning();

  return res.status(201).json(quiz);
});

router.post("/:id/submit", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const { answers } = req.body;

  const [quiz] = await db.select().from(quizzesTable).where(eq(quizzesTable.id, id)).limit(1);
  if (!quiz) return res.status(404).json({ error: "not_found" });

  const questions = quiz.questions as Array<{ id: number; question: string; options: string[]; correctIndex: number; explanation?: string }>;
  let correct = 0;
  const feedback = questions.map((q, i) => {
    const isCorrect = answers[i] === q.correctIndex;
    if (isCorrect) correct++;
    return { questionId: q.id, correct: isCorrect, explanation: q.explanation };
  });

  const score = questions.length > 0 ? (correct / questions.length) * 100 : 0;
  const passed = score >= 60;

  // Update progress
  const studentId = req.session!.userId;
  const existing = await db.select().from(progressTable)
    .where(and(eq(progressTable.studentId, studentId), eq(progressTable.subject, quiz.subject)))
    .limit(1);

  if (existing.length > 0) {
    await db.update(progressTable).set({
      quizzesCompleted: (existing[0].quizzesCompleted || 0) + 1,
      score: String(Math.max(parseFloat(existing[0].score || "0"), score)),
      updatedAt: new Date(),
    }).where(eq(progressTable.id, existing[0].id));
  } else {
    await db.insert(progressTable).values({
      studentId,
      subject: quiz.subject,
      topic: quiz.topic,
      score: String(score),
      quizzesCompleted: 1,
      gamesPlayed: 0,
      lessonsCompleted: 0,
    });
  }

  return res.json({ score, correct, total: questions.length, passed, feedback });
});

export default router;
