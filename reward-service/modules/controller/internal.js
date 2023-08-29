const { EventEmitter } = require('events');
const config = require('../../config');
const { getClient } = require('../../db');
const { minioClient } = require('../../lib/minio');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { check } = require('express-validator');
const logger = require('../../util/logger');
const {
  uploadFileAsync,
  bucketExists,
  createBucket,
  setBucketPolicy,
} = require('../../util/minio');

class InternalController extends EventEmitter {
  constructor(userService) {
    super();
    this.userService = userService;
  }

  async health(req, res, next) {
    try {
      const service = `${config.app.name} v${config.app.version}`;
      const environment = config.app.env;

      let status = 'OK';
      const errors = [];

      // check mongodb
      let mongodb;
      try {
        const testMongodb = await checkMongodb();
        if (testMongodb) {
          mongodb = 'OK';
        } else {
          mongodb = 'DOWN';
        }
      } catch (e) {
        errors.push({
          service: 'mongodb',
          error: e.message,
        });

        mongodb = 'DOWN';
        status = 'WARNING';
      }

      // check minio
      let minioService;
      try {
        const checkminio = await checkMinio();
        minioService = 'DOWN';
        if (checkminio) {
          minioService = 'OK';
        }
      } catch (e) {
        errors.push({
          service: 'minio',
          error: e.message,
        });

        minioService = 'DOWN';
        status = 'WARNING';
      }

      res.success({
        service,
        environment,
        status,
        mongodb,
        minioService,
        errors,
      });
    } catch (e) {
      next(e);
    }
  }

  async createUser(req, res, next) {
    try {
      res.success(null);
    } catch (e) {
      next(e);
    }
  }

  async uploadFile(req, res, next) {
    try {
      res.success(null);
    } catch (e) {
      next(e);
    }
  }

  async syncFile(req, res, next) {
    try {
      const directoryPath = path.join(__dirname, '../../tmp');

      const bucketCheck = await bucketExists();
      if (!bucketCheck) {
        await createBucket();
        await setBucketPolicy();
      }

      fs.readdir(directoryPath, (err, files) => {
        if (err) {
          logger.error('Error reading directory', err);
          return;
        }

        // Process each file
        files.forEach((file) => {
          const filePath = path.join(directoryPath, file);
          const blob = fs.readFileSync(filePath);

          uploadFileAsync(file, blob)
            .then((result) => {
              logger.info('Upload file', result);
            })
            .catch((error) => {
              logger.error('Error Upload file', error);
            });
        });
      });

      res.success({message: 'Upload file has processed'});
    } catch (e) {
      next(e);
    }
  }
}

async function checkMongodb() {
  const mongoClient = await getClient();
  const ping = await mongoClient
    .db(config.mongodb.database)
    .command({ ping: 1 });
  if (ping.ok === 1) {
    return true;
  }
  return false;
}

async function checkMinio() {
  return new Promise((resolve, reject) => {
    minioClient.bucketExists(config.minio.bucketName, (err, exists) => {
      if (err) {
        reject(err);
      } else {
        resolve(exists);
      }
    });
  });
}

module.exports = InternalController;
