import { createContext } from 'react';

export type ThemeType = 'light' | 'dark';

// 為了讓其他畫面也能「改變」主題，Context 必須同時廣播「目前的值」與「修改的函式」
export type ThemeContextType = {
    theme: ThemeType;
    setTheme: (newTheme: ThemeType) => void;
};

// 建立 Context，給予一個預設的安全空殻結構
export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    setTheme: () => { }
});
