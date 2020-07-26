// This example is closely related to Postgres's raw encryption functions

const crypto = require('crypto');

const iv = Buffer.alloc(16); // zeroed-out iv

function encrypt(plainText, algorithm, key) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

function decrypt(encrypted, algorithm, key) {
  const decrypt = crypto.createDecipheriv(algorithm, key, iv);
  let text = decrypt.update(encrypted, 'base64', 'utf8');
  text += decrypt.final('utf8')
  return text;
}

const originalText = "hello world";
const userKey = 'abcd'
const algorithm = 'aes-128-cbc';

const paddedKey = Buffer.concat([Buffer.from(userKey), Buffer.alloc(12)]);

const hw = encrypt(originalText, algorithm, paddedKey);
console.log("original", originalText);
console.log("encrypted:", hw);
console.log("decoded: ", decrypt(hw, algorithm, paddedKey).toString());
