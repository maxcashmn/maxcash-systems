import { defineField, defineType } from 'sanity'

export const notification = defineType({
  name: 'notification',
  title: 'Notification',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 5,
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Info', value: 'info' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Error', value: 'error' },
        ],
      },
    }),
    defineField({
      name: 'target',
      title: 'Target Audience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', type: 'string' },
            { name: 'value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'isRead',
      title: 'Is Read',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'actionUrl',
      title: 'Action URL',
      type: 'url',
    }),
    defineField({
      name: 'sentAt',
      title: 'Sent At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
    },
  },
})
