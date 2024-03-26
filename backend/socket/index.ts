import { Server, ServerOptions } from "socket.io";
import { Server as HttpServer } from "http";

class SocketManager {
  private io: Server;

  constructor(httpServer: HttpServer, opts?: Partial<ServerOptions>) {
    this.io = new Server(httpServer, opts);
  }

  public getIO(): Server {
    if (!this.io) {
      throw new Error("Socket.io not initialized!");
    }
    return this.io;
  }
}

let socketManager: any = null;

export const initializeSocketIO = (httpServer: HttpServer) => {
  if (!socketManager) {
    socketManager = new SocketManager(httpServer);
  }
  return socketManager;
};

export default socketManager;
