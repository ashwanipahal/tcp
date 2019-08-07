import ModuleAAbstractor from '../moduleA';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('ModuleA Abstractor | ', () => {
  ModuleAAbstractor.getData('moduleA', {
    contentId: 'f1733fc9-6db0-4042-9844-99980420359f',
    slot: 'moduleA',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('ModuleA Abstractor | getMock', () => {
  const data = ModuleAAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
