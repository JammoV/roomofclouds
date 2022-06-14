import groq from 'groq'
import type { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

import type { Post } from '@/api/Types'
import CenteredHeader from '@/atoms/CenteredHeader'
import HomepageRecentPosts from '@/molecules/HomepageRecentPosts'
import GenericTemplate from '@/templates/Generic'

import client from '../client'

const Index: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <GenericTemplate>
            <Head>
                <title>{`Room of Clouds`}</title>
            </Head>
            <div className="mt-12 mb-8">
                <CenteredHeader title="Recente reis artikelen" />
            </div>

            <HomepageRecentPosts posts={posts} />
        </GenericTemplate>
    )
}

interface ResultData {
    posts: Post[]
}

export const getStaticProps: GetStaticProps<ResultData> = async () => {
    const posts: Post[] = await client.fetch(groq`
      *[_type == "post" && publishedAt < now() && categories[0]->title != "Interieur"] | order(publishedAt desc)[0...5]
    `)
    return {
        props: {
            posts,
        },
    }
}

export default Index
