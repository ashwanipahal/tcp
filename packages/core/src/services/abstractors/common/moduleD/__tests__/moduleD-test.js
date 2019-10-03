import ModuleDAbstractor from '../moduleD';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleD Abstractor | ', () => {
  ModuleDAbstractor.getData('moduleD', {
    contentId: 'moduleD',
    slot: 'moduleD',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleD Abstractor | getMock', () => {
  const data = ModuleDAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('ModuleA Abstractor | processData', () => {
  ModuleDAbstractor.processData();
});

it('ModuleA Abstractor | handleError', () => {
  ModuleDAbstractor.handleError();
});
