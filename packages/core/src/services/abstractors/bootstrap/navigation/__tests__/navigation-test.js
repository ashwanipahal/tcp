import NavigationAbstractor from '../navigation';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('Navigation Abstractor | ', () => {
  NavigationAbstractor.getData('header', {
    type: 'header',
    brand: 'TCP',
    country: 'USA',
    channel: 'Desktop',
  }).then(data => {
    expect(data).toMatchObject(mock);
  });
});
it('NavigationAbstractor Abstractor | getMock', () => {
  const data = NavigationAbstractor.getMock();
  expect(data).toMatchObject(NavigationAbstractor.processData(mock.data.navigation));
});
