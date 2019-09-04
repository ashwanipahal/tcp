const DEFAULT_LOG_METHOD = 'log';
const AVAILABLE_LOG_OPTIONS_LIST = ['log', 'warn', 'info', 'error', 'debug', 'trace', 'fatal'];

class ClientLogger {
  /**
   * Configuring logger at client side
   */
  // eslint-disable-next-line class-methods-use-this
  initializeLogger() {
    const formatMessage = (msg, type) => {
      let message = msg;
      message = msg.join(' ');
      try {
        message = JSON.stringify(message);
      } catch (err) {
        message = '';
      }
      // eslint-disable-next-line no-console
      console[console[type] ? type : DEFAULT_LOG_METHOD](message);
    };
    const availableLogOptions = {};
    AVAILABLE_LOG_OPTIONS_LIST.forEach(item => {
      availableLogOptions[item] = (...msg) => formatMessage(msg);
    });

    return {
      ...availableLogOptions,
    };
  }
}

module.exports = ClientLogger;
