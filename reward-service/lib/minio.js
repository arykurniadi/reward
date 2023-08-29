const Minio = require('minio')
const config = require('../config');

const minioClient = new Minio.Client({
  endPoint: config.minio.endPoint,
  port: parseInt(config.minio.port, Number),
  useSSL: config.minio.useSSL === 'true' ?? false,
  accessKey: config.minio.accessKey,
  secretKey: config.minio.secretKey,
});

module.exports = {
  minioClient,
};
