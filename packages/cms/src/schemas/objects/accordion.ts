import { defineField, defineType } from 'sanity'

export const accordionItem = defineType({
  name: 'accordionItem',
  title: 'Accordion Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'isOpen',
      title: 'Open by Default',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

export const accordion = defineType({
  name: 'accordion',
  title: 'Accordion',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{ type: 'accordionItem' }],
    }),
    defineField({
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
