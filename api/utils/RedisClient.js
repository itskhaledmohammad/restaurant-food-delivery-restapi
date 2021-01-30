const redis = require('redis');
const redisConfig = require('@config/redis.settings.js');
const { promisify } = require('util');

const redisClient = redis.createClient(redisConfig.development);

module.exports = {
  ...redisClient,
  getAsync: promisify(redisClient.get).bind(redisClient),
  setAsync: promisify(redisClient.set).bind(redisClient),
  delAsync: promisify(redisClient.del).bind(redisClient),
  keysAsync: promisify(redisClient.keys).bind(redisClient)
};
