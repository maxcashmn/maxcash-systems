import { defineField, defineType } from 'sanity'

export const loanProduct = defineType({
  name: 'loanProduct',
  title: 'Loan Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'minAmount',
      title: 'Minimum Amount',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'maxAmount',
      title: 'Maximum Amount',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'interestRate',
      title: 'Interest Rate (%)',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'termMonths',
      title: 'Term (Months)',
      type: 'array',
      of: [{ type: 'number' }],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'requirements',
      title: 'Requirements',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: `₹${'minAmount'} - ₹${'maxAmount'}`,
    },
  },
})