import express, { type Express } from "express";
import cors from "cors";
import cookieSession from "cookie-session";
import router from "./routes";

const app: Express = express();

const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL]
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieSession({
  name: "edugen_session",
  secret: process.env.SESSION_SECRET || "change_this_in_production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
}));

app.use("/api", router);

export default app;