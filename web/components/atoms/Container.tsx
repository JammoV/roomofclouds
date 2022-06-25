import type { FC, ReactNode } from 'react'

interface ContainerProps {
    children: ReactNode
}

const Container: FC<ContainerProps> = ({ children }) => (
    <div className="px-4 mx-auto max-w-[900px]">{children}</div>
)

export default Container
