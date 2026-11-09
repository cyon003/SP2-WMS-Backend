
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { prisma } from "./lib/prisma.js";
import { checkAIHealth } from "./services/ai.service.ts";
const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// JSON body parser
app.use(express.json());

// Backend health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "success",
    message: "SiamHub WMS Backend is running",
  });
});

// PostgreSQL health check
app.get("/api/db-health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      status: "success",
      message: "PostgreSQL connected through Prisma",
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(503).json({
      status: "error",
      message: "Database connection failed",
    });
  }
});

app.get("/api/ai-health", async (_req, res) => {
  try {
    const result = await checkAIHealth();

    res.json({
      status: "success",
      service: "AI",
      data: result,
    });
  } catch (error) {
    console.error("AI service error:", error);

    res.status(503).json({
      status: "error",
      message: "AI service unavailable",
    });
  }
});

export default app;
