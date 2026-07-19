import { defineField, defineType } from 'sanity'

export const customer = defineType({
  name: 'customer',
  title: 'Customer',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'object',
      fields: [
        { name: 'street', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'zipCode', type: 'string' },
        { name: 'country', type: 'string' },
      ],
    }),
    defineField({
      name: 'kycStatus',
      title: 'KYC Status',
      type: 'string',
      options: {
        list: [
          { title: 'Not Started', value: 'not-started' },
          { title: 'Pending', value: 'pending' },
          { title: 'Verified', value: 'verified' },
          { title: 'Rejected', value: 'rejected' },
        ],
      },
    }),
    defineField({
      name: 'documents',
      title: 'Documents',
      type: 'array',
      of: [{ type: 'file' }],
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 5,
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
      title: 'firstName',
      subtitle: 'email',
    },
  },
})
