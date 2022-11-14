import { CommentDocument } from "../comment/comment-document.interface";
import { UserDocument } from "../user/user-document.interface";

export interface TaskDocument {
  name: string;
  priority: string;
  description: string;
  assignee: UserDocument;
  comments: [CommentDocument];
}
