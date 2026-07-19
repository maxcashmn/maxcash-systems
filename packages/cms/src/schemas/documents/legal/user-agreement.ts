import { defineField, defineType } from 'sanity'

export const userAgreement = defineType({
  name: 'userAgreement',
  title: 'User Agreement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'User Agreement',
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
      name: 'userObligations',
      title: 'User Obligations',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'companyObligations',
      title: 'Company Obligations',
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