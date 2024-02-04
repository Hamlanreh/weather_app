import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/context/Providers';

export const metadata: Metadata = {
  title: 'Weather app | Current and Forecast Information',
  description: 'A weather application with forecast and current weather information of a geographical location with dark mode features',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
