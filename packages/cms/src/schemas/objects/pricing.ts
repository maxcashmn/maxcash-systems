import { defineField, defineType } from 'sanity'

// Define pricing feature as a separate object type
export const pricingFeature = defineType({
  name: 'pricingFeature',
  title: 'Pricing Feature',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Feature Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'included',
      title: 'Included',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tooltip',
      title: 'Tooltip',
      type: 'string',
      description: 'Help text shown on hover',
    }),
  ],
})

// Define pricing plan
export const pricingPlan = defineType({
  name: 'pricingPlan',
  title: 'Pricing Plan',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: Rule => Rule.required().min(0),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'USD ($)', value: 'USD' },
          { title: 'EUR (€)', value: 'EUR' },
          { title: 'GBP (£)', value: 'GBP' },
          { title: 'INR (₹)', value: 'INR' },
        ],
      },
      initialValue: 'USD',
    }),
    defineField({
      name: 'interval',
      title: 'Billing Interval',
      type: 'string',
      options: {
        list: [
          { title: 'Monthly', value: 'monthly' },
          { title: 'Yearly', value: 'yearly' },
          { title: 'One-Time', value: 'one-time' },
        ],
      },
      initialValue: 'monthly',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'pricingFeature' }],
    }),
    defineField({
      name: 'isPopular',
      title: 'Popular Plan',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
