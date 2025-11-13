import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'

async function getPosts() {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const sortedPosts = (response.objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    return sortedPosts
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw error
  }
}

export default async function RecipesPage() {
  const posts = await getPosts()

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
          All Recipes
        </h1>
        <p className="text-xl text-neutral-600 mb-12">
          Discover our collection of authentic Italian recipes
        </p>
        
        {posts.length === 0 ? (
          <p className="text-neutral-600 text-center py-12">
            No recipes available at the moment.
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