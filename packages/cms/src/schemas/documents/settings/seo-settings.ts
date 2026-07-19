import { defineField, defineType } from 'sanity'

export const seoSettings = defineType({
  name: 'seoSettings',
  title: 'SEO Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'defaultTitle',
      title: 'Default Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'defaultDescription',
      title: 'Default Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'defaultImage',
      title: 'Default Social Image',
      type: 'image',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      validation: Rule => Rule.uri({
        scheme: ['http', 'https'],
      }),
    }),
    defineField({
      name: 'robotsTxt',
      title: 'Robots.txt',
      type: 'text',
    }),
    defineField({
      name: 'googleAnalyticsId',
      title: 'Google Analytics ID',
      type: 'string',
    }),
    defineField({
      name: 'googleTagManagerId',
      title: 'Google Tag Manager ID',
      type: 'string',
    }),
    defineField({
      name: 'metaKeywords',
      title: 'Meta Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})