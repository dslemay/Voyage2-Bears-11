const prod = require('./prod');
const dev = require('./dev');

if (process.env.NODE_ENV === 'production') {
  // we are in production - return prod keys
  module.exports = prod;
} else {
  // we are in development - return dev keys
  module.exports = dev;
}
