import Link from 'next/link'
import type { FC } from 'react'

const menuItems = [
    {
        label: 'Reizen',
        path: '/posts',
        i: 1,
    },
    {
        label: 'Interieur',
        path: '/interieur',
        i: 2,
    },
]

const Navigation: FC = () => (
    <div className="pt-1 pb-1.5 flex flex-row justify-center bg-green-primary">
        {menuItems.map((item) => (
            <div key={item.i} className="py-4 px-4 font-yuji">
                <Link href={item.path}>
                    <a className="text-white text-lg hover:underline">
                        {item.label}
                    </a>
                </Link>
            </div>
        ))}
    </div>
)

export default Navigation
