import { UserDocument } from "../user/user-document.interface";
import { StateDocument } from "../state/state-document.interface";

export interface ProjectDocument {
  _id: string;
  name: string;
  taskStates: [StateDocument];
  contributors: [UserDocument];
  userReq: [UserDocument];
  inviteReq: [UserDocument];
}
