import { defineField, defineType } from 'sanity'

export const kycPolicy = defineType({
  name: 'kycPolicy',
  title: 'KYC Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'KYC Policy',
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
      name: 'requiredDocuments',
      title: 'Required Documents',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'verificationSteps',
      title: 'Verification Steps',
      type: 'array',
      of: [{ type: 'string' }],
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
      subtitle: `v${'version'}`,
    },
  },
})