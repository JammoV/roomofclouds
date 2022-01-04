export interface Post {
    _id: string;
    title: string;
    slug: {
        current: string;
    }
    publishedAt: string;
    categories: Category[];
    authorImage: string;
    body: string;
    name: string;
}

export interface Category {
    category: string;
}