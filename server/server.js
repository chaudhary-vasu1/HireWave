import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

const PORT = process.env.PORT || 3000;

// db connection
await connectDB()

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://hire-wave-tawny.vercel.app',
  'https://hirewave-client.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(express.json());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true);
    }
  },
  credentials: true
}));

app.get('/', (req, res) => {
  res.send("Server is live");
})
app.use('/api/users', userRouter);
app.use('/api/resumes', resumeRouter);
app.use('/api/resume', resumeRouter);
app.use('/api/ai', aiRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`)
})