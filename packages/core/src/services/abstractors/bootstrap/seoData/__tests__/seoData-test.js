import SEODataAbstractor from '../seoData';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('SEO Data Abstractor | ', () => {
  SEODataAbstractor.getData('seoData', {
    page: '/home',
    brand: 'TCP',
    country: 'USA',
    channel: 'Desktop',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});

it('SEO Data Abstractor | getMock', () => {
  const data = SEODataAbstractor.getMock();
  expect(data).toMatchObject(mock);
});
