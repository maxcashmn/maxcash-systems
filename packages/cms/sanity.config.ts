import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemas'
import { deskStructure } from './src/config/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'MaxCash CMS',

  projectId: '1gl3t0bx',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
