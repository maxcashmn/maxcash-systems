import { createClient, type ClientConfig } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Sanity Client Configuration
const config: ClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '1gl3t0bx',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION || '2026-07-11',
  useCdn: import.meta.env.VITE_SANITY_CDN === 'true' || false,
  token: import.meta.env.VITE_SANITY_TOKEN, // Add the token here
}

export const sanityClient = createClient(config)

// Image URL Builder
const builder = imageUrlBuilder(sanityClient)
export const urlFor = (source: any) => builder.image(source)

// ============================================
// GROQ QUERIES - Admin Dashboard
// ============================================

export const CMS_QUERIES = {
  // Active Announcements
  getActiveAnnouncements: `
    *[_type == "announcement" && isActive == true] | order(createdAt desc) {
      _id,
      title,
      content,
      type,
      isActive,
      createdAt
    }
  `,

  // Recent Blog Posts
  getRecentBlogPosts: `
    *[_type == "post"] | order(publishedAt desc) [0...5] {
      _id,
      title,
      slug,
      excerpt,
      author->{ name },
      featuredImage,
      publishedAt
    }
  `,

  // Legal Documents
  getLegalDocuments: `
    *[_type in ["termsOfService", "privacyPolicy", "kycPolicy", "amlPolicy", "loanAgreement", "userAgreement"]] {
      _id,
      _type,
      title,
      version,
      isActive
    }
  `,

  // CMS Stats
  getCMSStats: `
    {
      "pages": count(*[_type == "page"]),
      "pagesDraft": count(*[_type == "page" && !defined(publishedAt)]),
      "posts": count(*[_type == "post"]),
      "postsDraft": count(*[_type == "post" && !defined(publishedAt)]),
      "faqs": count(*[_type == "faq"]),
      "products": count(*[_type == "loanProduct"]),
      "productsInactive": count(*[_type == "loanProduct" && isActive == false]),
      "announcements": count(*[_type == "announcement"]),
      "announcementsActive": count(*[_type == "announcement" && isActive == true]),
      "legal": count(*[_type in ["termsOfService", "privacyPolicy", "kycPolicy", "amlPolicy", "loanAgreement", "userAgreement"]])
    }
  `,
}
