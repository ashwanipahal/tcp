import awsAppSync from '../awsAppSync';

jest.mock('aws-appsync');

it('awsAppSync client | getClient', () => {
  const client = awsAppSync.getClient();
  expect(client).toHaveProperty('executeQuery');
});
