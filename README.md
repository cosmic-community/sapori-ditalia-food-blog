# Sapori d'Italia - Italian Food Blog

![App Preview](https://imgix.cosmicjs.com/e84b51c0-c0b1-11f0-a34a-efbcf979242c-photo-1621996346565-e3dbc646d9a9-1763053078249.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A beautifully crafted Next.js food blog showcasing authentic Italian recipes, culinary stories, and traditions. Features a dynamic homepage carousel, recipe blog with author profiles, photo gallery, and a special "Product of the Day" showcase.

## Features

- 🏠 Dynamic homepage with image carousel and featured content
- ⭐ Product of the Day showcase with purchase links
- 📝 Full-featured blog with recipes and culinary stories
- 👨‍🍳 Author profiles with professional bios
- 🏷️ Category-based recipe organization (Pasta, Desserts, Regional Cuisine)
- 📸 Photo gallery of Italian cuisine
- 📧 Newsletter subscription functionality
- 📄 Custom pages with hero sections
- 📱 Fully responsive design
- 🎨 Modern, elegant UI with Tailwind CSS
- 🚀 Built with Next.js 16 App Router
- 🔍 SEO optimized

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69112c745f36282002396f8d&clone_repository=6916360765bd4e64eaf80fd3)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for an Italy food blog with posts, authors, and categories"

### Code Generation Prompt

> "Build a Next.js website that uses my existing objects in this bucket. Make product of the day on home page."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering for blog content
- **Bun** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with bucket access

### Installation

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Posts with Author and Category

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Includes nested author and category data

// Access nested data directly
posts.forEach(post => {
  console.log(post.title)
  console.log(post.metadata.author?.title) // Author name
  console.log(post.metadata.category?.title) // Category name
})
```

### Getting Product of the Day (Singleton)

```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'product-of-the-day', slug: 'product-of-the-day' })
  .props(['id', 'title', 'metadata'])

console.log(product.metadata.product_name)
console.log(product.metadata.price)
console.log(product.metadata.product_image.imgix_url)
```

### Newsletter Subscription

```typescript
await cosmic.objects.insertOne({
  type: 'newsletter-subscribers',
  title: email,
  metadata: {
    email: email,
    subscribed_at: new Date().toISOString(),
    status: 'active' // Exact value from content model
  }
})
```

## Cosmic CMS Integration

This application uses the following Cosmic object types:

- **Posts** - Recipe articles with markdown content, featured images, authors, and categories
- **Authors** - Chef profiles with bios and photos
- **Categories** - Recipe categories (Pasta, Desserts, Regional Cuisine)
- **Pages** - Custom pages like "About" with hero sections
- **Homepage Carousel** - Singleton with multiple images for the hero carousel
- **Gallery Images** - Photo collection with captions
- **Product of the Day** - Singleton for daily featured product
- **Newsletter Subscribers** - Email list with subscription status

All content is managed through the Cosmic dashboard and fetched server-side for optimal performance.

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy!

<!-- README_END -->