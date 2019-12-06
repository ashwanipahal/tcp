import bootstrap, {
  retrieveCachedData,
  shouldInitiateSSRCall,
  checkAndLogErrors,
} from '../bootstrap';
import labelsMock from '../labels/mock';
import headerMock from '../header/mock';
import footerMock from '../footer/mock';
import FooterAbstractor from '../footer';
import HeaderAbstractor from '../header';
import LabelsAbstractor from '../labels';

jest.mock('../layout/layout');
jest.mock('../../../handler/handler');

describe('abstractor - bootstrap', () => {
  const abstractorBootstrap = () =>
    bootstrap('homepage', null, {}).then(data => {
      expect(data.homepage.items[0].layout.slots[0]).toHaveProperty(
        'name',
        'moduleName',
        'contentId'
      );
      expect(data.homepage.items[0].layout.slots[1]).toHaveProperty(
        'name',
        'moduleName',
        'contentId'
      );

      expect(data.homepage.items[0].layout.slots[0].moduleName).toEqual('moduleD');
      expect(data.homepage.items[0].layout.slots[1].moduleName).toEqual('moduleH');
      expect(data.labels).toMatchObject(LabelsAbstractor.processData(labelsMock));
      expect(data.header).toMatchObject(HeaderAbstractor.processData(headerMock));
      expect(data.footer).toMatchObject(FooterAbstractor.processData(footerMock));
    });

  it('bootstrap - redis disabled', () => {
    return abstractorBootstrap();
  });

  it('bootstrap - redis enabled', () => {
    global.redisClient = {
      connected: true,
    };
    return abstractorBootstrap();
  });
});

describe('retrieveCachedData', () => {
  it('retrieveCachedData - cachedData', () => {
    const cachedData = {
      test: 'val',
    };
    const key = 'test';
    const bootstrapData = {
      ...cachedData,
    };
    expect(bootstrapData[key]).toEqual(retrieveCachedData({ cachedData, key, bootstrapData }));
  });
});

describe('shouldInitiateSSRCall', () => {
  it('shouldInitiateSSRCall - default', () => {
    expect(shouldInitiateSSRCall('/us/c/boys-outfits', 'bot')).toBeFalsy();
  });
});

describe('checkAndLogErrors', () => {
  it('checkAndLogErrors - default', () => {
    const bootstrapData = {
      labels: [{ errorMessage: 'error' }],
      header: { errorMessage: 'error' },
      footer: { errorMessage: 'error' },
      home: { errorMessage: 'error' },
      navigation: [{ errorMessage: 'error' }],
    };
    const returnValue = {
      footer_error: 1,
      footer_error_message: 'error',
      header_error: 1,
      header_error_message: 'error',
      labels_error: 1,
      labels_error_message: 'error',
      layout_error: 1,
      layout_error_message: 'error',
      navigation_error: 1,
      navigation_error_message: 'error',
    };
    expect(checkAndLogErrors(bootstrapData, 'home')).toEqual(returnValue);
  });
});
