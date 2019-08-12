import ModuleAAbstractor from '../moduleN';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleA Abstractor | ', () => {
  ModuleAAbstractor.getData('moduleN', {
    contentId: '73f6a699-79a4-4874-994f-asd234fa34s',
    slot: 'moduleN',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleA Abstractor | getMock', () => {
  const data = ModuleAAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
