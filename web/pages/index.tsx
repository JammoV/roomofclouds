import groq from 'groq'
import type { GetStaticProps } from 'next'
import React from 'react'

import type { Post } from '../api/Types'
import client from '../client'
import CenteredHeader from '../components/CenteredHeader'
import HomepageRecentPosts from '../components/HomepageRecentPosts'

const Index: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <>
            <CenteredHeader title="Recente reis artikelen" />
            <HomepageRecentPosts posts={posts} />
        </>
    )
}

interface ResultData {
    posts: Post[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0...5]
    `)
    return {
        props: {
            posts,
        },
    }
}

export default Index
