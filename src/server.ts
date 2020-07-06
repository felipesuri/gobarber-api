import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'

import uploadConfig from './config/upload'

import './database'

import routes from './routes'
import AppError from './errors/appError'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

const PORT = 3333

app.listen(PORT, () => {
  console.log(`> Server started on port: ${PORT}`)
})
