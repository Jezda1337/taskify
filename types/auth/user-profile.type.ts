import { UserDocument } from "../../server/interfaces/user/user-document.interface";

export type UserProfile = Omit<UserDocument, 'password'>