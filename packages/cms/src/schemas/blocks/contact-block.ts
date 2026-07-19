import { defineField, defineType } from 'sanity'

export const contactBlock = defineType({
  name: 'contactBlock',
  title: 'Contact Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'formFields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'type', type: 'string' },
            { name: 'required', type: 'boolean' },
          ],
        },
      ],
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string' },
            { name: 'label', type: 'string' },
            { name: 'value', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Map Embed URL',
      type: 'url',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 3,
      initialValue: 'Thank you for your message! We\'ll get back to you soon.',
    }),
  ],
})
