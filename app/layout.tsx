import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MuiThemeProvider from './MuiThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '子育てスポット検索',
  description: '授乳室や子供向け施設の検索・投稿サービス',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <MuiThemeProvider>
          {children}
        </MuiThemeProvider>
      </body>
    </html>
  )
}