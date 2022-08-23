import 'dotenv/config'
import AWS from 'aws-sdk'
import { SendMessageRequest } from 'aws-sdk/clients/sqs'

const sqs = new AWS.SQS({ region: process.env.AWS_REGION })

const params: SendMessageRequest = {
    MessageBody: `Message at ${new Date().toISOString()}`,
    QueueUrl: process.env.AWS_QUEUE_URL || ''
}

sqs.sendMessage(params, (err, data) => {
    if (err) console.error(err)
    else console.log('Success', data.MessageId)
})