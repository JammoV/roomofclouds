import type { FC } from 'react'

interface CenteredHeaderProps {
    title: string
}

const CenteredHeader: FC<CenteredHeaderProps> = ({ title }) => (
    <div className="font-yuji text-4xl text-grey text-center mb-4">{title}</div>
)

export default CenteredHeader
