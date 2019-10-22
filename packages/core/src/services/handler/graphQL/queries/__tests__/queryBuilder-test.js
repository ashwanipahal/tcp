import gql from 'graphql-tag';
import QueryBuilder from '../queryBuilder';
import LayoutQuery from '../layout/layout.query';
import { getAPIConfig } from '../../../../../utils';

jest.mock('../../../../../utils/utils.web');
jest.mock('../../../../../utils/utils');

describe('Query Builder', () => {
  const testQuery = LayoutQuery.getQuery({
    path: 'homepage',
  });
  let testBuildQuery = `query fetchCMSData {`;
  testBuildQuery += `

    ${testQuery}

  `;
  testBuildQuery += `}`;

  const testGqlQuery = gql(testBuildQuery);

  getAPIConfig.mockImplementation(() => ({
    isPreviewEnv: undefined,
    previewToken: undefined,
  }));

  it('getQuery', async () => {
    const query = await QueryBuilder.getQuery({
      name: 'layout',
      data: {
        path: 'homepage',
      },
    });
    expect(query).toMatchObject(testGqlQuery);
  });

  it('loadModuleQuery', async () => {
    const query = await QueryBuilder.loadModuleQuery('layout', { path: 'homepage' });
    expect(query).toContain(testQuery);
  });

  it('wrapQuery', () => {
    const query = QueryBuilder.wrapQuery(testBuildQuery);
    expect(query).toMatchObject(testGqlQuery);
  });

  it('buildQuery', () => {
    const query = QueryBuilder.buildQuery([testQuery]);
    expect(query).toEqual(expect.not.stringMatching(testBuildQuery));
  });

  it('loadQueriesList', async () => {
    const queriesList = await QueryBuilder.loadQueriesList({
      name: 'layout',
      data: {
        path: 'homepage',
      },
    });
    expect(queriesList).toMatchObject([testQuery]);
  });

  it('loadQueriesList | array input', async () => {
    const queriesList = await QueryBuilder.loadQueriesList([
      {
        name: 'layout',
        data: {
          path: 'homepage',
        },
      },
    ]);
    expect(queriesList).toMatchObject([testQuery]);
  });

  it('addPreviewQueryMeta', async () => {
    getAPIConfig.mockImplementation(() => ({
      isPreviewEnv: true,
      previewToken: 'TEST',
    }));
    const query = await QueryBuilder.loadModuleQuery('layout', { path: 'homepage' });
    expect(query).toContain('is_preview');
    expect(query).toContain('preview_token');
  });
});
