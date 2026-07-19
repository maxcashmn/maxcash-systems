import { defineField, defineType } from 'sanity'

export const termsOfService = defineType({
  name: 'termsOfService',
  title: 'Terms of Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Terms of Service',
    }),
    defineField({
      name: 'version',
      title: 'Version',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'effectiveDate',
      title: 'Effective Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: `v${'version'} - ${'effectiveDate'}`,
    },
  },
})