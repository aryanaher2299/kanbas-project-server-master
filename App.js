import express from "express";
import Hello from "./Hello.js";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import session from "express-session";
import CourseRoutes from "./Kanbas/Courses/routes.js";
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import UserRoutes from "./Users/routes.js";
import QuizRoutes from "./Kanbas/Quizzes/routes.js";
import QuizQuestionRoutes from "./Kanbas/Quizzes/QuizQuestions/routes.js";
import QuizPreviewRoutes from "./Kanbas/Quizzes/QuizPreview/routes.js";

const MONGO_CONNECTION_STRING = "mongodb://127.0.0.1:27017/kanbas";
const DB_NAME = "kanbas";

mongoose.connect(MONGO_CONNECTION_STRING, { dbName: DB_NAME });

const app = express();

const secret = process.env.SESSION_SECRET || "kanbas";

app.use(
  cors({
    credentials: true,
    origin: process.env.NETLIFY_URL,
  })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));
app.use(express.json());
UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Hello(app);
QuizRoutes(app);
QuizQuestionRoutes(app);
QuizPreviewRoutes(app);
app.listen(process.env.PORT || 4000);
