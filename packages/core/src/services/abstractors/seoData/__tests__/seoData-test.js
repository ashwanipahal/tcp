import SEODataAbstractor from '../seoData';
import mock from '../mock';

jest.mock('../../../handler/handler');

it('SEO Data Abstractor | getData', () => {
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

it('SEO Data Abstractor | processData', () => {
  const data = SEODataAbstractor.processData(mock);
  expect(data.plp).toEqual({
    pageTitle: 'PLP',
    keywords: 'seo, tcp',
    description: 'this is my plp seo desc',
    robotsInfo: null,
    canonicalUrl: null,
    hrefLang: null,
    thumbnailUrl: null,
  });
});
