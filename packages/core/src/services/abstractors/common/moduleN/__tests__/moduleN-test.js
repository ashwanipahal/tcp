import ModuleNAbstractor from '../moduleN';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleN Abstractor | ', () => {
  ModuleNAbstractor.getData('moduleN', {
    contentId: '73f6a699-79a4-4874-994f-asd234fa34s',
    slot: 'moduleN',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleN Abstractor | getMock', () => {
  const data = ModuleNAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('ModuleN Abstractor | processData', () => {
  ModuleNAbstractor.processData();
});
