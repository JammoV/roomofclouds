import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { FC, ReactNode } from 'react'

import Container from '@/atoms/Container'
import Header from '@/molecules/Header'
import Navigation from '@/molecules/Navigation'

import client from '../../client'

interface LayoutGenericProps {
    children: ReactNode
    mainImage?: string
    mainImageTitle?: string
    containerWidth?: 'md' | 'lg'
}

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

const GenericTemplate: FC<LayoutGenericProps> = ({
    children,
    mainImage,
    mainImageTitle,
    containerWidth = 'md',
}) => (
    <>
        <Header />
        <Navigation />
        {mainImage && (
            <div className={`max-w-[2400px]`}>
                <img
                    src={urlFor(mainImage).width(2400).height(800).url()}
                    alt={mainImageTitle ?? ''}
                />
            </div>
        )}
        <Container containerWidth={containerWidth}>{children}</Container>
    </>
)

export default GenericTemplate
