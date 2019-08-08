import ModuleHAbstractor from '../moduleN';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleN Abstractor | getData', () => {
  ModuleHAbstractor.getData('moduleN', {
    contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    slot: 'moduleN',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleN Abstractor | getMock', () => {
  const data = ModuleHAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
