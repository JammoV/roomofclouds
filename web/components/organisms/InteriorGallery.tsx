import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import Image from 'next/image'
import type { FC } from 'react'
import { useState } from 'react'

import type { SanityAssetExtended } from '@/organisms/Gallery'

import client from '../../client'

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

interface InteriorGalleryProps {
    title: string
    description: string
    images: SanityAssetExtended[]
}

const InteriorGallery: FC<InteriorGalleryProps> = ({
    title,
    description,
    images,
}) => {
    const [mainImage, setMainImage] = useState<SanityAssetExtended>(images[0])

    return (
        <div className="my-12">
            {title && (
                <h2 className="font-yuji text-3xl sm:text-4xl mb-4 sm:mb-6 sm:bg-green-light inline-block sm:p-2 sm:mt-8 break-words">
                    {title}
                </h2>
            )}
            {description && <p className="mb-4 sm:mb-8">{description}</p>}
            <div className="flex flex-col-reverse sm:flex-row mb-6">
                <div className="flex flex-row sm:flex-col sm:w-1/4">
                    {images.map((image) => (
                        <div
                            className={`my-4 mr-4 border-2 hover:border-green-primary hover:cursor-pointer ${
                                image === mainImage
                                    ? 'border-green-primary'
                                    : 'border-white'
                            }`}
                            key={image._key as string}
                            onClick={(): void => setMainImage(image)}
                        >
                            <Image
                                alt={image.alt}
                                title="Bekijk in het groot"
                                width={300}
                                height={150}
                                quality={100}
                                // @ts-ignore
                                src={urlFor(image as string)
                                    .width(300)
                                    .height(150)
                                    .quality(100)
                                    .url()}
                            />
                        </div>
                    ))}
                </div>
                <div className="sm:w-3/4 sm:pl-8">
                    <div className="relative">
                        <h3 className="sm:absolute font-yuji text-xl sm:text-2xl sm:border-b-2 sm:border-b-green-light mt-4 text-right top-0 right-[-20px] bg-green-primary text-white">
                            {mainImage.title}
                        </h3>
                        <img
                            // @ts-ignore
                            src={urlFor(mainImage as string)
                                .width(800)
                                .quality(100)
                                .url()}
                            alt={mainImage.alt}
                            className="float-right border-8 border-green-light"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InteriorGallery
