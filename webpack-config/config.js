const path = require('path');
const { NODE_ENV, WEBPACK_DEV_SERVER } = process.env;
const IS_DEV = NODE_ENV !== 'production';
const IS_DEVSERVER = WEBPACK_DEV_SERVER === 'true';

const CONFIG = {
  development: {
    PROJECT_PATH: path.resolve(__dirname, '../'),
    IS_DEV,
    IS_DEVSERVER,
    BASE_URL: '',
  },
  production: {
    PROJECT_PATH: path.resolve(__dirname, '../'),
    IS_DEV,
    IS_DEVSERVER,
    BASE_URL: '',
  },
};

module.exports = CONFIG[NODE_ENV || 'development'];
