import ModuleLAbstractor from '../categoryPromo';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('categoryPromo Abstractor | getData', () => {
  ModuleLAbstractor.getData('categoryPromo', {
    contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    slot: 'categoryPromo',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('categoryPromo Abstractor | getMock', () => {
  const data = ModuleLAbstractor.getMock();
  expect(data).toMatchObject(mock);
});

it('categoryPromo Abstractor | processData', () => {
  ModuleLAbstractor.processData();
});
