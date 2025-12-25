import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { FavoritesProvider } from '@/lib/favorites-context'
import { ComparisonProvider } from '@/lib/comparison-context'

export const metadata: Metadata = {
  title: 'Weather Forecast',
  description: 'Get accurate weather forecasts for any location',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <FavoritesProvider>
            <ComparisonProvider>
              {children}
            </ComparisonProvider>
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
