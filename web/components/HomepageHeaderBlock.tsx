import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

import theme from '../styles/theme'

const HomepageHeaderBlock: React.VFC = () => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'row',
            mt: 8,
            mb: 8,
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
        }}
    >
        <Box sx={{ flex: 1 }}>
            <Image src="/images/home_header.jpg" width={424} height={476} />
        </Box>
        <Box
            sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                [theme.breakpoints.down('sm')]: {
                    textAlign: 'center',
                },
            }}
        >
            <Box>
                <Image src="/images/logo.png" width={225} height={169} />
            </Box>
            <Box>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        color: '#3C484B',
                    }}
                >
                    Welkom op Room of Clouds! Ik ben Eline en de
                    verhalenschrijfster achter deze website. Je vindt hier alles
                    wat met reizen te maken heeft: van stedentrips tot verre
                    reizen.
                </Typography>
            </Box>
        </Box>
    </Box>
)

export default HomepageHeaderBlock
