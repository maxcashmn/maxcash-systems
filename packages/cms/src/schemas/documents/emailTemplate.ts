import { defineField, defineType } from 'sanity'

export const emailTemplate = defineType({
  name: 'emailTemplate',
  title: 'Email Template',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Template Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'subject',
      title: 'Subject',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'variables',
      title: 'Variables',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'example', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Welcome', value: 'welcome' },
          { title: 'Verification', value: 'verification' },
          { title: 'KYC Status', value: 'kyc' },
          { title: 'Transaction', value: 'transaction' },
          { title: 'Notification', value: 'notification' },
          { title: 'Marketing', value: 'marketing' },
          { title: 'Compliance', value: 'compliance' },
        ],
      },
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
      subtitle: 'type',
    },
  },
})
