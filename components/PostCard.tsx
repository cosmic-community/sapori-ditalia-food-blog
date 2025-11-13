import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/recipes/${post.slug}`} className="card block">
      {post.metadata.featured_image && (
        <img
          src={`${post.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
          alt={post.metadata.title}
          width="400"
          height="300"
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-6">
        {post.metadata.category && (
          <span className="inline-block bg-primary text-white text-sm px-3 py-1 rounded-full mb-3">
            {post.metadata.category.metadata.name}
          </span>
        )}
        <h3 className="text-xl font-bold mb-2 text-neutral-900">
          {post.metadata.title}
        </h3>
        {post.metadata.author && (
          <div className="flex items-center gap-2 text-neutral-600 text-sm">
            {post.metadata.author.metadata.profile_photo && (
              <img
                src={`${post.metadata.author.metadata.profile_photo.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                alt={post.metadata.author.metadata.name}
                width="32"
                height="32"
                className="w-8 h-8 rounded-full"
              />
            )}
            <span>{post.metadata.author.metadata.name}</span>
          </div>
        )}
      </div>
    </Link>
  )
}