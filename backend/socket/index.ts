import { Server, ServerOptions } from "socket.io";
import { Server as HttpServer } from "http";
import { IMessage } from "@/models/message/types";
import { MessageStatus } from "@/utils/constants";
import { createMessage } from "@/models/message/service";

class SocketManager {
  private io: Server;
  private onlineUsers: Map<string, string> = new Map();

  constructor(httpServer: HttpServer, opts?: Partial<ServerOptions>) {
    this.io = new Server(httpServer, opts);
    this.initateConnection();
  }

  public getIO(): Server {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }
    return this.io;
  }

  private initateConnection() {
    this.io.on("connection", (socket) => {
      // Connect a user to app
      socket.on("connectUser", (userId) => {
        console.log("connect", userId);
        this.setOnlineUsers(userId, socket.id);
      });

      // Join a room
      socket.on("joinRoom", (roomId, userId) => {
        console.log("joinRoom", roomId, userId);
        socket.join(roomId);
      });

      // Leave a room
      socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
      });

      // Send a message to a room
      socket.on("sendMessage", ({ senderId, receiverId, message }) => {
        const sendUserSocket = this.getOnlineUsers().get(receiverId);
        if (sendUserSocket) {
          const messageObj: Partial<IMessage> = {
            sender: senderId,
            recipient: receiverId,
            status: MessageStatus.SENT,
            content: message,
          };
          const messageRes = createMessage(messageObj);
          socket.to(sendUserSocket).emit("getMessage", {
            message: messageRes,
          });
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  public getOnlineUsers() {
    return this.onlineUsers;
  }

  public setOnlineUsers(userId: string, socketId: string) {
    if (!this.onlineUsers.has(userId)) {
      this.onlineUsers.set(userId, socketId);
    }
  }
}

let socketManager: any = null;

export const initializeSocketIO = (httpServer: HttpServer) => {
  if (!socketManager) {
    socketManager = new SocketManager(httpServer, {
      cors: {
        origin: "*",
      },
    });
  }
  const port = process.env.SOCKET_PORT;
  httpServer.listen(port, () => {
    console.log("Socket.io listening on PORT ", port);
  });
  return socketManager;
};

export default socketManager as SocketManager;
