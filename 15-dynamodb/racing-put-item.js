const AWS = require('aws-sdk');

AWS.config.setPromisesDependency(null);

const ddb = new AWS.DynamoDB({
  region: 'ap-southeast-2',
  //accessKeyId: awsAccessKey,
  //secretAccessKey: awsSecretKey
});

const tableName = "ddb-example"

const put = ({ pKey, sKey, value }) => ddb.putItem({
	Item: {
		pKey: {
			S: pKey 
		},
		sKey: {
			S: sKey 
		},
		value: {
			S: JSON.stringify(value)
		}
	},
	TableName: tableName,
  ReturnValues: 'ALL_OLD'
}).promise();

const insert1 = put({pKey: 'A', sKey: '1', value: {test: 'insert1'} });
const insert2 = put({pKey: 'A', sKey: '1', value: {test: 'insert2'} });

Promise.all([insert1, insert2]).then(([r1, r2]) => {
  console.log('r1=', r1);
  console.log('r2=', r2);
}).catch(e => console.error(e));

