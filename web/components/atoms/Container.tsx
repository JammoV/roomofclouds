import type { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
    containerWidth?: string
}

const Container: FC<ContainerProps> = ({ children, containerWidth = 'md' }) => (
    <div
        className={`px-4 mx-auto ${
            containerWidth === 'md' ? 'max-w-[900px]' : 'max-w-[1200px]'
        }`}
    >
        {children}
    </div>
)

export default Container
