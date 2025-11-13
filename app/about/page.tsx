import { cosmic, hasStatus } from '@/lib/cosmic'
import { Page } from '@/types'
import ReactMarkdown from 'react-markdown'

async function getAboutPage() {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'pages', slug: 'about' })
      .props(['id', 'title', 'metadata'])

    return response.object as Page
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw error
  }
}

export default async function AboutPage() {
  const page = await getAboutPage()

  if (!page) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      </div>
    )
  }

  return (
    <div>
      {/* Hero Section */}
      {page.metadata.show_hero && page.metadata.hero_image && (
        <div className="relative h-96 bg-neutral-900">
          <img
            src={`${page.metadata.hero_image.imgix_url}?w=2000&h=800&fit=crop&auto=format,compress`}
            alt={page.metadata.page_title}
            width="2000"
            height="800"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                {page.metadata.page_title}
              </h1>
              {page.metadata.subtitle && (
                <p className="text-xl md:text-2xl">
                  {page.metadata.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {!page.metadata.show_hero && (
            <>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900">
                {page.metadata.page_title}
              </h1>
              {page.metadata.subtitle && (
                <p className="text-xl text-neutral-600 mb-8">
                  {page.metadata.subtitle}
                </p>
              )}
            </>
          )}

          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>{page.metadata.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  )
}