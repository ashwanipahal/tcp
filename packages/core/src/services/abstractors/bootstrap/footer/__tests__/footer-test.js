import footer from '../footer';
import FooterMock from '../mock';

jest.mock('../../../../handler/handler');

it('Footer Abstractor | ', () => {
  footer
    .getData('footer', {
      type: 'footer',
      brand: 'TCP',
      country: 'USA',
      channel: 'Desktop',
    })
    .then(data => {
      expect(data).toMatchObject(footer.processData(FooterMock));
    });
});
