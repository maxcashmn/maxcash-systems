import { defineField, defineType } from 'sanity'

export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image with Alt',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Describe the image for accessibility and SEO',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
    defineField({
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Optional: Override the width',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'number',
      description: 'Optional: Override the height',
    }),
  ],
})
