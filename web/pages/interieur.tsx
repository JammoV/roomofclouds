import { Box, Typography } from '@mui/material'
import React from 'react'

import CenteredHeader from '../components/CenteredHeader'

const Interieur: React.VFC = () => {
    return (
        <Box sx={{ minHeight: '50vh' }}>
            <CenteredHeader title="Interieurportfolio" />
            <Typography sx={{ textAlign: 'center' }}>
                Binnenkort beschikbaar!
            </Typography>
        </Box>
    )
}

export default Interieur
