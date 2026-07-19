import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1gl3t0bx',
    dataset: 'production',
  },
  studio: {
    host: 'localhost',
    port: 3333,
  },
})
