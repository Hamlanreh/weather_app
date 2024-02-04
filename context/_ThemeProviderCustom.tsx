'use client';
import { useState, createContext, useContext } from "react";

interface IDefaultState {
    theme: string,
    setTheme: (val: string) => void,
}

const defaultState: IDefaultState = {
    theme: '',
    setTheme: () => {},
}

const ThemeContext = createContext<IDefaultState>(defaultState);

export default function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState('light');
    
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
    )
}

export const useThemeContext = () => useContext(ThemeContext); 