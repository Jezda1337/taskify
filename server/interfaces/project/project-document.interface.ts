import { StateDocument } from "../state/state-document.interface";
import { UserDocument } from "../user/user-document.interface";

export interface ProjectDocument {
  _id: string;
  adminId: string;
  name: string;
  taskStates: StateDocument[];
  contributors: UserDocument[];
  userReq: UserDocument[];
  inviteReq: UserDocument[];
}
