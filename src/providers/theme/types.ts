import { Dispatch, SetStateAction } from "react";
import { THEMES } from "./constants";

export type ThemeName = keyof (typeof THEMES)[keyof typeof THEMES];

export interface ThemeContextType {
  selectedTheme: ThemeName;
  setSelectedTheme: Dispatch<SetStateAction<ThemeName>>;
}
