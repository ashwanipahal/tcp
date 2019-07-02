import LabelsAbstractor from '../labels';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('Label Abstractor | ', () => {
  LabelsAbstractor.getData('labels', {
    category: 'global',
    subCategory: 'footer',
    brand: 'TCP',
    country: 'USA',
    channel: 'Desktop',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('Labels Abstractor | getMock', () => {
  const data = LabelsAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
