import ModuleRAbstractor from '../moduleR';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleR Abstractor | ', () => {
  ModuleRAbstractor.getData('moduleR', {
    contentId: '73f6a699-79a4-4874-994f-asd234fa34s',
    slot: 'moduleR',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleR Abstractor | getMock', () => {
  const data = ModuleRAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('ModuleR Abstractor | processData', () => {
  ModuleRAbstractor.processData();
});
