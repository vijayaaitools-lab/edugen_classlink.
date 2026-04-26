import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import usersRouter from "./users";
import lessonsRouter from "./lessons";
import attendanceRouter from "./attendance";
import progressRouter from "./progress";
import badgesRouter from "./badges";
import quizzesRouter from "./quizzes";
import topicsRouter from "./topics";
import dashboardRouter from "./dashboard";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/lessons", lessonsRouter);
router.use("/attendance", attendanceRouter);
router.use("/progress", progressRouter);
router.use("/badges", badgesRouter);
router.use("/quizzes", quizzesRouter);
router.use("/topics", topicsRouter);
router.use("/dashboard", dashboardRouter);

export default router;
