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
      console[type](message);
    };
    return {
      log: (...msg) => formatMessage(msg, 'log'),
      warn: (...msg) => formatMessage(msg, 'warn'),
      info: (...msg) => formatMessage(msg, 'info'),
      error: (...msg) => formatMessage(msg, 'error'),
      debug: (...msg) => formatMessage(msg, 'log'),
    };
  }
}

module.exports = ClientLogger;
