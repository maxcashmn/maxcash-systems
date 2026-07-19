import { defineField, defineType } from 'sanity'

export const statsBlock = defineType({
  name: 'statsBlock',
  title: 'Stats Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      title: 'Statistics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'value', title: 'Value', type: 'string' },
            { name: 'suffix', title: 'Suffix', type: 'string' },
            { name: 'prefix', title: 'Prefix', type: 'string' },
            { name: 'icon', title: 'Icon', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [2, 3, 4],
      },
      initialValue: 4,
    }),
    defineField({
      name: 'animate',
      title: 'Animate Counters',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
