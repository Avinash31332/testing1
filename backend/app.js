import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/db.js";
import appointmentRouter from "./routes/appointment.routes.js";
import adminRouter from "./routes/admin.routes.js";
import therapiesRouter from "./routes/therapies.routes.js";
import indexRouter from "./routes/index.routes.js";

dotenv.config();
db();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔹 Debugging: Log incoming requests
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// 🔹 Handle CORS properly
app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:5173",
        "http://localhost:5174",
        "https://testing1-dsbj.onrender.com", //admin-frontend
        "https://testing1-user-frontend.onrender.com/", //user-frontend
      ];

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`Blocked by CORS: ${origin}`);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// 🔹 Preflight request handler (CORS fix for `OPTIONS`)
app.options("*", cors(), (req, res) => {
  res.sendStatus(200);
});

// 🔹 Homepage route
app.get("/", (req, res) => {
  res.send("This is the homepage");
});

// 🔹 API Routes
app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/therapies", therapiesRouter);
app.use("/api", indexRouter);

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
