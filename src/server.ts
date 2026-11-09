
import "dotenv/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = Number(process.env.PORT || 5050);

const httpServer = createServer(app);

// Initialize Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  },
});

// Handle real-time connections
io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Send welcome message to connected client
  socket.emit("connection:ready", {
    message: "Connected to SiamHub WMS",
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start Express and Socket.IO server
httpServer.listen(PORT, () => {
  console.log(
    `SiamHub WMS Backend running at http://localhost:${PORT}`
  );
});
