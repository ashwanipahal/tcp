import gql from 'graphql-tag';
import fetch from 'node-fetch';
import graphQLClient from '../graphQLClient';
import { awsAppSync as config } from '../../../config';
import ModuleDQuery from '../queries/moduleD/moduleD.query';
import ModuleDMock from '../../../abstractors/common/moduleD/mock';

jest.mock('../../../../utils/utils');

if (!process.browser) {
  global.fetch = fetch;
}

const testQuery = ModuleDQuery.getQuery({
  path: 'homepage',
});
let testBuildQuery = `query fetchCMSData {`;
testBuildQuery += `

  ${testQuery}

`;
testBuildQuery += `}`;

const testGqlQuery = gql(testBuildQuery);

const testClientOptions = {
  url: config.aws_appsync_graphqlEndpoint,
  region: config.aws_appsync_region,
  auth: {
    type: config.aws_appsync_authenticationType,
    apiKey: config.aws_appsync_apiKey,
  },
  disableOffline: true,
};

it('awsAppSync client | getClient', () => {
  const client = graphQLClient.getClient();
  expect(client).toHaveProperty('executeQuery');
});

it('awsAppSync client | clientOptions', () => {
  const options = graphQLClient.clientOptions();
  expect(options).toMatchObject(testClientOptions);
});

it('awsAppSync client | executeQuery', () => {
  const client = graphQLClient.getClient();
  client.executeQuery(testGqlQuery).then(data => {
    expect(data).toMatchObject(ModuleDMock);
  });
});
