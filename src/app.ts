import "dotenv/config";
import http from "http";
import express from "express";
import { Server } from "socket.io";
import cors from "cors";
import { router } from "./routes";

const app = express();
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) =>
  console.log(`Usúario conectado no socket ${socket.id}`)
);

app.use(cors());
app.use(express.json());

app.use(router);

export { serverHttp, io };
