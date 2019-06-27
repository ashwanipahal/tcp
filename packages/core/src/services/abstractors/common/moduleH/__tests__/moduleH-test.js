import ModuleHAbstractor from '../moduleH';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleH Abstractor | getData', () => {
  ModuleHAbstractor.getData('moduleD', {
    contentId: '73f6a699-79a4-4874-994f-ab306dd66dca',
    slot: 'moduleD',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleH Abstractor | getMock', () => {
  const data = ModuleHAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
