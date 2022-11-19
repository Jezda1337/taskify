export interface UserDocument {
  _id: string;
  tokenVersion: number;
  githubUserId?: string;
  fullname: string;
  email: string;
  password: string;
  hasPassword: boolean;
  avatar: string;
  role: "user" | "admin";
}
