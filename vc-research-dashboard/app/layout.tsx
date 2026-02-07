import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VC Research Dashboard',
  description: 'Defense tech and American Dynamism deal tracking',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f]">{children}</body>
    </html>
  )
}
