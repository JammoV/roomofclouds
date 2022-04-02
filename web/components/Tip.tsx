import { Box } from '@mui/material'
import Image from 'next/image'
import React from 'react'

enum Type {
    GENERAL = 'general',
    FOOD = 'food',
    DRINKS = 'drinks',
    ACTIVITY = 'activity',
    ACCOMMODATION = 'accommodation',
}

interface TipProps {
    type: Type
    text: string
}

const Tip: React.VFC<TipProps> = ({ text, type }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                ml: 2,
                mb: 2,
                alignItems: 'center',
            }}
        >
            <Box sx={{ minWidth: '50px' }}>
                <Image
                    src={`/images/icons/tip_${type}.png`}
                    width={50}
                    height={50}
                />
            </Box>
            <Box sx={{ fontSize: '1.2rem', ml: 2 }}>{text}</Box>
        </Box>
    )
}

export default Tip
