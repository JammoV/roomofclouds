import React from 'react'
import { Typography } from '@mui/material'

const Header: React.VFC = () => (
    <Typography 
        align='center' 
        variant='body1'
        sx={{
            fontSize: '3rem',
            fontFamily: ['Ubuntu', 'serif'].join(','),
            fontWeight: '500',
            marginTop: '1rem',
            marginBottom: '1rem'
        }}
    >
        Room of Clouds
    </Typography>
)

export default Header