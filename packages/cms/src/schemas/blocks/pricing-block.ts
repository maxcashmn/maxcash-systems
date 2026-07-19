import { defineField, defineType } from 'sanity'

export const pricingBlock = defineType({
  name: 'pricingBlock',
  title: 'Pricing Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [{ type: 'pricingPlan' }],
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Toggle', value: 'toggle' },
          { title: 'Comparison', value: 'comparison' },
        ],
      },
      initialValue: 'grid',
    }),
    defineField({
      name: 'showToggle',
      title: 'Show Monthly/Yearly Toggle',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
