import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { Post } from '@/api/Types'
import GenericTemplate from '@/templates/Generic'

import client from '../../client'
import portableComponents from '../../lib/PortableComponents'

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

const Post: FC<{ post: Post }> = ({ post }) => {
    const router = useRouter()
    if (!post) return null

    const { title = 'Missing title', mainImage, body = [] } = post

    return (
        <GenericTemplate mainImage={mainImage} mainImageTitle={title}>
            <Head>
                <title>{`Room of Clouds - ${title}`}</title>
            </Head>
            <article>
                <div>
                    <h1 className="font-yuji text-4xl mt-12 mb-8">{title}</h1>
                    <PortableText
                        value={body}
                        components={portableComponents}
                        // imageOptions={{ w: 320, h: 240, fit: 'max' }}
                        // {...client.config()}
                    />
                    <div className="text-center">
                        <button
                            onClick={(): void => router.back()}
                            className={`hover:cursor-pointer mt-4 text-lg border-b-4 border-b-green-light hover:border-b-green-primary`}
                        >
                            Terug
                        </button>
                    </div>
                </div>
            </article>
        </GenericTemplate>
    )
}
export const getStaticPaths: GetStaticPaths = async () => {
    const paths: string[] = await client.fetch(
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
    const post: Post = await client.fetch(query, { slug })
    return {
        props: {
            post,
        },
    }
}
export default Post
