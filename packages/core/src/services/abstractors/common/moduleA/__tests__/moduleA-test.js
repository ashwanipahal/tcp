import ModuleAAbstractor from '../moduleA';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleA Abstractor | ', () => {
  ModuleAAbstractor.getData('moduleA', {
    contentId: '73f6a699-79a4-4874-994f-asd234fa34s',
    slot: 'moduleA',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleA Abstractor | getMock', () => {
  const data = ModuleAAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
