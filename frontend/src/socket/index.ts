import { io, Socket, SocketOptions } from "socket.io-client";

export default class SocketManager {
  private static instance: SocketManager;
  private socket: Socket | undefined;

  static getInstance(socketOptions?: SocketOptions): SocketManager {
    if (!SocketManager.instance) {
      SocketManager.instance = new SocketManager();
      const socketUrl = process.env.REACT_APP_SOCKET_URL || "";
      SocketManager.instance.socket = io(socketUrl, socketOptions);
    }
    return SocketManager.instance;
  }

  getSocket() {
    if (!this.socket) {
      throw new Error("Socket is not initialized");
    }
    return this.socket;
  }
}
