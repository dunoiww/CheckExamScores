'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
    const pathName = usePathname()

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/score', label: 'Statistics' },
        { path: '/high-score', label: 'Top Scores' },
    ]

    return (
        <div className="flex min-h-screen">
            <div
                className={`h-full w-64 bg-gray-800 text-white shadow-lg`}
            >
                <nav className="mt-4">
                    <ul>
                        {navItems.map((item) => (
                            <li
                                key={item.path}
                                className={`p-4 hover:bg-gray-700 rounded-lg transition-colors duration-300 ${
                                    pathName === item.path ? 'bg-gray-700 font-bold' : ''
                                }`}
                            >
                                <Link href={item.path}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

export default Sidebar
