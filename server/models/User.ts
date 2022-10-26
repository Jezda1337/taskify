import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { 
    type: String, 
    unique: true,
  },
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

export default mongoose.models.User || mongoose.model("User", UserSchema);