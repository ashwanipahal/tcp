import HomePageLayout from '../../abstractors/bootstrap/layout/mock';
import ModuleDMock from '../../abstractors/common/moduleD/mock';
import QueryBuilder from '../graphQL/queries/queryBuilder';
import { fetchDataFromGraphQL, executeGraphQLQuery } from '../handler';
import endpoints from '../../endpoints';
import { awsAppSync as config } from '../../config';

jest.mock('../../../utils/utils');
jest.mock('../graphQL/graphQLClient');
jest.mock('../graphQL/queries/queryBuilder');

it('service handler | fetchDataFromGraphQL', () => {
  fetchDataFromGraphQL({
    name: 'layout',
    data: {
      path: '/homepage',
    },
  }).then(data => {
    expect(data).toMatchObject(HomePageLayout);
  });
});

it('service handler | executeGraphQLQuery | ModuleD', () => {
  const query = QueryBuilder.getQuery({
    name: 'moduleD',
    data: {
      slot: 'moduleD',
      contentId: '73f6a699-79a4-4874-994f-ab306dd66dca',
    },
  });
  executeGraphQLQuery(query).then(data => {
    expect(data).toMatchObject(ModuleDMock);
  });
});

it('service handler | executeGraphQLQuery | ModuleH', () => {
  const query = QueryBuilder.getQuery({
    name: 'moduleH',
    data: {
      slot: 'moduleH',
      contentId: 'c755fe7e-5811-4039-ba96-7efc0a2d2d64',
    },
  });
  executeGraphQLQuery(query).then(data => {
    expect(data).toMatchObject(ModuleDMock);
  });
});

it('endpoints', () => {
  expect(endpoints).toMatchObject({
    graphQL: config.aws_appsync_graphqlEndpoint,
  });
});
