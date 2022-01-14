import React from "react"
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import imageUrlBuilder from '@sanity/image-url'
import client from '../client'
import Link from 'next/link'

export interface Image {
  src: string;
  title: string;
  subtitle: string;
  url: string;
}

interface ImageGalleryProps {
    images: Image[];
}

function urlFor (source: string) {
    return imageUrlBuilder(client).image(source)
}


const HomepageImageGallery: React.VFC<ImageGalleryProps> = ({images}) => {
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
        const cols = 1; //item.featured ? 2 : 1;
        const rows = 1; //item.featured ? 2 : 1;
        return (
          <Link href={image.url} key={i}>
            <ImageListItem  cols={cols} rows={rows}>
              <img
                src={urlFor(image.src).width(400 * cols).height(500 * rows).quality(100).url()}
                alt={''}
                loading="lazy"
              />
            
                <ImageListItemBar title={image.title} subtitle={image.subtitle} />
            
            </ImageListItem>
          </Link>
        );
      })}

    </ImageList>

    )
};

export default HomepageImageGallery;