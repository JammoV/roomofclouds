import { PortableText } from '@portabletext/react'
import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import type { FC } from 'react'

import type { Post } from '@/api/Types'
import GenericTemplate from '@/templates/Generic'

import client from '../client'
import portableComponents from '../lib/PortableComponents'

const Interieur: FC<{ post: Post }> = ({ post }) => {
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
                </div>
            </article>
        </GenericTemplate>
    )
}

interface ResultData {
    post: Post
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts: Post[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title == "Interieur"] | order(publishedAt desc)[0...1]
    `)
    return {
        props: {
            post: posts[0],
        },
    }
}

export default Interieur
