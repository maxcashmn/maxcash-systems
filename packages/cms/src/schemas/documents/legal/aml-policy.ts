import { defineField, defineType } from 'sanity'

export const amlPolicy = defineType({
  name: 'amlPolicy',
  title: 'AML Policy',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Anti-Money Laundering Policy',
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
      name: 'reportingObligations',
      title: 'Reporting Obligations',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'complianceOfficer',
      title: 'Compliance Officer',
      type: 'string',
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