"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const schema_1 = require("../schema");
const drizzle_orm_1 = require("drizzle-orm");
const crypto_1 = __importDefault(require("crypto"));
const router = (0, express_1.Router)();
function hashPassword(password) {
    return crypto_1.default.createHash("sha256").update(password + "edugen_salt").digest("hex");
}
function generateTeacherCode() {
    return "TCH" + Math.random().toString(36).substring(2, 8).toUpperCase();
}
function sanitizeUser(user) {
    const { passwordHash, aiApiKey, ...rest } = user;
    return { ...rest, aiApiKey: aiApiKey ? "***" : null };
}
router.post("/register", async (req, res) => {
    const { name, email, password, role, grade, division, board, subject, school, teacherCode } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "validation_error", message: "Name, email, password and role are required" });
    }
    const existing = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email)).limit(1);
    if (existing.length > 0) {
        return res.status(400).json({ error: "email_taken", message: "Email already registered" });
    }
    let resolvedTeacherId = null;
    if (role === "student" && teacherCode) {
        const teacher = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.teacherCode, teacherCode)).limit(1);
        if (teacher.length > 0) {
            resolvedTeacherId = teacher[0].id;
        }
    }
    const [user] = await db_1.db.insert(schema_1.usersTable).values({
        name,
        email,
        passwordHash: hashPassword(password),
    }).returning();
    req.session = { userId: user.id };
    return res.status(201).json({ user: sanitizeUser(user), message: "Registered successfully" });
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "validation_error", message: "Email and password required" });
    }
    const [user] = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email)).limit(1);
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
    const [user] = await db_1.db.select().from(schema_1.usersTable).where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, req.session.userId)).limit(1);
    if (!user) {
        return res.status(401).json({ error: "unauthorized", message: "User not found" });
    }
    return res.json(sanitizeUser(user));
});
exports.default = router;
