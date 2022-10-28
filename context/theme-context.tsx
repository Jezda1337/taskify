import { createContext } from "react";

export type ThemeContextType = { dark: boolean; setDark: Function };
const ThemeContext = createContext({});
export default ThemeContext;
