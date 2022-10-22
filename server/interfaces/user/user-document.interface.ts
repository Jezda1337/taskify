export interface UserDocument {
  id: string;
  tokenVersion: number;
  githubUserId?: string;
  fullname: string;
  email: string;
  password: string;
  avatar: string;
  role: "user" | "admin";
}