export const preview = {
  select: {
    title: 'title',
    subtitle: 'subtitle',
    media: 'image',
  },
  prepare(selection: any) {
    const { title, subtitle, media } = selection
    return {
      title: title || 'Untitled',
      subtitle: subtitle || '',
      media: media,
    }
  },
}

// Document-specific preview configurations
export const documentPreviews = {
  user: {
    select: {
      title: 'name',
      subtitle: 'email',
      media: 'avatar',
    },
  },
  page: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
  post: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'featuredImage',
    },
  },
  transaction: {
    select: {
      title: 'transactionId',
      subtitle: 'type',
    },
  },
}
