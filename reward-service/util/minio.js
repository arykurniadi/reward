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
    minioClient.presignedGetObject(config.minio.bucketName, key, expiresIn, (err, presignedUrl) => {
      if (err) {
        reject(err);
      } else {
        resolve(presignedUrl);
      }
    });
  });
}

async function uploadFileAsync(objectName, stream) {
  return new Promise((resolve, reject) => {
    minioClient.putObject(config.minio.bucketName, objectName, stream, (err, objInfo) => {
      if (err) {
        reject(err);
      } else {
        resolve(objInfo);
      }
    });
  });
}

async function statObjectAsync(objectName) {
  return new Promise((resolve, reject) => {
    minioClient.statObject(config.minio.bucketName, objectName, (error, stat) => {
      if (error) {
        if (error.code === 'NotFound') {
          resolve(null); // Object doesn't exist
        } else {
          reject(error); // Other errors
        }
      } else {
        resolve(stat); // Return the stat object
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
};
