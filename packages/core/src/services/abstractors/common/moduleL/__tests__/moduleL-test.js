import ModuleLAbstractor from '../moduleL';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleK Abstractor | getData', () => {
  ModuleLAbstractor.getData('moduleL', {
    contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    slot: 'moduleL',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleL Abstractor | getMock', () => {
  const data = ModuleLAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('ModuleL Abstractor | processData', () => {
  ModuleLAbstractor.processData();
});
