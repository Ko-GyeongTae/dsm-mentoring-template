import { createCanvas, loadImage } from "canvas";
import { readS3File, writeS3File } from "./utils/s3";
import { randomUUID } from "crypto";
import { startConsumer } from "./helper";
import sharp from "sharp";

interface IImageProcess {
  s3ObjectKey: string;
}

const BASE_WIDTH = 1100
const BASE_HEIGHT = 600

const imageProcess = async (payload: IImageProcess) => {
  const key = randomUUID()

  console.log(`이미지: ${key} 생성 시작`)
  const canvas = createCanvas(BASE_WIDTH, BASE_HEIGHT)
  const context = canvas.getContext('2d')
  

  const image = await readS3File({ key: payload.s3ObjectKey})
  const resizedImage = await sharp(image).resize(300, 300).toBuffer()

  const canvasImage = await loadImage(resizedImage)

  context.fillStyle = '#f7f7f7'
  context.drawImage(canvasImage, 0, 0)

  context.textAlign = 'center'
  context.fillStyle = '#000000'
  context.fillText(key, BASE_WIDTH / 2, BASE_HEIGHT / 2)

  const buffer = canvas.toBuffer()

  await writeS3File({ key, file: buffer })

  console.log(`이미지: ${key} 생성 완료`)

  console.log(`http://localhost:4000/card/${key}`)
}

startConsumer({
  queueName: 'image-process.fifo',
  handler: imageProcess
})