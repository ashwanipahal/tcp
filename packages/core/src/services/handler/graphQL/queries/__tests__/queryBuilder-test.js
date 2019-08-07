import gql from 'graphql-tag';
import QueryBuilder from '../queryBuilder';
import LayoutQuery from '../layout/layout.query';

jest.mock('../../../../../utils/utils.web');
jest.mock(`../../../../../utils/utils`);

const testQuery = LayoutQuery.getQuery({
  path: 'homepage',
});
let testBuildQuery = `query fetchCMSData {`;
testBuildQuery += `

  ${testQuery}

`;
testBuildQuery += `}`;

const testGqlQuery = gql(testBuildQuery);

it('Query Builder | getQuery', async () => {
  const query = await QueryBuilder.getQuery({
    name: 'layout',
    data: {
      path: 'homepage',
    },
  });
  expect(query).toMatchObject(testGqlQuery);
});

it('Query Builder | loadModuleQuery', async () => {
  const query = await QueryBuilder.loadModuleQuery('layout', { path: 'homepage' });
  expect(query).toContain(testQuery);
});

it('Query Builder | wrapQuery', () => {
  const query = QueryBuilder.wrapQuery(testBuildQuery);
  expect(query).toMatchObject(testGqlQuery);
});

it('Query Builder | buildQuery', () => {
  const query = QueryBuilder.buildQuery([testQuery]);
  expect(query).toEqual(expect.not.stringMatching(testBuildQuery));
});

it('Query Builder | loadQueriesList', async () => {
  const queriesList = await QueryBuilder.loadQueriesList({
    name: 'layout',
    data: {
      path: 'homepage',
    },
  });
  expect(queriesList).toMatchObject([testQuery]);
});
