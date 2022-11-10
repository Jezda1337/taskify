import mongoose from 'mongoose';
import { UserDocument } from 'server/interfaces/user/user-document.interface';

const UserSchema = new mongoose.Schema<UserDocument>({
  fullname: {
    type: String,
    require: true,
    min: 2,
    max: 50
  },
  email: {
    type: String,
    require: true,
    max: 50,
    unique: true
  },
  password: {
    type: String,
    min: 6,
  },
  githubUserId: {
    type: String,
    default: '',
  },
  tokenVersion: {
    type: Number,
    default: 0,
  },
  avatar: {
    type: String,
    default: '',
  },
  role: {
    type: String,
    default: "user",
  }
});

export default mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);