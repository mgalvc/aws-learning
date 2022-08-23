import 'dotenv/config'
import AWS from 'aws-sdk'
import { SendMessageRequest, ReceiveMessageRequest } from 'aws-sdk/clients/sqs'

const sqs = new AWS.SQS({ region: process.env.AWS_REGION })

const params: ReceiveMessageRequest = {
    QueueUrl: process.env.AWS_QUEUE_URL || '',
}

sqs.receiveMessage(params, (err, data) => {
    if (err) {
        console.error(err)
        return
    }

    console.log(data.Messages)
})