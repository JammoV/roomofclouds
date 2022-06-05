import type { FC, ReactNode } from 'react'

interface BlockQuoteProps {
    children: ReactNode
}

const BlockQuote: FC<BlockQuoteProps> = ({ children }) => {
    return (
        <div
            className={`bg-green-light border-l-4 p-4 my-4 border-green-primary`}
        >
            {children}
        </div>
    )
}

export default BlockQuote
