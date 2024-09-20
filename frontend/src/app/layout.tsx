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
    <meta name="viewport" content="width=device-width, initial-scale=1.0 maximum-scale=1, user-scalable=0" />
      <body className={montserrat.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
