import { defaultDocumentActions } from 'sanity'

export const documentActions = (prev: any) => {
  return defaultDocumentActions([
    'publish',
    'unpublish',
    'delete',
    'duplicate',
    'discardChanges',
  ])
}
