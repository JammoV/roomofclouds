import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import Container from '@/atoms/Container'
import HomepageHeaderBlock from '@/molecules/HomepageHeaderBlock'

const Header: FC = () => {
    const router = useRouter()

    if (router.pathname === '/') {
        return (
            <Container>
                <HomepageHeaderBlock />
            </Container>
        )
    }

    return (
        <div className="text-center">
            <Link href="/" className="hover:cursor-pointer" passHref>
                <a>
                    <Image
                        src="/images/logo.png"
                        width={225}
                        height={169}
                        alt="Back to home"
                    />
                </a>
            </Link>
        </div>
    )
}

export default Header
