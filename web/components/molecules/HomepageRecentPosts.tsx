import Link from 'next/link'
import type { FC } from 'react'

import type { Post } from '@/api/Types'

import PostHero from './PostHero'

interface HomepageRecentPostsProps {
    posts: Post[]
}

const HomepageRecentPosts: FC<HomepageRecentPostsProps> = ({ posts }) => (
    <div className="pb-10">
        {posts.map((post) => {
            return <PostHero post={post} key={post._id} />
        })}
        <div className="text-center">
            <Link href={`/posts`}>
                <a className="hover:cursor-pointer my-4 text-lg border-b-4 border-b-green-light hover:border-b-green-primary">
                    Bekijk alle reisartikelen
                </a>
            </Link>
        </div>
    </div>
)

export default HomepageRecentPosts
