import React from "react"
import { ImageList, ImageListItem } from "@mui/material";
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'

interface ImageGalleryProps {
    images: string[];
}

function urlFor (source: string) {
    return imageUrlBuilder(client).image(source)
}


const ImageGallery: React.VFC<ImageGalleryProps> = ({images}) => {
    const imageCount = images.length;
    const unevenImageCounts = [3,5];




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
        const cols = (unevenImageCounts.includes(imageCount) && unevenImageCounts.includes(i + 1)) || imageCount === 1 ? 2 : 1; //item.featured ? 2 : 1;
        const rows = 1; //item.featured ? 2 : 1;

        return (
          <ImageListItem key={i} cols={cols} rows={rows}>
            <img
              src={urlFor(image).width(500 * cols).height(500 * rows).quality(100).url()}
              alt={''}
              loading="lazy"
            />

          </ImageListItem>
        );
      })}

    </ImageList>

    )
};

export default ImageGallery;