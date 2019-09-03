import LogHandler from '../logger';

describe('LogHandler', () => {
  test('default', () => {
    const loggerClass = new LogHandler();
    const logger = loggerClass.initializeLogger();
    logger.error('mock log');
    logger.info({
      customProp1: 'test',
    });
    expect(typeof logger).toBe('object');
  });

  test('with customLogger', () => {
    const customLogger = () => {
      return 'test';
    };
    const loggerClass = new LogHandler(customLogger);
    const logger = loggerClass.initializeLogger();
    logger.error('mock log');
    logger.info({
      customProp1: 'test',
    });
    expect(typeof logger).toBe('object');
  });

  describe('utils', () => {
    test('getFormattedProcessID', () => {
      const processID = LogHandler.getFormattedProcessID();
      expect(processID).toEqual('');
    });

    test('getFormattedMessage', () => {
      const processID = LogHandler.getFormattedMessage({ restParams: { customProp1: 'test' } });
      expect(processID).toEqual(' customProp1=test |');
    });
  });
});
