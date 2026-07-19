// ============================================
// CMS Types - Mobile-First Responsive Design
// ============================================

export interface CMSAnnouncement {
  _id: string
  title: string
  content: string
  type: 'info' | 'warning' | 'success' | 'error'
  isActive: boolean
  createdAt: string
}

export interface CMSBlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  author?: { name: string }
  featuredImage?: any
  publishedAt: string
}

export interface CMSLegalDocument {
  _id: string
  _type: string
  title: string
  version: string
  isActive: boolean
}

export interface CMSStats {
  pages: number
  pagesDraft: number
  posts: number
  postsDraft: number
  faqs: number
  products: number
  productsInactive: number
  announcements: number
  announcementsActive: number
  legal: number
}
