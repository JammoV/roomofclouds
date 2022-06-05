import type { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => (
    <div className="px-4 max-w-[900px] mx-auto">{children}</div>
)

export default Container
