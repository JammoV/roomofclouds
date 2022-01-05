import React from "react";
import groq from 'groq'
import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import client from '../../client'
import { Post } from "../../api/Types";
import { GetStaticProps } from "next";
import Link from 'next/link'

function urlFor (source: string) {
    return imageUrlBuilder(client).image(source)
}

const serializers = {
    types: {
        gallery: (props: any) => (
            props?.node.images.map((image: any, i: number) => (
                <img key={i}
                        src={urlFor(image)
                            .height(300)
                            .url()}
                    />
            ))
        ),
    },
  }


const Post: React.FC<{post: Post}> = ({post}) => {
    if(!post) return null

    const {
        title = 'Missing title',
        name = 'Missing name',
        categories,
        authorImage,
        mainImage,
        body = []
    } = post

    return (
        <>
        <Link href="/">Terug</Link>
        <article>
            <h1>{title}</h1>
            {categories && (
                <ul>
                    Posted in
                    {categories.map((category, i) => <li key={i}>{category}</li>)}
                </ul>
            )}
            <img
                        src={urlFor(mainImage)
                            .width(700)
                            .url()}
                    />
            <BlockContent
                blocks={body}
                serializers={serializers}
                imageOptions={{ w: 320, h: 240, fit: 'max' }}
                {...client.config()}
            />
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
        paths: paths.map((slug: string) => ({params: {slug}})),
        fallback: true,
    }
}

interface ResultData {
    post: Post;
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const post = await client.fetch(query, { slug })
    return {
        props: {
            post
        }
    }
}
export default Post