module.exports = process.browser ? require('./clientLogger') : require('./serverLogger');
