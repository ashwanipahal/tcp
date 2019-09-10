// eslint-disable-next-line global-require
const bunyan = require('bunyan');

const DEFAULT_LOG_LEVEL = 'error';
const DEFAULT_LOGGER = 'DEFAULT_LOGGER';
class ServerLogger {
  constructor(customLogStream) {
    this.customLogStream = customLogStream;
  }

  /**
   * Get the process identifier string for the log statement
   * @param {string} pid process id
   * @returns {String} String consisting of process id
   */
  static getFormattedProcessID(pid) {
    return pid ? ` [PROCESS ID: ${pid}]` : '';
  }

  /**
   * Get the message with other params
   * @param {Object} messageObject consisting of msg and restParams
   * @returns {String} Formatted message string
   */
  static getFormattedMessage({ msg, restParams }) {
    let params = '';
    Object.keys(restParams).forEach(item => {
      params += ` ${item}=${restParams[item]} |`;
    });
    return msg ? `${msg} |` : params;
  }

  /**
   * Get the formatted src information
   * @param {Object} src source information of the logger
   * @returns {String} Formatted src data
   */
  static getFormattedSrcData({ file, line, func }) {
    const filePath = file.split('/');
    const filePathLength = filePath.length;
    const formattedFilePath = `${filePath[filePathLength - 2]}/${filePath[filePathLength - 1]}`;
    return `[LINE_NUMBER: ${line} - FUNCTION_NAME: ${func} - FILE_PATH: ${formattedFilePath}]`;
  }

  /**
   * Achieve the following format for the log statement:
   * 2019-09-02T09:27:21.867Z [<PROCESS_ID>] | [<LOGGER_NAME>]
   * - <MESSAGE> || [<LINE_NUMBER> - <FUNCTION_NAME> - <FILE_PATH>] : [<LOG_LEVEL>]
   * @param {Object} customLogStream handler for custom formatting
   * @returns {String} Custom format for log
   */
  static streamFormatter(customLogStream) {
    return {
      write: options => {
        const optionObject = JSON.parse(options);
        if (customLogStream) {
          return customLogStream({ ...optionObject });
        }

        const { name, time, level, msg, hostname, src, pid, v, ...restParams } = JSON.parse(
          options
        );
        const { getFormattedProcessID, getFormattedMessage, getFormattedSrcData } = ServerLogger;

        const formatterLogLevel = bunyan.nameFromLevel[level];
        const formattedProcessID = getFormattedProcessID(pid);
        const formattedMessage = getFormattedMessage({ msg, restParams });
        const formattedSrcData = getFormattedSrcData(src);

        process.stdout.write(
          `${time} ${formattedProcessID} | [${name}] - ${formattedMessage}| ${formattedSrcData} : [${formatterLogLevel}]`
        );
        return true;
      },
    };
  }

  /**
   * Initialize logger
   * @param {String} loggerConfig contains configuration for logger initialization
   */
  initializeLogger({ loggerName = DEFAULT_LOGGER } = {}) {
    const { customLogStream } = this;
    const level = process.env.RWD_WEB_LOG_LEVEL || DEFAULT_LOG_LEVEL;
    return bunyan.createLogger({
      name: loggerName,
      level,
      stream: ServerLogger.streamFormatter(customLogStream),
      src: true,
      serializers: {
        err: bunyan.stdSerializers.err,
      },
    });
  }
}
module.exports = ServerLogger;
