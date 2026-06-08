export const metadata = {
  robots: 'index, follow',
  googleSiteVerification: 'your-verification-code-here',
  alternates: {
    canonical: 'https://perfume-store.com',
  },
};

export const generateOpenGraphMetadata = (
  title: string,
  description: string,
  image?: string,
  url?: string
) => ({
  title,
  description,
  openGraph: {
    title,
    description,
    image: image || 'https://perfume-store.com/og-image.jpg',
    url: url || 'https://perfume-store.com',
    type: 'website',
  },
});

export const generateProductSchema = (
  name: string,
  description: string,
  price: number,
  image: string
) => ({
  '@context': 'https://schema.org/',
  '@type': 'Product',
  name,
  description,
  image,
  offers: {
    '@type': 'Offer',
    price: price.toString(),
    priceCurrency: 'BRL',
    availability: 'https://schema.org/InStock',
  },
});
