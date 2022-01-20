import { Typography } from '@mui/material'
import React from 'react'

const Header: React.VFC = () => (
    <Typography
        align="center"
        variant="body1"
        sx={{
            fontSize: '3rem',
            fontFamily: ['Ubuntu', 'serif'].join(','),
            fontWeight: '500',
            color: '#295357',
            marginTop: '1rem',
            marginBottom: '1rem',
        }}
    >
        Room of Clouds
    </Typography>
)

export default Header
