import { type SchemaTypeDefinition } from 'sanity'

// Import all objects
import { richText } from './objects/richText'
import { seo } from './objects/seo'
import { imageWithAlt } from './objects/image'
import { link } from './objects/link'
import { metadata } from './objects/metadata'
import { cta } from './objects/cta'
import { accordion, accordionItem } from './objects/accordion'
import { testimonial } from './objects/testimonial'
import { pricingFeature, pricingPlan } from './objects/pricing'

// Import blocks
import { heroBlock } from './blocks/hero-block'
import { featuresBlock } from './blocks/features-block'
import { ctaBlock } from './blocks/cta-block'
import { testimonialBlock } from './blocks/testimonial-block'
import { pricingBlock } from './blocks/pricing-block'
import { faqBlock } from './blocks/faq-block'
import { statsBlock } from './blocks/stats-block'
import { contactBlock } from './blocks/contact-block'

// Import documents
import { user } from './documents/user'
import { customer } from './documents/customer'
import { teamMember } from './documents/teamMember'
import { transaction } from './documents/transaction'
import { page } from './documents/pages/page'
import { post, category, author } from './documents/blog'
import { announcement } from './documents/announcements'
import { article, helpCategory } from './documents/help-center'
import { loanProduct } from './documents/products'
import {
  termsOfService,
  privacyPolicy,
  kycPolicy,
  amlPolicy,
  loanAgreement,
  userAgreement,
} from './documents/legal'
import { compliancePolicy } from './documents/compliance'
import { siteSettings, seoSettings } from './documents/settings'
import { faq } from './documents/faq'
import { emailTemplate } from './documents/emailTemplate'
import { notification } from './documents/notification'

export const schemaTypes: SchemaTypeDefinition[] = [
  // Objects (must be registered first)
  richText,
  seo,
  imageWithAlt,
  link,
  metadata,
  cta,
  accordion,
  accordionItem,
  testimonial,
  pricingFeature,
  pricingPlan,

  // Blocks
  heroBlock,
  featuresBlock,
  ctaBlock,
  testimonialBlock,
  pricingBlock,
  faqBlock,
  statsBlock,
  contactBlock,

  // Documents
  user,
  customer,
  teamMember,
  transaction,
  page,
  post,
  category,
  author,
  announcement,
  article,
  helpCategory,
  loanProduct,
  termsOfService,
  privacyPolicy,
  kycPolicy,
  amlPolicy,
  loanAgreement,
  userAgreement,
  compliancePolicy,
  siteSettings,
  seoSettings,
  faq,
  emailTemplate,
  notification,
]
