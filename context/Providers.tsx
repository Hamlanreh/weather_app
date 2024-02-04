'use client';
import ThemeProvider from './ThemeProvider';
import WeatherProvider from './WeatherProvider';

export function Providers({children} : {children: React.ReactNode}) {
  return (
    <ThemeProvider>
      <WeatherProvider>
        {children}
      </WeatherProvider>
    </ThemeProvider>
  )
}