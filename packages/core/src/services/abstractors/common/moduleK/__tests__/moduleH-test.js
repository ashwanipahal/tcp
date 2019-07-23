import ModuleHAbstractor from '../moduleK';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleK Abstractor | getData', () => {
  ModuleHAbstractor.getData('moduleK', {
    contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    slot: 'moduleK',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleK Abstractor | getMock', () => {
  const data = ModuleHAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
