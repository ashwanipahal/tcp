import layoutAbstractor from '../layout';
import HomePageLayout from '../mock';
import ModuleDMock from '../../../common/moduleD/mock';
import ModuleHMock from '../../../common/moduleH/mock';

jest.mock('../../../../handler/handler');

it('abstractor - layout | getLayoutData', () => {
  return layoutAbstractor.getLayoutData('homepage').then(data => {
    expect(data).toMatchObject(HomePageLayout.homepage.items);
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

it('abstractor - layout | getMock', () => {
  const mock = layoutAbstractor.getMock();
  expect(mock).toMatchObject(HomePageLayout);
});
