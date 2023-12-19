awslocal sqs create-queue --queue-name image-process.fifo --attributes FifoQueue=true --no-cli-pager --region ap-northeast-2
awslocal sqs create-queue --queue-name mail-send.fifo --attributes FifoQueue=true --no-cli-pager --region ap-northeast-2

awslocal  sqs list-queues --no-cli-pager --region ap-northeast-2