import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.className} bg-[#222222] px-[max(14px,calc(50%-721px))] text-[24px] leading-[1.2] text-black has-[.popup]:overflow-hidden`}
      >
        {children}
      </body>
    </html>
  )
}
