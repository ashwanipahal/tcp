import SEODataAbstractor from '../seoData';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('Label Abstractor | ', () => {
  SEODataAbstractor.getData('seoData', {
    page: '/home',
    brand: 'TCP',
    country: 'USA',
    channel: 'Desktop',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('Labels Abstractor | getMock', () => {
  const data = SEODataAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
