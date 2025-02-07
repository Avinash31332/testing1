import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import db from "./config/db.js";
import appointmentRouter from "./routes/appointment.routes.js";
import adminRouter from "./routes/admin.routes.js";
import therapiesRouter from "./routes/therapies.routes.js";
import indexRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();
db();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", // React/Vite frontend
  "http://localhost:5174", // Another frontend (if needed)
  "https://testing1-dsbj.onrender.com", // Production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.send("This is homepage");
});

app.use("/api/appointments", appointmentRouter);
app.use("/api/admin", adminRouter);
app.use("/api/therapies", therapiesRouter);
app.use("/api", indexRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
