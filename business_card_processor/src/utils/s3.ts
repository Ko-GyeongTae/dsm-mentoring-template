import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'

interface IBaseS3 {
  key: string
}

interface IReadS3File extends IBaseS3 {}

interface IWriteS3File extends IBaseS3 {
  file: Buffer
}

const s3Client = new S3Client({
  endpoint: 'http://s3.ap-northeast-2.localhost.localstack.cloud:4566',
  region: 'ap-northeast-2'
})

export const readS3File = async ({ key }: IReadS3File): Promise<Buffer> => {
  const command = new GetObjectCommand({
    Bucket: 'business-card',
    Key: key
  })

  const response = await s3Client.send(command)

  if (response.Body == null) {
    throw new Error('cannot find s3 object body')
  }

  const byteArray = await response.Body.transformToByteArray()

  const buffer = Buffer.from(byteArray)

  return buffer
}

export const writeS3File = async ({ key, file }: IWriteS3File): Promise<void> => {
  const command = new PutObjectCommand({
    Bucket: 'business-card',
    Key: key,
    Body: file
  })

  await s3Client.send(command)
}
