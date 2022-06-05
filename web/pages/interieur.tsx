import type { FC } from 'react'

import CenteredHeader from '@/atoms/CenteredHeader'
import GenericTemplate from '@/templates/Generic'

const Interieur: FC = () => {
    return (
        <GenericTemplate>
            <CenteredHeader title="Interieurportfolio" />
            <div className="text-center">Binnenkort beschikbaar!</div>
        </GenericTemplate>
    )
}

export default Interieur
