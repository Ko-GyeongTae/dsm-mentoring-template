import { type NextFunction, type Request, type Response, Router } from 'express'
import { uploadMiddleware } from '../middleware/upload'
import { readS3File } from '../utils/s3'

export const cardPath = '/card'
export const cardRouter = Router()

cardRouter.get('/:personalKey', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { personalKey } = req.params

    // personal Key 를 s3 객체 Key로 이용하여 이미지 조회

    // res.setHeader('content-type', 'image/png').send(image)    
  } catch (err) {
    next(err)
  }
})

cardRouter.post('/', uploadMiddleware, (req: Request, res: Response, next: NextFunction) => {
  try {
    const photo = req.file

    // s3 파일 키를 이미지 처리 서비스로 전송하는 로직 생성

    res.json({ message: 'ok' })
  } catch (err) {
    next(err)
  }
})
