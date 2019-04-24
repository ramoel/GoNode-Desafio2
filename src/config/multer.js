const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const multerS3 = require('multer-s3')
const aws = require('aws-sdk')
const bodyParser = require('body-parser')

aws.config.update({
  accessKeyId: 'AKIAIMW7QFP4SIOFRXCA',
  secretAccessKey: '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',
  region: 'us-east-1'
})

const s3 = new aws.S3()

module.exports = {
  storage: multerS3({
    s3: s3,
    bucket: 'vizzu-uploads',
    key: function (req, file, cb) {
      crypto.randomBytes(16, (err, raw) => {
        if (err) return cb(err)

        cb(null, raw.toString('hex') + path.extname(file.originalname))
      })
    }
  })
}
