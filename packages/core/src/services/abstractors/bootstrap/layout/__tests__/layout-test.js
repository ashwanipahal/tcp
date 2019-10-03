import layoutAbstractor from '../layout';
import HomePageLayoutMockResponse from '../mock';
import ModuleDMock from '../../../common/moduleD/mock';
import ModuleHMock from '../../../common/moduleH/mock';

jest.mock('../../../../handler/handler');

it('abstractor - layout | getLayoutData', () => {
  return layoutAbstractor
    .getLayoutData({
      page: 'homepage',
      brand: 'TCP',
      channel: 'Desktop',
      country: 'USA',
    })
    .then(data => {
      expect(data).toMatchObject(HomePageLayoutMockResponse.homepage);
    });
});

it('abstractor - layout | getModulesData', () => {
  return layoutAbstractor
    .getModulesData([
      {
        name: 'moduleD',
      },
      {
        name: 'moduleH',
      },
    ])
    .then(data => {
      expect(data.data.moduleD).toMatchObject(ModuleDMock);
      expect(data.data.moduleH).toMatchObject(ModuleHMock);
    });
});

it('abstractor - layout | getModulesFromLayout', () => {
  return layoutAbstractor.getModulesFromLayout(HomePageLayoutMockResponse.homepage).then(data => {
    expect(data.moduleD).toMatchObject(ModuleDMock.composites);
    expect(data.moduleH).toMatchObject(ModuleHMock.composites);
  });
});

it('abstractor - layout | getMock', () => {
  const mock = layoutAbstractor.getMock();
  expect(mock).toMatchObject(HomePageLayoutMockResponse);
});
