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

const ImageGallery: React.VFC<ImageGalleryProps> = ({
    images,
    imgWidth,
    imgHeight,
}) => {
    const imageCount = images.length
    const unevenImageCounts = [3, 5]

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
                const cols =
                    (unevenImageCounts.includes(imageCount) &&
                        unevenImageCounts.includes(i + 1)) ||
                    imageCount === 1
                        ? 2
                        : 1 //item.featured ? 2 : 1;
                const rows = 1 //item.featured ? 2 : 1;
                return (
                    <ImageListItem key={i} cols={cols} rows={rows}>
                        <img
                            src={urlFor(image.src)
                                .width(imgWidth * cols)
                                .height(imgHeight * rows)
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

export default ImageGallery
