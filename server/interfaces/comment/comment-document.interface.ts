import { UserDocument } from "../user/user-document.interface";

export interface CommentDocument {
  content: string;
  user: UserDocument;
}
