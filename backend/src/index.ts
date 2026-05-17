import "dotenv/config";
import express from "express";
import path from "path";

import app from "./app";
import { logger } from "./lib/logger";
import uploadRoutes from "./routes/upload";
import generateRoutes from "./routes/generate";

const port = Number(process.env.PORT) || 3000;

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use("/api/upload", uploadRoutes);
app.use("/api/generate", generateRoutes);
app.listen(port, () => {
  logger.info({ port }, "EduGen ClassLink API server listening");
});