import { Server, ServerOptions } from "socket.io";
import { Server as HttpServer } from "http";
import { updateUser } from "@/models/user/service";
import { ActiveStatus } from "@/utils/constants";

export default class SocketManager {
  private io: Server;
  private static instance: SocketManager;
  private onlineUsers: Map<string, string> = new Map();

  constructor(httpServer: HttpServer, opts?: Partial<ServerOptions>) {
    this.io = new Server(httpServer, opts);
    this.initateConnection();
  }

  static getInstance(httpServer?: HttpServer, opts?: Partial<ServerOptions>) {
    if (!SocketManager.instance && httpServer) {
      console.log("Creating new instance of SocketManager");
      SocketManager.instance = new SocketManager(httpServer, opts);
    }
    return SocketManager.instance;
  }

  public getIO(): Server {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }
    return this.io;
  }

  private initateConnection() {
    console.log("Initiating socket connection");
    this.io.on("connection", (socket) => {
      // Connect a user to app
      socket.on("connectUser", (userId) => {
        console.log("connect", userId);
        this.setOnlineUsers(userId, socket.id);
      });

      // Join a room
      socket.on("joinRoom", ({ roomId, userId }) => {
        console.log("joinRoom", roomId, userId);
        this.setOnlineUsers(userId, socket.id);
        socket.join(roomId);
      });

      // Leave a room
      socket.on("leaveRoom", ({ roomId, userId }) => {
        console.log("leaveRoom", roomId);
        this.removeOnlineUsers(userId);
        socket.leave(roomId);
      });

      // Send a message to a room
      socket.on("sendMessage", async ({ message }) => {
        const sendUserSocket = this.getOnlineUsers().get(message.recipient);
        console.log(
          "Got message: ",
          message,
          "from: ",
          message.sender,
          "to: ",
          message.recipient,
        );
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("getMessage", {
            message,
          });
        }
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
        const userId = Array.from(this.onlineUsers).find(
          ([key, value]) => value === socket.id,
        );
        if (userId) {
          console.log("Removing user: ", userId[0]);
          this.removeOnlineUsers(userId[0]);
        }
      });
    });
  }

  public getOnlineUsers() {
    return this.onlineUsers;
  }

  public setOnlineUsers(userId: string, socketId: string) {
    updateUser(userId, { status: ActiveStatus.ACTIVE });
    this.onlineUsers.set(userId, socketId);
  }

  public removeOnlineUsers(userId: string) {
    updateUser(userId, { status: ActiveStatus.INACTIVE, lastSeen: new Date() });
    this.onlineUsers.delete(userId);
  }
}

export const initializeSocketIO = (httpServer: HttpServer) => {
  const clientUrl = process.env.CLIENT_URL;
  const socketManager = SocketManager.getInstance(httpServer, {
    cors: {
      origin: clientUrl,
    },
  });
  const port = process.env.SOCKET_PORT;
  httpServer.listen(port, () => {
    console.log("Socket.io listening on PORT ", port);
  });
  return socketManager;
};
