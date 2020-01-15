const AWS = require('aws-sdk');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});
const params = {
    Bucket: 'data-dev-incoming',
    Key: 'bigfile.xml', // big file
    ResponseContentEncoding: 'utf-16le'
};

const file = require('fs').createWriteStream('./file.xml');
s3.getObject(params).createReadStream().setEncoding('utf-16le').pipe(file);

