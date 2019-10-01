import ModuleHAbstractor from '../moduleH';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleH Abstractor | getData', () => {
  ModuleHAbstractor.getData('moduleH', {
    contentId: 'moduleH',
    slot: 'moduleH',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleH Abstractor | getMock', () => {
  const data = ModuleHAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('ModuleH Abstractor | processData', () => {
  ModuleHAbstractor.processData();
});
