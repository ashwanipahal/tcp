import ModuleKAbstractor from '../moduleK';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleK Abstractor | getData', () => {
  ModuleKAbstractor.getData('moduleK', {
    contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    slot: 'moduleK',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleK Abstractor | getMock', () => {
  const data = ModuleKAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('ModuleK Abstractor | processData', () => {
  ModuleKAbstractor.processData();
});
