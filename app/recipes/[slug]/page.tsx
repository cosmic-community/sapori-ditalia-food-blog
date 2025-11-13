// app/recipes/[slug]/page.tsx
import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

async function getPost(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function RecipePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Recipe Not Found</h1>
        <Link href="/recipes" className="text-primary hover:text-primary-dark">
          ← Back to Recipes
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <article className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back link */}
        <Link href="/recipes" className="text-primary hover:text-primary-dark mb-8 inline-block">
          ← Back to Recipes
        </Link>

        {/* Featured Image */}
        {post.metadata.featured_image && (
          <img
            src={`${post.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={post.metadata.title}
            width="1200"
            height="600"
            className="w-full h-64 md:h-96 object-cover rounded-lg mb-8"
          />
        )}

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
          {post.metadata.title}
        </h1>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-neutral-600">
          {post.metadata.author && (
            <div className="flex items-center gap-2">
              {post.metadata.author.metadata.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  width="40"
                  height="40"
                  className="w-10 h-10 rounded-full"
                />
              )}
              <span className="font-semibold">{post.metadata.author.metadata.name}</span>
            </div>
          )}
          <span>•</span>
          <span>{formattedDate}</span>
          {post.metadata.category && (
            <>
              <span>•</span>
              <Link 
                href={`/categories/${post.metadata.category.slug}`}
                className="text-primary hover:text-primary-dark"
              >
                {post.metadata.category.metadata.name}
              </Link>
            </>
          )}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        </div>

        {/* Author bio */}
        {post.metadata.author && post.metadata.author.metadata.bio && (
          <div className="mt-12 p-6 bg-neutral-100 rounded-lg">
            <div className="flex items-start gap-4">
              {post.metadata.author.metadata.profile_photo && (
                <img
                  src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=160&h=160&fit=crop&auto=format,compress`}
                  alt={post.metadata.author.metadata.name}
                  width="80"
                  height="80"
                  className="w-20 h-20 rounded-full"
                />
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">About {post.metadata.author.metadata.name}</h3>
                <p className="text-neutral-700">{post.metadata.author.metadata.bio}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}