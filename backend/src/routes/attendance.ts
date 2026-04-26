import { Router } from "express";
import { db, attendanceTable, usersTable } from "../schema";
import { eq, and } from "drizzle-orm";

const router = Router();

function requireAuth(req: any, res: any, next: any) {
  if (!req.session?.userId) return res.status(401).json({ error: "unauthorized" });
  next();
}

router.get("/", requireAuth, async (req, res) => {
  const { date, grade, division, studentId } = req.query as Record<string, string>;

  const conditions: any[] = [];
  if (date) conditions.push(eq(attendanceTable.date, date));
  if (studentId) conditions.push(eq(attendanceTable.studentId, parseInt(studentId)));

  const records = conditions.length > 0
    ? await db.select({ att: attendanceTable, student: usersTable })
        .from(attendanceTable)
        .leftJoin(usersTable, eq(attendanceTable.studentId, usersTable.id))
        .where(and(...conditions))
    : await db.select({ att: attendanceTable, student: usersTable })
        .from(attendanceTable)
        .leftJoin(usersTable, eq(attendanceTable.studentId, usersTable.id));

  return res.json(records.map(r => ({
    ...r.att,
    student: r.student ? { id: r.student.id, name: r.student.name, grade: r.student.grade, division: r.student.division } : null,
  })));
});

router.post("/", requireAuth, async (req, res) => {
  const { date, records } = req.body;
  if (!date || !records || !Array.isArray(records)) {
    return res.status(400).json({ error: "validation_error", message: "date and records array required" });
  }

  const teacherId = req.session!.userId;
  const results = [];

  for (const record of records) {
    const { studentId, status } = record;

    const existing = await db.select().from(attendanceTable)
      .where(and(
        eq(attendanceTable.studentId, studentId),
        eq(attendanceTable.date, date),
        eq(attendanceTable.teacherId, teacherId),
      )).limit(1);

    if (existing.length > 0) {
      const [updated] = await db.update(attendanceTable)
        .set({ status })
        .where(eq(attendanceTable.id, existing[0].id))
        .returning();
      results.push(updated);
    } else {
      const [inserted] = await db.insert(attendanceTable).values({ studentId, teacherId, date, status }).returning();
      results.push(inserted);
    }
  }

  return res.json(results);
});

export default router;
