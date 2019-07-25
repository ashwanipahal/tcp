import ModuleDAbstractor from '../moduleD';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleD Abstractor | ', () => {
  ModuleDAbstractor.getData('moduleD', {
    contentId: '73f6a699-79a4-4874-994f-ab306dd66dca',
    slot: 'moduleD',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleH Abstractor | getMock', () => {
  const data = ModuleDAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
