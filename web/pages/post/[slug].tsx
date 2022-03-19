import { Box, Button, Container } from '@mui/material'
import BlockContent from '@sanity/block-content-to-react'
import imageUrlBuilder from '@sanity/image-url'
import groq from 'groq'
import type { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { Post } from '../../api/Types'
import client from '../../client'
import type { Image } from '../../components/ImageGallery'
import ImageGallery from '../../components/ImageGallery'
import ImageGalleryInline from '../../components/ImageGalleryInline'
import ImageGalleryStacked from '../../components/ImageGalleryStacked'
import Tip from '../../components/Tip'

function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
}

const mapImages = (images: string[]): Image[] => {
    return images.map((image: string) => ({ src: image }))
}

interface GalleryProps {
    node: {
        images: string[]
        display?: string
    }
}

const serializers = {
    types: {
        gallery: (props: GalleryProps) => {
            if (props.node.display === 'inline') {
                return (
                    <ImageGalleryInline
                        images={mapImages(props.node.images)}
                        imgWidth={500}
                        imgHeight={600}
                    />
                )
            }

            if (props.node.display === 'stacked') {
                return (
                    <ImageGalleryStacked
                        images={mapImages(props.node.images)}
                        imgWidth={852}
                        imgHeight={400}
                    />
                )
            }

            return (
                <ImageGallery
                    images={mapImages(props.node.images)}
                    imgWidth={500}
                    imgHeight={500}
                />
            )
        },
        tip: (props: any) => (
            <Tip type={props.node.type} text={props.node.text} />
        ),
        image: (props: any) => (
            <img src={urlFor(props.node).width(852).url()} alt="" />
        ),
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
    const router = useRouter()
    if (!post) return null

    const { title = 'Missing title', mainImage, body = [] } = post

    return (
        <>
            <article>
                <Box sx={{ maxWidth: '2400px' }}>
                    <img
                        src={urlFor(mainImage).width(2400).height(800).url()}
                        alt={title}
                    />
                </Box>
                <Container maxWidth="md">
                    <h1>{title}</h1>
                    <BlockContent
                        blocks={body}
                        serializers={serializers}
                        imageOptions={{ w: 320, h: 240, fit: 'max' }}
                        {...client.config()}
                    />
                    <Button
                        variant="text"
                        onClick={() => router.back()}
                        sx={{ mt: 4 }}
                    >
                        Terug
                    </Button>
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
