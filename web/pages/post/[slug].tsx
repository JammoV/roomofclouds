import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import type { GetStaticProps } from 'next'
import Link from 'next/link'
import React from 'react'
import { Box, Container} from '@mui/material'
import { Post } from '../../api/Types'
import client from '../../client'
import type { Image } from '../../components/ImageGallery'
import ImageGallery from '../../components/ImageGallery'

function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
}

const mapImages = (images: string[]): Image[] => {
    return images.map((image: string) => ({ src: image }))
}

interface GalleryProps {
    node: {
        images: string[]
    }
}

const serializers = {
    types: {
        gallery: (props: GalleryProps) => (
            <ImageGallery
                images={mapImages(props.node.images)}
                imgWidth={500}
                imgHeight={500}
            />
        ),
        image: (props: any) => <img src={urlFor(props.node).width(852).url()} />
    },
    marks: {
        highlight: (props: any) => (
            <span className="highlight">
                {props.children.map((text: string) => text)}
            </span>
        ),
    },
}

const Post: React.FC<{ post: Post }> = ({ post }) => {
    if (!post) return null

    const { title = 'Missing title', categories, mainImage, body = [] } = post

    return (
        <>
            <article>
            <Box sx={{maxWidth: '2400px'}}>
                <img src={urlFor(mainImage).width(2400).height(800).url()} alt={title} />
                </Box>
                <Container maxWidth="md">
                <h1>{title}</h1>
                <BlockContent
                    blocks={body}
                    serializers={serializers}
                    imageOptions={{ w: 320, h: 240, fit: 'max' }}
                    {...client.config()}
                />
                <Link href="/">Terug</Link>
                </Container>
            </article>
        </>
    )
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`
export async function getStaticPaths() {
    const paths = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: true,
    }
}

interface ResultData {
    post: Post
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const post = await client.fetch(query, { slug })
    return {
        props: {
            post,
        },
    }
}
export default Post
