import { cosmic, hasStatus } from '@/lib/cosmic'
import { Post, HomepageCarousel, ProductOfTheDay, GalleryImage } from '@/types'
import HomeCarousel from '@/components/HomeCarousel'
import PostCard from '@/components/PostCard'
import ProductShowcase from '@/components/ProductShowcase'
import GalleryGrid from '@/components/GalleryGrid'
import NewsletterSignup from '@/components/NewsletterSignup'
import Link from 'next/link'

async function getHomeData() {
  try {
    // Fetch carousel
    const carouselResponse = await cosmic.objects
      .findOne({ type: 'homepage-carousel', slug: 'homepage-carousel' })
      .props(['id', 'title', 'metadata'])

    // Fetch latest posts
    const postsResponse = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)

    const sortedPosts = (postsResponse.objects as Post[]).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime()
      const dateB = new Date(b.created_at).getTime()
      return dateB - dateA
    })

    // Fetch product of the day
    const productResponse = await cosmic.objects
      .findOne({ type: 'product-of-the-day', slug: 'product-of-the-day' })
      .props(['id', 'title', 'metadata'])

    // Fetch gallery images
    const galleryResponse = await cosmic.objects
      .find({ type: 'gallery-images' })
      .props(['id', 'title', 'metadata'])

    return {
      carousel: carouselResponse.object as HomepageCarousel,
      posts: sortedPosts.slice(0, 3),
      product: productResponse.object as ProductOfTheDay,
      galleryImages: galleryResponse.objects as GalleryImage[]
    }
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return { carousel: null, posts: [], product: null, galleryImages: [] }
    }
    throw error
  }
}

export default async function Home() {
  const { carousel, posts, product, galleryImages } = await getHomeData()

  return (
    <div>
      {/* Hero Carousel */}
      {carousel && <HomeCarousel carousel={carousel} />}

      {/* Product of the Day */}
      {product && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900">
              Product of the Day
            </h2>
            <ProductShowcase product={product} />
          </div>
        </section>
      )}

      {/* Featured Posts */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
              Latest Recipes
            </h2>
            <Link href="/recipes" className="text-primary hover:text-primary-dark font-semibold">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      {galleryImages.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-900">
              Taste of Italy
            </h2>
            <GalleryGrid images={galleryImages.slice(0, 6)} />
          </div>
        </section>
      )}

      {/* Newsletter */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <NewsletterSignup />
        </div>
      </section>
    </div>
  )
}