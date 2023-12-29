import { SQS } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer"

interface IStartConsumer {
  queueName: string;
  handler: (body?: any) => Promise<unknown>
}

export const startConsumer = async ({
  queueName,
  handler
}: IStartConsumer) => {
  const app = Consumer.create({
    queueUrl: `http://sqs.ap-northeast-2.localhost.localstack.cloud:4566/000000000000/${queueName}`,
    handleMessage: async ({ Body }) => {
      if (Body) {
        await handler(JSON.parse(Body))
      } else {
        await handler()
      }
    },
    sqs: new SQS({
      region: 'ap-northeast-2',
      endpoint: 'http://sqs.ap-northeast-2.localhost.localstack.cloud:4566',
    })
  })

  app.on('error', (err: any) => {
    console.error(err)
  })

  app.on('processing_error', (err: any) => {
    console.error(err)
  })

  app.start()

  console.log(`start processor: ${queueName}`)
}