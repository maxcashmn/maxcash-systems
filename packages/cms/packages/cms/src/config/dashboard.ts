import { defineConfig } from '@sanity/dashboard'
import { projectUsersWidget } from 'sanity-plugin-dashboard-widget-project-users'
import { documentListWidget } from 'sanity-plugin-dashboard-widget-document-list'

export const dashboardConfig = defineConfig({
  widgets: [
    {
      name: 'project-users',
      component: projectUsersWidget,
      options: {
        title: 'Team Members',
      },
    },
    {
      name: 'recent-documents',
      component: documentListWidget,
      options: {
        title: 'Recent Content',
        order: '_createdAt desc',
        types: ['page', 'post', 'user', 'transaction'],
        limit: 10,
      },
    },
  ],
})
