import { GalleryImage } from '@/types'

interface GalleryGridProps {
  images: GalleryImage[]
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((image) => (
        <div key={image.id} className="relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200">
          <img
            src={`${image.metadata.image.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={image.metadata.caption || image.title}
            width="400"
            height="400"
            className="w-full h-full object-cover"
          />
          {image.metadata.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-3 text-sm">
              {image.metadata.caption}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}