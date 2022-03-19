import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import React from 'react'

import client from '../client'

export interface Image {
    src: string
    title?: string
    subtitle?: string
}

interface ImageGalleryProps {
    images: Image[]
    imgWidth: number
    imgHeight: number
}

function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
}

const ImageGalleryInline: React.VFC<ImageGalleryProps> = ({
    images,
    imgWidth,
    imgHeight,
}) => {
    return (
        <ImageList
            sx={{
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
            }}
            rowHeight={'auto'}
            gap={5}
        >
            {images.map((image, i) => {
                const cols = images.length
                const rows = 1
                return (
                    <ImageListItem key={i} cols={cols} rows={rows}>
                        <img
                            src={urlFor(image.src)
                                .width(imgWidth)
                                .height(imgHeight)
                                .quality(100)
                                .url()}
                            alt={''}
                            loading="lazy"
                        />
                        {image.title && (
                            <ImageListItemBar
                                title={image.title}
                                subtitle={image.subtitle}
                            />
                        )}
                    </ImageListItem>
                )
            })}
        </ImageList>
    )
}

export default ImageGalleryInline
