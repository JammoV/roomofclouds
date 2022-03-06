import { Box, Typography } from '@mui/material'
import imageUrlBuilder from '@sanity/image-url'
import Link from 'next/link'
import React from 'react'

import type { Post, PortableText } from '../api/Types'
import client from '../client'
import theme from '../styles/theme'

interface PostHeroProps {
    post: Post
}

function urlFor(source: string) {
    return imageUrlBuilder(client).image(source)
}

function getPostDescription(postBody: PortableText[]): string {
    const blocks = postBody
        ? postBody.filter(
              (block) => block._type === 'block' && block.style == 'normal'
          )
        : []

    if (blocks[0].children.length > 0) {
        const spanChildren = blocks[0].children.filter(
            (record) => record._type === 'span'
        )

        if (spanChildren.length > 0) {
            const text = spanChildren[0].text

            if (text.length > 180) {
                return `${text.substring(0, 180)}...`
            }

            return text
        }
    }

    return ''
}

const PostHero: React.VFC<PostHeroProps> = ({ post }) => (
    <Link href="/post/[slug]" as={`/post/${post.slug.current}`}>
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                mb: 3,
                '&:hover': {
                    cursor: 'pointer',
                    backgroundColor: '#EEF6F6',
                },
                [theme.breakpoints.down('sm')]: {
                    flexDirection: 'column',
                },
            }}
        >
            <Box
                sx={{
                    minWidth: '505px',
                    [theme.breakpoints.down('md')]: {
                        minWidth: '300px',
                    },
                    [theme.breakpoints.down('sm')]: {
                        minWidth: 'initial',
                    },
                }}
            >
                <img
                    src={urlFor(post.mainImage)
                        .width(505)
                        .height(342)
                        .quality(100)
                        .url()}
                    alt={''}
                    loading="lazy"
                />
            </Box>
            <Box
                sx={{
                    pt: 3,
                    pl: 3,
                    pb: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    [theme.breakpoints.down('sm')]: {
                        pl: 0,
                    },
                }}
            >
                <Typography
                    variant="h3"
                    sx={{
                        fontSize: '24px',
                        fontWeight: 500,
                    }}
                >
                    {post.title}
                </Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {getPostDescription(post.body)}
                </Typography>
            </Box>
        </Box>
    </Link>
)

export default PostHero
