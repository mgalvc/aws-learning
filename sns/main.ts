import 'dotenv/config'
import express from 'express'
import AWS from 'aws-sdk'

const app = express()

const sns = new AWS.SNS({ region: process.env.AWS_REGION })

const port = 3000

app.use(express.json())

app.get('/healthcheck', (req, res) => res.json({ healthy: true, sns }))

app.post('/subscribe', (req, res) => {
    const params = {
        Protocol: 'EMAIL',
        TopicArn: process.env.AWS_TOPIC_ARN || '',
        Endpoint: req.body.email
    }

    sns.subscribe(params, (err, data) => {
        if (err) res.status(400).send(err)
        else res.send(data)
    })
})

app.post('/send', (req, res) => {
    const params = {
        Message: req.body.message,
        Subject: req.body.subject,
        TopicArn: process.env.AWS_TOPIC_ARN || ''
    }

    sns.publish(params, (err, data) => {
        if (err) res.status(400).send(err)
        else res.send(data)
    })
})

app.listen(port, () => console.log('SNS app started'))