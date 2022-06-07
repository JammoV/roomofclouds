import type {
    PortableTextComponents,
    PortableTextTypeComponentProps,
} from '@portabletext/react'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import groq from 'groq'
import type { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import type { FC } from 'react'

import { Post } from '@/api/Types'
import BlockQuote from '@/atoms/BlockQuote'
import Header, { HeaderType } from '@/atoms/Header'
import type { TipProps } from '@/atoms/Tip'
import Tip from '@/atoms/Tip'
import Gallery from '@/organisms/Gallery'
import GenericTemplate from '@/templates/Generic'

import client from '../../client'

const urlFor = (source: string): ImageUrlBuilder => {
    return imageUrlBuilder(client).image(source)
}

interface GalleryProps {
    value: {
        images: SanityImageSource[]
        display?: string
    }
}

const portableComponents: PortableTextComponents = {
    types: {
        gallery: (props: GalleryProps): JSX.Element => {
            return (
                <Gallery
                    images={props.value.images}
                    display={props.value.display}
                />
            )
        },
        tip: ({ value }: PortableTextTypeComponentProps<TipProps>) => (
            <Tip type={value.type} text={value.text} />
        ),
        image: ({ value }: { value: string }) => (
            <img src={urlFor(value).width(852).url()} alt="" />
        ),
        line: () => <hr className="my-2 border-green-primary" />,
    },
    list: {
        number: ({ children }) => <ol className="my-4">{children}</ol>,
        bullet: ({ children }) => <ul className="my-4">{children}</ul>,
    },
    listItem: {
        number: ({ children }) => (
            <li className="list-decimal pl-2 ml-8 text-lg">{children}</li>
        ),
        bullet: ({ children }) => (
            <li className="list-disc pl-2 ml-8 text-lg">{children}</li>
        ),
    },
    marks: {
        highlight: ({ children }) => (
            <span className="highlight">{children}</span>
        ),
    },
    block: {
        h2: ({ children }) => <Header type={HeaderType.H2}>{children}</Header>,
        h3: ({ children }) => <Header type={HeaderType.H3}>{children}</Header>,
        h4: ({ children }) => <Header type={HeaderType.H4}>{children}</Header>,
        blockquote: ({ children }) => <BlockQuote>{children}</BlockQuote>,
    },
}

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  "name": author->name,
  "categories": categories[]->title,
  "authorImage": author->image,
  body
}`

const Post: FC<{ post: Post }> = ({ post }) => {
    const router = useRouter()
    if (!post) return null

    const { title = 'Missing title', mainImage, body = [] } = post

    return (
        <GenericTemplate mainImage={mainImage} mainImageTitle={title}>
            <Head>
                <title>{`Room of Clouds - ${title}`}</title>
            </Head>
            <article>
                <div>
                    <h1 className="font-yuji text-4xl mt-12 mb-8">{title}</h1>
                    <PortableText
                        value={body}
                        components={portableComponents}
                        // imageOptions={{ w: 320, h: 240, fit: 'max' }}
                        // {...client.config()}
                    />
                    <button
                        onClick={(): void => router.back()}
                        className={`mt-4`}
                    >
                        Terug
                    </button>
                </div>
            </article>
        </GenericTemplate>
    )
}
export const getStaticPaths: GetStaticPaths = async () => {
    const paths: string[] = await client.fetch(
        groq`*[_type == "post" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug: string) => ({ params: { slug } })),
        fallback: true,
    }
}

interface ResultData {
    post: Post
}

export const getStaticProps: GetStaticProps<ResultData> = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const slug = context.params?.slug as string
    const post: Post = await client.fetch(query, { slug })
    return {
        props: {
            post,
        },
    }
}
export default Post
