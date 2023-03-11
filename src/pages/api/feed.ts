import { NextApiHandler } from 'next'
import { DynamoDBClient, ListTablesCommand } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
})

const feed: NextApiHandler = async (req, res) => {
  const command = new ListTablesCommand({})
  const data = await client.send(command)
  console.log(data)
  res.json({
    title: 'My Awesome Podcast',
  })
}

export default feed
