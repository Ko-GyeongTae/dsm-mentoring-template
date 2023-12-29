import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs'

interface ISendMessage {
  queueName: string
  payload: Record<string, unknown>
  messageGroupId?: string
  messageDeduplicationId?: string
}

const sqsClient = new SQSClient({
  endpoint: 'http://sqs.ap-northeast-2.localhost.localstack.cloud:4566',
  region: 'ap-northeast-2'
})

export const sendSQSMessage = async ({ queueName, payload, messageGroupId, messageDeduplicationId }: ISendMessage): Promise<void> => {
  const command = new SendMessageCommand({
    QueueUrl: `http://sqs.ap-northeast-2.localhost.localstack.cloud:4566/000000000000/${queueName}`,
    DelaySeconds: 0,
    MessageGroupId: messageGroupId,
    MessageDeduplicationId: messageDeduplicationId,
    MessageBody: JSON.stringify(payload)
  })

  await sqsClient.send(command)
}
