const clientConfig = require('./cfg/webpack.client.config');
const serverConfig = require('./cfg/webpack.server.config');

const NODE_ENV = process.env.NODE_ENV;

module.exports = [clientConfig, serverConfig];
