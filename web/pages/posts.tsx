import groq from 'groq'
import type { GetStaticProps } from 'next'
import React from 'react'

import type { Post } from '../api/Types'
import client from '../client'
import CenteredHeader from '../components/CenteredHeader'
import PostHero from '../components/PostHero'

const Posts: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <>
            <CenteredHeader title="Alle reis artikelen" />
            {posts.map((post, i) => (
                <PostHero post={post} key={i} />
            ))}
        </>
    )
}

interface ResultData {
    posts: Post[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
        props: {
            posts,
        },
    }
}

export default Posts
