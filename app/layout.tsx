import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MuiThemeProvider from './MuiThemeProvider'
import { NextIntlClientProvider } from 'next-intl'
import messages from '@/messages/ja.json'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: messages.Layout.title,
  description: messages.Layout.description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextIntlClientProvider locale="ja" messages={messages}>
          <MuiThemeProvider>
            {children}
          </MuiThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}