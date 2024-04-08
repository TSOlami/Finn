import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import './globals.css'
import StoreProvider from './StoreProvider'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Finn',
  description: 'Finn - Your AI Toolbox',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
