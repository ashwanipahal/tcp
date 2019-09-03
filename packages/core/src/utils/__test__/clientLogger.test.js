import LogHandler from '../logger/clientLogger';

describe('LogHandler', () => {
  test('default', () => {
    const loggerClass = new LogHandler();
    const logger = loggerClass.initializeLogger();
    logger.error('mock log');
    logger.warn('mock log');
    logger.info({ test: 'mock' });
    logger.debug('mock log');
    logger.log('mock log');
  });
});
