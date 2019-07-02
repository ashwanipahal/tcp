import HeaderAbstractor from '../header';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('Header Abstractor | ', () => {
  HeaderAbstractor.getData('header', {
    type: 'header',
    brand: 'TCP',
    country: 'USA',
    channel: 'Desktop',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});
it('Header Abstractor | getMock', () => {
  const data = HeaderAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
