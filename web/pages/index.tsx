import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import React from "react";
import { Post } from "../api/Types";
import Link from 'next/link'
import groq from 'groq'
import client from '../client'

const Index: React.FC<{ posts: Post[] }> = ({posts}) => {
    return (
        <div>
            <ul>
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
            </ul>
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