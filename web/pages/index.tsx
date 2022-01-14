import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import React from "react";
import { Post } from "../api/Types";
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import groq from 'groq'
import client from '../client'
import HomepageImageGallery from '../components/HomepageImageGallery';

function urlFor (source: string) {
    return imageUrlBuilder(client).image(source)
}


const mapGalleryData = (posts: Post[]) => {
    return posts.map((post: Post) => ({
        src: post.mainImage,
        title: post.title,
        subtitle: new Date(post.publishedAt).toDateString(),
        url: `/post/${post.slug.current}`
    }));
}

const Index: React.FC<{ posts: Post[] }> = ({posts}) => {
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
    posts: Post[];
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    const posts = await client.fetch(groq`
      *[_type == "post" && publishedAt < now()] | order(publishedAt desc)
    `)
    return {
        props: {
            posts
        }
    }
}


export default Index