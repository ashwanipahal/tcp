import bootstrap, { retrieveCachedData } from '../bootstrap';
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
    bootstrap(['homepage'], null, {}).then(data => {
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
      expect(data.labels).toMatchObject(LabelsAbstractor.getModulesFromLayout(labelsMock));
      expect(data.header).toMatchObject(HeaderAbstractor.getModulesFromLayout(headerMock));
      expect(data.footer).toMatchObject(FooterAbstractor.getModulesFromLayout(footerMock));
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
