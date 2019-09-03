/* eslint-disable global-require */
module.exports = process.browser ? require('./clientLogger') : require('./serverLogger');
