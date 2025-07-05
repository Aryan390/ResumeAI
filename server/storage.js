import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.resumes = new Map();
    this.currentUserId = 1;
    this.currentResumeId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
  }

  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByEmail(email) {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser) {
    const id = this.currentUserId++;
    const user = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async createResume(insertResume) {
    const id = this.currentResumeId++;
    const resume = {
      ...insertResume,
      id,
      createdAt: new Date()
    };
    this.resumes.set(id, resume);
    return resume;
  }

  async getResumesByUserId(userId) {
    return Array.from(this.resumes.values()).filter(
      (resume) => resume.userId === userId,
    );
  }

  async deleteResume(id, userId) {
    const resume = this.resumes.get(id);
    if (resume && resume.userId === userId) {
      this.resumes.delete(id);
    }
  }
}

export const storage = new MemStorage();