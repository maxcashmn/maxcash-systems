import { defineField, defineType } from 'sanity'

export const ctaBlock = defineType({
  name: 'ctaBlock',
  title: 'CTA Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'cta',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'link',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'style',
      title: 'Style',
      type: 'string',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Image Left', value: 'image-left' },
          { title: 'Image Right', value: 'image-right' },
          { title: 'Background', value: 'background' },
        ],
      },
      initialValue: 'simple',
    }),
  ],
})
