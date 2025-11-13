import { ProductOfTheDay } from '@/types'

interface ProductShowcaseProps {
  product: ProductOfTheDay
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  return (
    <div className="card max-w-4xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 p-8">
        {/* Product Image */}
        <div className="relative">
          <div className="absolute top-4 right-4 bg-accent text-neutral-900 text-sm font-bold px-4 py-2 rounded-full shadow-lg">
            ⭐ Featured Today
          </div>
          <img
            src={`${product.metadata.product_image.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
            alt={product.metadata.product_name}
            width="600"
            height="600"
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h3 className="text-3xl font-bold mb-4 text-neutral-900">
            {product.metadata.product_name}
          </h3>
          
          <p className="text-neutral-700 mb-6 leading-relaxed">
            {product.metadata.description}
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-neutral-600 font-semibold">Price:</span>
              <span className="text-2xl font-bold text-primary">
                {typeof product.metadata.price === 'number' 
                  ? `$${product.metadata.price.toFixed(2)}` 
                  : product.metadata.price}
              </span>
            </div>

            {product.metadata.origin && (
              <div className="flex items-center gap-2">
                <span className="text-neutral-600 font-semibold">Origin:</span>
                <span className="text-neutral-900">{product.metadata.origin}</span>
              </div>
            )}
          </div>

          {product.metadata.buy_link && (
            <a
              href={product.metadata.buy_link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center"
            >
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  )
}