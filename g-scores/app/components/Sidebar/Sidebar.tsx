'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { IconButton, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Sidebar = () => {
    const pathName = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    const navItems = [
        { path: '/', label: 'Tra cứu' },
        { path: '/score', label: 'Thống kê theo môn' },
        { path: '/high-score', label: 'Top điểm cao' },
    ]

    const toggleSidebar = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className="flex min-h-screen">
            <div className={`h-full bg-gray-800 text-white shadow-lg ${isOpen ? 'w-64' : 'w-0'} md:w-64 transition-all duration-300 overflow-hidden`}>
                <nav className={`mt-12 ${isOpen ? 'block' : 'hidden'} md:block`}>
                    <Typography variant="h1" className="text-4xl font-bold text-center">G-Scores</Typography>
                    <ul>
                        {navItems.map((item) => (
                            <li
                                key={item.path}
                                className={`p-4 mb-1 hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
                                    pathName === item.path ? 'bg-gray-700 font-bold' : ''
                                }`}
                            >
                                <Link href={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className="flex-1 p-4">
                <IconButton
                    className="md:hidden"
                    onClick={toggleSidebar}
                    sx={{ position: 'absolute', top: 16, left: 16, zIndex: 10 }}
                >
                    {isOpen ? <CloseIcon sx={{color: 'white'}}/> : <MenuIcon />}
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar