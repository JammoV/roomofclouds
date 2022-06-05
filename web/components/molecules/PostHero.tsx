import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import type { Post, PortableText } from '@/api/Types'

import client from '../../client'

interface PostHeroProps {
    post: Post
}

const urlFor = (source: string): ImageUrlBuilder => {
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

const PostHero: FC<PostHeroProps> = ({ post }) => (
    <Link href="/post/[slug]" as={`/post/${post.slug.current}`}>
        <div className="flex flex-col hover:cursor-pointer bg-white mb-6 md:hover:bg-green-light md:flex-row">
            <div className="md:min-w-[505px]">
                <Image
                    src={urlFor(post.mainImage)
                        .width(505)
                        .height(342)
                        .quality(100)
                        .url()}
                    width={505}
                    height={342}
                    layout="responsive"
                    loading="lazy"
                    alt={post.title}
                />
            </div>
            <div className="flex flex-col justify-center py-4 md:p-8">
                <h3 className="text-2xl font-roboto font-medium mb-1 md:mb-4">
                    {post.title}
                </h3>
                <p className="mb-2">{getPostDescription(post.body)}</p>
            </div>
        </div>
    </Link>
)

export default PostHero
