const { minioClient } = require('../lib/minio');
const config = require('../config');

async function listObjectAsync() {
  return new Promise((resolve, reject) => {
    const objects = [];
    const stream = minioClient.listObjects(config.minio.bucketName, '', true); // Recursive

    stream.on('data', (obj) => {
      objects.push(obj);
    });

    stream.on('error', (err) => {
      reject(err);
    });

    stream.on('end', () => {
      resolve(objects);
    });
  });
}

async function presignedGetObjectAsync(key, expiresIn = 3600) {
  return new Promise((resolve, reject) => {
    minioClient.presignedGetObject(
      config.minio.bucketName,
      key,
      expiresIn,
      (err, presignedUrl) => {
        if (err) {
          reject(err);
        } else {
          resolve(presignedUrl);
        }
      }
    );
  });
}

async function uploadFileAsync(objectName, stream) {
  return new Promise((resolve, reject) => {
    minioClient.putObject(
      config.minio.bucketName,
      objectName,
      stream,
      (err, objInfo) => {
        if (err) {
          reject(err);
        } else {
          resolve(objInfo);
        }
      }
    );
  });
}

async function statObjectAsync(objectName) {
  return new Promise((resolve, reject) => {
    minioClient.statObject(
      config.minio.bucketName,
      objectName,
      (error, stat) => {
        if (error) {
          if (error.code === 'NotFound') {
            resolve(null); // Object doesn't exist
          } else {
            reject(error); // Other errors
          }
        } else {
          resolve(stat); // Return the stat object
        }
      }
    );
  });
}

async function bucketExists() {
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(config.minio.bucketName, (error, exists) => {
      if (error) {
        reject(error);
      } else {
        resolve(exists);
      }
    });
  });
}

async function createBucket() {
  return new Promise((resolve, reject) => {
    minioClient.makeBucket(config.minio.bucketName, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

async function setBucketPolicy() {
  return new Promise((resolve, reject) => {
    const customPolicy = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: 'Allow',
          Principal: {
            AWS: ['*']
          },
          Action: ['s3:GetObject'],
          Resource: ['arn:aws:s3:::reward-service/*']
        }
      ]
    };

    const policy = JSON.stringify(customPolicy);

    minioClient.setBucketPolicy(config.minio.bucketName, policy, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}

function endpointURL() {
  let baseUrl = 'http://';
  if (config.minio.useSSL === 'true') {
    baseUrl = 'https://';
  }

  return `${baseUrl}${config.minio.endPoint}:${config.minio.port}/${config.minio.bucketName}`;
}

module.exports = {
  listObjectAsync,
  presignedGetObjectAsync,
  uploadFileAsync,
  statObjectAsync,
  endpointURL,
  bucketExists,
  createBucket,
  setBucketPolicy,
};
