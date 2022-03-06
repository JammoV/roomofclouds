import { Box } from '@mui/material'
import React from 'react'

import type { Post } from '../api/Types'

import PostHero from './PostHero'

interface HomepageRecentPostsProps {
    posts: Post[]
}

const HomepageRecentPosts: React.VFC<HomepageRecentPostsProps> = ({
    posts,
}) => (
    <Box>
        {posts.map((post, i) => {
            return <PostHero post={post} key={i} />
        })}
    </Box>
)

export default HomepageRecentPosts
