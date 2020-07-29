import 'reflect-metadata'
import 'dotenv/config'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { errors } from 'celebrate'

import uploadConfig from '@config/upload'
import routes from './routes'
import AppError from '@shared/errors/appError'

import '@shared/infra/typeorm'
import '@shared/container'
import rateLimiter from './middleware/rateLimiter'

const app = express()

app.use(rateLimiter)
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.uploadsFolder))
app.use(routes)

app.use(errors())

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    })
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  })
})

const PORT = 3333

app.listen(PORT, () => {
  console.log(`> Server started on port: ${PORT}`)
})
