import { S3 } from '@aws-sdk/client-s3'
import { NextApiHandler } from 'next'

const client = new S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACESS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
})

const feed: NextApiHandler = async (req, res) => {
  await client.getObject(
    {
      Bucket: process.env.AWS_BUCKET,
      Key: `${req.query.episode}.mp3`,
    },
    (err, data) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: err })
      }
      res.setHeader('Content-Type', 'audio/mpeg')
      res.setHeader('Content-Length', data.ContentLength)
      // res.setHeader('Cache-Control', 'public, max-age=31536000')
      // res.setHeader('Expires', new Date(Date.now() + 31536000).toUTCString())

      res.send(data.Body)
    }
  )
}

export default feed
