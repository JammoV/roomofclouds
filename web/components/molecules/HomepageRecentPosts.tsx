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
    </div>
)

export default HomepageRecentPosts
