import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Game Plan',
  description: 'Sports game statistics, standings, and predictions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div style={{ marginTop: '100px' }}>
          {children}
        </div>
      </body>
    </html>
  )
}

