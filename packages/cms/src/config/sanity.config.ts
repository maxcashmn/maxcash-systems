import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { dashboardTool } from '@sanity/dashboard'
import { schemaTypes } from '../schemas'
import { deskStructure } from './deskStructure'
import { documentActions } from './documentActions'
import { preview } from './preview'

export default defineConfig({
  name: 'default',
  title: 'MaxCash CMS',

  projectId: process.env.SANITY_PROJECT_ID || '1gl3t0bx',
  dataset: process.env.SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    dashboardTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: documentActions,
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev
      }
      return prev
    },
  },

  preview: {
    select: preview,
  },

  studios: [],
})
