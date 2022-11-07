import { createContext } from "react";
import { UserProfile } from "types/auth/user-profile.type";

export type NavContextType = { dark: boolean; setDark: Function; user?: UserProfile };
const NavContext = createContext({});
export default NavContext;
