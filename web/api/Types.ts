export interface Post {
    _id: string
    title: string
    slug: {
        current: string
    }
    publishedAt: string
    categories: Category[]
    authorImage: string
    mainImage: string
    body: PortableText[]
    name: string
}

export interface Category {
    category: string
}

export interface PortableText {
    _key: string
    _type: string
    style: string
    markDefs: string[]
    children: Record[]
}

export interface Record {
    _key: string
    _type: string
    marks: string[]
    text: string
}
