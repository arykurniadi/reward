const { deepFreeze } = require('../util');

const config = {
  app: {
    env: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'app',
    port: Number(process.env.APP_PORT) || 3000,
    version: process.env.APP_VERSION,
    timezone: process.env.TZ || 'Asia/Jakarta',
    apiKey: process.env.APP_API_KEY,
    baseUrl: process.env.APP_BASE_URL,
    locale: process.env.APP_LOCALE || 'id',
  },
  auth: {
    jwtIssuer: process.env.AUTH_JWT_ISSUER,
    jwtSecret: process.env.AUTH_JWT_SECRET,
    jwtSecretCrm: process.env.AUTH_JWT_SECRET_CRM,
  },
  mongodb: {
    url: process.env.MONGODB_URL,
    database: process.env.MONGODB_DATABASE,
  },
  query: {
    limitDefault: Number(process.env.QUERY_LIMIT_DEFAULT) || 10,
    sortDefault: process.env.QUERY_SORT_DEFAULT || 'created_at desc',
  },

  minio: {
    endPoint: process.env.MINIO_ENDPOINT,
    port: process.env.MINIO_PORT,
    useSSL: process.env.MINIO_USESSL,
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
    region: process.env.MINIO_REGION,
    bucketName: process.env.MINIO_BUCKET,
  },

};

module.exports = deepFreeze(config);
