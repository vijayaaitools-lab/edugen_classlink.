import { Router } from "express";
import { db, usersTable } from "../db";
import { eq, and } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "unauthorized", message: "Not authenticated" });
  }
  next();
}

function sanitizeUser(user: typeof usersTable.$inferSelect) {
  const { passwordHash, aiApiKey, ...rest } = user;
  return { ...rest, aiApiKey: aiApiKey ? "***" : null };
}

router.get("/", requireAuth, async (req, res) => {
  const { role, grade, division } = req.query as Record<string, string>;

  const conditions: any[] = [];
  if (role) conditions.push(eq(usersTable.role, role));
  if (grade) conditions.push(eq(usersTable.grade, grade));
  if (division) conditions.push(eq(usersTable.division, division));

  const users = conditions.length > 0
    ? await db.select().from(usersTable).where(and(...conditions))
    : await db.select().from(usersTable);

  return res.json(users.map(sanitizeUser));
});

router.get("/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
  if (!user) return res.status(404).json({ error: "not_found", message: "User not found" });
  return res.json(sanitizeUser(user));
});

router.patch("/:id", requireAuth, async (req, res) => {
  const id = parseInt(req.params.id);
  if (req.session!.userId !== id) {
    return res.status(403).json({ error: "forbidden", message: "Cannot update other users" });
  }

  const { name, grade, division, board, subject, school, avatarUrl, aiApiKey } = req.body;
  const updates: any = {};
  if (name !== undefined) updates.name = name;
  if (grade !== undefined) updates.grade = grade;
  if (division !== undefined) updates.division = division;
  if (board !== undefined) updates.board = board;
  if (subject !== undefined) updates.subject = subject;
  if (school !== undefined) updates.school = school;
  if (avatarUrl !== undefined) updates.avatarUrl = avatarUrl;
  if (aiApiKey !== undefined) updates.aiApiKey = aiApiKey;

  const [user] = await db.update(usersTable).set(updates).where(eq(usersTable.id, id)).returning();
  return res.json(sanitizeUser(user));
});

export default router;
