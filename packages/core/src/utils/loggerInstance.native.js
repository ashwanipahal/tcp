const LoggerClass = require('./logger/clientLogger');

const Logger = new LoggerClass();

module.exports = Logger.initializeLogger();
