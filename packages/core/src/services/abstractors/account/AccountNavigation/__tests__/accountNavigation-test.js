import AccountNavigationAbstractor from '../AccountNavigation';
import mock from '../mock';

jest.mock('../../../../handler/handler');

it('Account Navigation Abstractor | ', () => {
  AccountNavigationAbstractor.getData('AccountNavigation', {
    brand: 'TCP',
    country: 'USA',
    channel: 'Desktop',
  }).then(data => {
    expect(data).toMatchObject(AccountNavigationAbstractor.processData(mock));
  });
});

it(' Account Navigation | getMock', () => {
  const data = AccountNavigationAbstractor.getMock();
  expect(data).toMatchObject(AccountNavigationAbstractor.processData(mock));
});
