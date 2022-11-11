import { GithubUserBody } from "server/interfaces/user/github/github-user-body.interface";
import { UpdateUserReq } from "server/interfaces/user/update-user-req.interface";
import { UserDocument } from "server/interfaces/user/user-document.interface";
import User from "server/models/User";
import { RegisterUserBody } from "types/auth/register-user-body.interface";

export async function createUser(userBody: RegisterUserBody) {
  const newUser = new User(userBody);
  const savedUser: UserDocument = await newUser.save();
  if (savedUser) {
    const { _id, fullname, tokenVersion } = savedUser;
    return { _id, fullname, tokenVersion };
  }
  throw new Error("Failed to create a user!");
}

export async function createGithubUser(githubUserBody: GithubUserBody) {
  const newUser = new User(githubUserBody);
  const savedUser: UserDocument = await newUser.save();
  if (savedUser) {
    return savedUser;
  }
  throw new Error("Failed to authenticate with Github!");
}

export async function incrementTokenVersion(id: string) {
  const updatedUser = await User.findByIdAndUpdate(id, { $inc: { tokenVersion: 1 } }, { new: true });
  if (updatedUser) {
    return true;
  }

  throw new Error("Failed to increment token version");
}

export async function getUserById(id: string) {
  const user: Omit<UserDocument, 'password'> | null = await User.findById(id, { password: 0 });
  return user;
}

export async function getUserByEmail(email: string) {
  const user: UserDocument | null = await User.findOne({ email });
  return user;
}

export async function getUserByGithubId(githubId: string) {
  const user: Omit<UserDocument, 'password'> | null = await User.findOne({ githubUserId: String(githubId) });
  return user;
}

export async function updateUser(id: string, userBody: UpdateUserReq) {
  const updatedUser = await User.findByIdAndUpdate(id, userBody, { new: true, select: { password: 0 } });
  if (updatedUser) {
    return updatedUser;
  }

  throw new Error("Failed to update a user!");
}
