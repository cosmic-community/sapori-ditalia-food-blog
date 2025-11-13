// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

// Author type
export interface Author extends CosmicObject {
  type: 'authors';
  metadata: {
    name: string;
    bio?: string;
    profile_photo?: {
      url: string;
      imgix_url: string;
    };
  };
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name: string;
    description?: string;
  };
}

// Post type
export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    title: string;
    content: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    author?: Author;
    category?: Category;
  };
}

// Page type
export interface Page extends CosmicObject {
  type: 'pages';
  metadata: {
    page_title: string;
    subtitle?: string;
    hero_image?: {
      url: string;
      imgix_url: string;
    };
    content: string;
    show_hero?: boolean;
  };
}

// Homepage Carousel type
export interface HomepageCarousel extends CosmicObject {
  type: 'homepage-carousel';
  metadata: {
    images: Array<{
      url: string;
      imgix_url: string;
    }>;
  };
}

// Gallery Image type
export interface GalleryImage extends CosmicObject {
  type: 'gallery-images';
  metadata: {
    image: {
      url: string;
      imgix_url: string;
    };
    caption?: string;
  };
}

// Product of the Day type
export interface ProductOfTheDay extends CosmicObject {
  type: 'product-of-the-day';
  metadata: {
    product_name: string;
    description: string;
    price: string | number;
    product_image: {
      url: string;
      imgix_url: string;
    };
    buy_link?: string;
    origin?: string;
  };
}

// Newsletter Subscriber type
export interface NewsletterSubscriber extends CosmicObject {
  type: 'newsletter-subscribers';
  metadata: {
    email: string;
    subscribed_at: string;
    status: {
      key: 'active' | 'unsubscribed';
      value: 'Active' | 'Unsubscribed';
    };
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}