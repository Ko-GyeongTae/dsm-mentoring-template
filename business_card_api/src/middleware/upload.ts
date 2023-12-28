import multer from 'multer'
import { s3Storage } from '../utils/s3'

export const uploadMiddleware = multer({
  storage: s3Storage
}).single('photo')
