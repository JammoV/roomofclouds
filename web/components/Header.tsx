import { Box } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import HomepageHeaderBlock from './HomepageHeaderBlock'

const Header: React.VFC = () => {
    const router = useRouter()

    if (router.pathname === '/') {
        return <HomepageHeaderBlock />
    }

    return (
        <Box
            textAlign="center"
            sx={{
                'img:hover': {
                    cursor: 'pointer',
                },
            }}
        >
            <Link href="/">
                <Box>
                    <Image src="/images/logo.png" width={225} height={169} />
                </Box>
            </Link>
        </Box>
    )
}

export default Header
