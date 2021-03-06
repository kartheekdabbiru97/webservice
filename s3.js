require('dotenv').config()
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const util = require("util");
const bodyParser = require('body-parser');
const db = require("./app/models");
const User = db.users;

const bucketName = process.env.RDS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const imageKey = "profile_photo" + Math.floor(Math.random())
console.log('bucket', bucketName)
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey
})

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

exports.uploadFileToS3 = (req, res, file) => {

    let result = User.findOne({
        where: {
          username:global.username
        }
      });
    const id = result.id;

      const Key = makeid(10) + "/" + imageKey
      const random = Math.floor(Math.random())
      const uploadParams = {
      Bucket: bucketName,
      Body: req.body,
      Key: Key
      }
     return s3.upload(uploadParams).promise()
      
 
    }
    // var file = req.files.file

    exports.deleteFileFromS3 = (req,res,result) => {
      console.log("result", result)
      const params1 = {
          Bucket: bucketName,
          Key: Key
      }
      return s3.deleteObject(params1).promise()
    
    }
    
    
    
  

//   let uploadFileToS3Middleware = util.promisify(uploadFileToS3)

// module.exports = uploadFileToS3
