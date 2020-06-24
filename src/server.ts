import 'reflect-metadata'

import express from 'express'

import './database'

import routes from './routes'

const app = express()

app.use(express.json())
app.use(routes)

const PORT = 3333

app.listen(PORT, () => {
  console.log(`> Server started on port: ${PORT}`)
})
