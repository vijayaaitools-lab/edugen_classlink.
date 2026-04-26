import { Router } from "express";
import { db, topicsTable } from "../schema";
import { eq, and, ilike } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/", requireAuth, async (req, res) => {
  const { grade, subject, board, search } = req.query as Record<string, string>;

  const conditions: any[] = [];
  if (grade) conditions.push(eq(topicsTable.grade, grade));
  if (subject) conditions.push(eq(topicsTable.subject, subject));
  if (board) conditions.push(eq(topicsTable.board, board));
  if (search) conditions.push(ilike(topicsTable.title, `%${search}%`));

  const topics = conditions.length > 0
    ? await db.select().from(topicsTable).where(and(...conditions))
    : await db.select().from(topicsTable);

  return res.json(topics);
});

export default router;
