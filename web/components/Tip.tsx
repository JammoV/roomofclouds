import Bedtime from '@mui/icons-material/Bedtime'
import LinkedCamera from '@mui/icons-material/LinkedCamera'
import LocalBar from '@mui/icons-material/LocalBar'
import Restaurant from '@mui/icons-material/Restaurant'
import TipsAndUpdates from '@mui/icons-material/TipsAndUpdates'
import { Box } from '@mui/material'
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
    function getIconByType(type: Type) {
        switch (type) {
            case Type.FOOD:
                return <Restaurant fontSize="large" color="primary" />
            case Type.DRINKS:
                return <LocalBar fontSize="large" />
            case Type.ACTIVITY:
                return <LinkedCamera fontSize="large" />
            case Type.ACCOMMODATION:
                return <Bedtime fontSize="large" />
            case Type.GENERAL:
            default:
                return <TipsAndUpdates fontSize="large" color="primary" />
        }
    }

    return (
        <Box
            sx={{
                display: 'flex',
                ml: 2,
                mb: 2,
                alignItems: 'center',
            }}
        >
            {getIconByType(type)}
            <Box sx={{ fontSize: '1.2rem', ml: 2 }}>{text}</Box>
        </Box>
    )
}

export default Tip
