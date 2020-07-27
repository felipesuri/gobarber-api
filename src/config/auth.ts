export default {
  jwt: {
    secret: process.env.SECRET || 'default',
    expiresIn: '1d',
  },
}
