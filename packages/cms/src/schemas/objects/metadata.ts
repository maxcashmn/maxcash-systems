import { defineField, defineType } from 'sanity'

export const metadata = defineType({
  name: 'metadata',
  title: 'Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'createdBy',
      title: 'Created By',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'updatedBy',
      title: 'Updated By',
      type: 'string',
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
    }),
    defineField({
      name: 'lastReviewed',
      title: 'Last Reviewed',
      type: 'datetime',
    }),
    defineField({
      name: 'reviewedBy',
      title: 'Reviewed By',
      type: 'string',
    }),
    defineField({
      name: 'isPublished',
      title: 'Is Published',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
  ],
})
