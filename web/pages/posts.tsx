import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import type { Post } from '@/api/Types'
import CenteredHeader from '@/atoms/CenteredHeader'
import PostHero from '@/molecules/PostHero'
import GenericTemplate from '@/templates/Generic'

import client from '../client'

const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <GenericTemplate>
            <Head>
                <title>Room of Clouds - Alle reis artikelen</title>
            </Head>
            <CenteredHeader title="Alle reis artikelen" />
            {posts.map((post) => (
                <PostHero post={post} key={post._id} />
            ))}
        </GenericTemplate>
    )
}

interface ResultData {
    posts: Post[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts: Post[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
        props: {
            posts,
        },
    }
}

export default Posts
