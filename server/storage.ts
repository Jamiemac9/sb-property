import { users, callbackRequests, type User, type InsertUser, type CallbackRequest, type InsertCallbackRequest } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createCallbackRequest(request: InsertCallbackRequest): Promise<CallbackRequest>;
  getCallbackRequests(): Promise<CallbackRequest[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private callbackRequests: Map<number, CallbackRequest>;
  private currentUserId: number;
  private currentCallbackId: number;

  constructor() {
    this.users = new Map();
    this.callbackRequests = new Map();
    this.currentUserId = 1;
    this.currentCallbackId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createCallbackRequest(insertRequest: InsertCallbackRequest): Promise<CallbackRequest> {
    const id = this.currentCallbackId++;
    const request: CallbackRequest = { 
      ...insertRequest, 
      id,
      createdAt: new Date()
    };
    this.callbackRequests.set(id, request);
    return request;
  }

  async getCallbackRequests(): Promise<CallbackRequest[]> {
    return Array.from(this.callbackRequests.values());
  }
}

export const storage = new MemStorage();
