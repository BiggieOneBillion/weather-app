import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'weather app',
  description: 'Weather application built using nextjs ',
  generator: 'Next Js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
