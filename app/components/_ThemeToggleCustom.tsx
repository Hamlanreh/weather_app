"use client";
import Image from 'next/image';
import Script from 'next/script';
import { useEffect } from 'react';
import { useThemeContext } from '@context/_ThemeProviderCustom';

export default function ThemeToggle() {
    const { theme, setTheme } = useThemeContext();

    const toggleTheme = () => {
        if (theme == 'light') {
            setTheme('dark');
        } else if (theme === 'dark')  {
            setTheme('light');
        }
    }

    const buttonIcon = (theme: string) => {
        switch ( theme ) {
            case 'dark'    : return ( <Image src="/images/light_icon.svg" alt="weather icon" width="30" height="30" /> )
            case 'light'   : return ( <Image src="/images/dark_icon.svg" alt="weather icon" width="30" height="30" /> )         
        }
    }

    const defaultTheme = () => {
        const themeLocalStorage = localStorage.getItem('theme');
        const themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';    
        return ( themeLocalStorage ?? themeSystem )
    }


    useEffect(() => {
        const root: any =  document.querySelector(':root');
        root.dataset.theme = ( theme ?? defaultTheme() );
        localStorage.setItem( 'theme', ( theme ?? defaultTheme() ) );
        setTheme( theme ?? defaultTheme() );

        const useSetTheme = (e: MediaQueryListEvent) => { setTheme( e.matches ? 'dark' : 'light' ) };
        const watchSysTheme = window.matchMedia('(prefers-color-scheme: dark)');
        watchSysTheme.addEventListener( 'change', useSetTheme );

        return () => {
            watchSysTheme.removeEventListener( 'change', useSetTheme )
        }
    }, [theme] )


    return (
        <>
            <Script id="ThemeToggle.tsx" strategy="beforeInteractive" >
                {`
                let themeLocalStorage = localStorage.getItem('theme');
                let themeSystem = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.querySelector(':root').dataset.theme = themeLocalStorage ?? themeSystem;
                `}
            </Script>

            <button key="themeToggle" onClick={toggleTheme}>{buttonIcon(theme)}</button>
        </>
    )
}