import { Typography } from '@mui/material'
import type { Variant } from '@mui/material/styles/createTypography'
import React from 'react'

interface CenteredHeaderProps {
    title: string
    variant?: Variant
}

const CenteredHeader: React.VFC<CenteredHeaderProps> = ({
    title,
    variant = 'h2',
}) => (
    <Typography
        variant={variant}
        sx={{
            fontFamily: ['Yuji Syuku', 'serif'].join(','),
            fontWeight: '400',
            color: '#3C484B',
            letterSpacing: '-2px',
            textAlign: 'center',
            mb: 4,
        }}
    >
        {title}
    </Typography>
)

export default CenteredHeader
