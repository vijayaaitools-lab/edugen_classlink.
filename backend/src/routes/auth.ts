import { Router } from "express";
import { db, usersTable } from "../schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const router = Router();

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password + "edugen_salt").digest("hex");
}

function generateTeacherCode(): string {
  return "TCH" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function sanitizeUser(user: typeof usersTable.$inferSelect) {
  const { passwordHash, aiApiKey, ...rest } = user;
  return { ...rest, aiApiKey: aiApiKey ? "***" : null };
}

router.post("/register", async (req, res) => {
  const { name, email, password, role, grade, division, board, subject, school, teacherCode } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: "validation_error", message: "Name, email, password and role are required" });
  }

  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (existing.length > 0) {
    return res.status(400).json({ error: "email_taken", message: "Email already registered" });
  }

  let resolvedTeacherId: number | null = null;
  if (role === "student" && teacherCode) {
    const teacher = await db.select().from(usersTable).where(eq(usersTable.teacherCode, teacherCode)).limit(1);
    if (teacher.length > 0) {
      resolvedTeacherId = teacher[0].id;
    }
  }

  const [user] = await db.insert(usersTable).values({
    name,
    email,
    passwordHash: hashPassword(password),
    role,
    grade: grade || null,
    division: division || null,
    board: board || null,
    subject: subject || null,
    school: school || null,
    teacherId: resolvedTeacherId,
    teacherCode: role === "teacher" ? generateTeacherCode() : null,
  }).returning();

  req.session = { userId: user.id };
  return res.status(201).json({ user: sanitizeUser(user), message: "Registered successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "validation_error", message: "Email and password required" });
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email)).limit(1);
  if (!user || user.passwordHash !== hashPassword(password)) {
    return res.status(401).json({ error: "invalid_credentials", message: "Invalid email or password" });
  }

  req.session = { userId: user.id };
  return res.json({ user: sanitizeUser(user), message: "Logged in successfully" });
});

router.post("/logout", (req, res) => {
  req.session = null;
  return res.json({ message: "Logged out" });
});

router.get("/me", async (req, res) => {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "unauthorized", message: "Not authenticated" });
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.id, req.session.userId)).limit(1);
  if (!user) {
    return res.status(401).json({ error: "unauthorized", message: "User not found" });
  }

  return res.json(sanitizeUser(user));
});

export default router;
