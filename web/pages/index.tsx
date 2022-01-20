import groq from 'groq'
import type { GetStaticProps } from 'next'
import React from 'react'

import type { Post } from '../api/Types'
import client from '../client'
import HomepageImageGallery from '../components/HomepageImageGallery'

const mapGalleryData = (posts: Post[]) => {
    return posts.map((post: Post) => ({
        src: post.mainImage,
        title: post.title,
        subtitle: new Date(post.publishedAt).toDateString(),
        url: `/post/${post.slug.current}`,
    }))
}

const Index: React.FC<{ posts: Post[] }> = ({ posts }) => {
    return (
        <div>
            {/* <ul>
            {posts.length > 0 && posts.map(
                ({ _id, title = '', slug, publishedAt = '' }) =>
                    slug && (
                        <li key={_id}>
                            <Link href="/post/[slug]" as={`/post/${slug.current}`}>
                                <a>{title}</a>
                            </Link>{' '}
                            ({new Date(publishedAt).toDateString()})
                        </li>
                    )
            )}
            </ul> */}
            <HomepageImageGallery images={mapGalleryData(posts)} />
        </div>
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

export default Index
