import { defineField, defineType } from 'sanity'

export const transaction = defineType({
  name: 'transaction',
  title: 'Transaction',
  type: 'document',
  fields: [
    defineField({
      name: 'transactionId',
      title: 'Transaction ID',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'user',
      title: 'User',
      type: 'reference',
      to: [{ type: 'user' }],
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Deposit', value: 'deposit' },
          { title: 'Withdrawal', value: 'withdrawal' },
          { title: 'Transfer', value: 'transfer' },
          { title: 'Payment', value: 'payment' },
          { title: 'Refund', value: 'refund' },
        ],
      },
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'USD',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Completed', value: 'completed' },
          { title: 'Failed', value: 'failed' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'reference',
      title: 'Reference',
      type: 'string',
    }),
    defineField({
      name: 'metadata',
      title: 'Metadata',
      type: 'object',
      fields: [
        { name: 'ip', type: 'string' },
        { name: 'userAgent', type: 'text' },
        { name: 'location', type: 'string' },
      ],
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
      title: 'transactionId',
      subtitle: 'type',
    },
  },
})
