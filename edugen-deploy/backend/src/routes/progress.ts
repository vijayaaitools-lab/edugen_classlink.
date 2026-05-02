import { Router } from "express";
import { db } from "../db";
import { progressTable } from "../schema";
import { eq, and } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/", requireAuth, async (req, res) => {
  const { studentId, subject } = req.query as Record<string, string>;

  const conditions: any[] = [];
  if (studentId) conditions.push(eq(progressTable.studentId, parseInt(studentId)));
  else conditions.push(eq(progressTable.studentId, req.session!.userId));
  if (subject) conditions.push(eq(progressTable.subject, subject));

  const records = await db.select().from(progressTable).where(and(...conditions));
  return res.json(records);
});

router.post("/", requireAuth, async (req, res) => {
  const { subject, topic, score, gamesPlayed, lessonsCompleted, quizzesCompleted } = req.body;
  const studentId = req.session!.userId;

  const existing = await db.select().from(progressTable)
    .where(and(eq(progressTable.studentId, studentId), eq(progressTable.subject, subject)))
    .limit(1);

  if (existing.length > 0) {
    const current = existing[0];
    const updates: any = {
      updatedAt: new Date(),
    };
    if (score !== undefined) updates.score = String(score);
    if (topic !== undefined) updates.topic = topic;
    if (gamesPlayed !== undefined) updates.gamesPlayed = (current.gamesPlayed || 0) + gamesPlayed;
    if (lessonsCompleted !== undefined) updates.lessonsCompleted = (current.lessonsCompleted || 0) + lessonsCompleted;
    if (quizzesCompleted !== undefined) updates.quizzesCompleted = (current.quizzesCompleted || 0) + quizzesCompleted;

    const [updated] = await db.update(progressTable).set(updates).where(eq(progressTable.id, current.id)).returning();
    return res.json(updated);
  } else {
    const [created] = await db.insert(progressTable).values({
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

export default router;
