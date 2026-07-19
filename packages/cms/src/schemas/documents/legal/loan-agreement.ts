import { defineField, defineType } from 'sanity'

export const loanAgreement = defineType({
  name: 'loanAgreement',
  title: 'Loan Agreement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Loan Agreement',
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
      name: 'loanTerms',
      title: 'Loan Terms',
      type: 'object',
      fields: [
        { name: 'minAmount', type: 'number' },
        { name: 'maxAmount', type: 'number' },
        { name: 'interestRate', type: 'number' },
        { name: 'defaultPenalty', type: 'number' },
        { name: 'gracePeriod', type: 'number' },
      ],
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