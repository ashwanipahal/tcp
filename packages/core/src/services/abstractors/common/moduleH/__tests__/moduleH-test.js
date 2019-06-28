import ModuleHAbstractor from '../moduleH';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleH Abstractor | getData', () => {
  ModuleHAbstractor.getData('moduleH', {
    contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    slot: 'moduleH',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleH Abstractor | getMock', () => {
  const data = ModuleHAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
