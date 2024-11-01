import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import Sidebar from './components/Sidebar/Sidebar'
import ReactQueryProvider from './components/ReactQueryProvider/ReactQueryProvider'

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
})
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
})

export const metadata: Metadata = {
    title: 'Tra cứu điểm thi THPT Quốc gia 2024',
    description: 'Tra cứu điểm thi THPT Quốc gia 2024',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}>
                <ReactQueryProvider>
                    <Sidebar />
                    <main className="flex-1 p-8">{children}</main>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
