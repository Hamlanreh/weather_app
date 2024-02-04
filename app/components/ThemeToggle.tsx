"use client";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';


export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();    

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else if (theme === 'dark')  {
            setTheme('light');
        }
    }

    const buttonIcon = ( theme: string | undefined ) => {
        switch ( theme ) {
            case 'dark'    : return ( <Image src="/images/light_icon.svg" alt="weather icon" width="35" height="35" /> )
            case 'light'   : return ( <Image src="/images/dark_icon.svg" alt="weather icon" width="35" height="35" /> )         
        }
    }

    const defaultTheme = () => {
        const themeLocalStorage = localStorage.getItem('theme');
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';    
        return ( themeLocalStorage ?? themeSystem )
    }
 
    useEffect(() => {
        setMounted(true);
        setTheme( theme ?? defaultTheme() );
    }, [theme])


    if (!mounted) {
        return null;
    }

    return (
        <>
            <button key="themeToggle" onClick={toggleTheme}>{buttonIcon(theme)}</button>
        </>
    )
}