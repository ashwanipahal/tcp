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
    previewDate: undefined,
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
      previewDate: '23102019',
      previewDateEnv: '23102019',
    }));
    const query = await QueryBuilder.loadModuleQuery('layout', { path: 'homepage' });
    expect(query).toContain('is_preview');
    expect(query).toContain('preview_token');
    expect(query).toContain('preview_date');
  });

  it('addPreviewQueryMeta | no date or token', async () => {
    getAPIConfig.mockImplementation(() => ({
      isPreviewEnv: true,
      previewToken: undefined,
      previewDate: undefined,
    }));
    const query = await QueryBuilder.loadModuleQuery('layout', { path: 'homepage' });
    expect(query).toContain('is_preview');
    expect(query).not.toContain('preview_token');
    expect(query).not.toContain('preview_date');
  });
});
