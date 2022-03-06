import { Box } from '@mui/material'
import Link from 'next/link'
import React from 'react'

const menuItems = [
    {
        label: 'Reisartikelen',
        path: '/posts',
    },
    {
        label: 'Interieurportfolio',
        path: '/interieur',
    },
]

const Navigation: React.VFC = () => (
    <Box
        sx={{
            backgroundColor: '#539EA5',
            pt: 1,
            pb: 1.5,
            mb: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
        }}
    >
        {menuItems.map((item, i: number) => (
            <Box
                key={i}
                sx={{
                    pt: 1,
                    pb: 1,
                    pl: 2,
                    pr: 2,
                    fontSize: '1.2rem',
                    textDecoration: 'none',
                    fontFamily: ['Yuji Syuku', 'serif'].join(','),
                    fontWeight: '400',
                    color: 'white',
                    letterSpacing: '-2px',
                    '& a': {
                        color: 'white',
                        textDecoration: 'none',
                        '&:hover': {
                            textDecoration: 'underline',
                        },
                    },
                }}
            >
                <Link href={item.path}>{item.label}</Link>
            </Box>
        ))}
    </Box>
)

export default Navigation
