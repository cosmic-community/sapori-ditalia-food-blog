// app/categories/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post, Category } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'

async function getCategoryAndPosts(slug: string) {
  try {
    // Get category
    const categoryResponse = await cosmic.objects
      .findOne({ type: 'categories', slug })
      .props(['id', 'title', 'slug', 'metadata'])

    const category = categoryResponse.object as Category

    // Get all posts
    const postsResponse = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    // Filter posts by category ID
    const categoryPosts = (postsResponse.objects as Post[]).filter(
      post => post.metadata.category?.id === category.id
    )

    return { category, posts: categoryPosts }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { category: null, posts: [] }
    }
    throw error
  }
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { category, posts } = await getCategoryAndPosts(slug)

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
        <Link href="/recipes" className="text-primary hover:text-primary-dark">
          ← Back to Recipes
        </Link>
      </div>
    )
  }

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <Link href="/recipes" className="text-primary hover:text-primary-dark mb-8 inline-block">
          ← Back to Recipes
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
          {category.metadata.name}
        </h1>
        {category.metadata.description && (
          <p className="text-xl text-neutral-600 mb-12">
            {category.metadata.description}
          </p>
        )}

        {posts.length === 0 ? (
          <p className="text-neutral-600 text-center py-12">
            No recipes in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}