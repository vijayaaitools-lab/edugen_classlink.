import { Router } from "express";
import { db } from "../db";
import { badgesTable } from "../schema";
import { eq } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/", requireAuth, async (req, res) => {
  const { studentId } = req.query as Record<string, string>;
  const targetId = studentId ? parseInt(studentId) : req.session!.userId;
  const badges = await db.select().from(badgesTable).where(eq(badgesTable.studentId, targetId));
  return res.json(badges);
});

router.post("/", requireAuth, async (req, res) => {
  const { studentId, name, description, icon, category } = req.body;
  if (!studentId || !name || !icon) {
    return res.status(400).json({ error: "validation_error", message: "studentId, name and icon required" });
  }

  const [badge] = await db.insert(badgesTable).values({
    studentId,
    name,
    description: description || null,
    icon,
    category: category || null,
  }).returning();

  return res.status(201).json(badge);
});

export default router;
