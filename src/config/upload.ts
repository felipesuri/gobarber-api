import path from 'path'
import crypto from 'crypto'
import multer from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const uploadsFolder = path.resolve(__dirname, '..', '..', 'tmp', 'uploads')

export default {
  tmpFolder,
  uploadsFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex')
      const fileName = `${filehash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
}
