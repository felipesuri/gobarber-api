interface iMailConfig {
  driver: 'ethereal' | 'ses'
  defaults: {
    from: {
      email: string
      name: string
    }
  }
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'felipe@felipesuri.com',
      name: 'Felipe Suri',
    },
  },
} as iMailConfig
