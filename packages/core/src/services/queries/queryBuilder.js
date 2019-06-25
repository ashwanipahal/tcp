import gql from 'graphql-tag';
import { importGraphQLQueriesDynamically } from '../../utils';

const QueryBuilder = {
  getQuery: async modules => {
    const queriesList = await QueryBuilder.loadQueriesList(modules);
    const finalQuery = QueryBuilder.buildQuery(queriesList);
    return QueryBuilder.wrapQuery(finalQuery);
  },
  loadModuleQuery: async (module, data) => {
    return importGraphQLQueriesDynamically(module).then(({ default: QueryModule }) => {
      return QueryModule.getQuery(data);
    });
  },
  wrapQuery: query => {
    return gql(query);
  },
  buildQuery: queriesList => {
    let finalQuery = `query fetchCMSData {`;
    queriesList.forEach(query => {
      finalQuery += `

        ${query}

      `;
    });
    finalQuery += `}`;
    return finalQuery;
  },
  loadQueriesList: async modules => {
    const queriesList = [];
    if (modules.length) {
      for (let i = 0; i < modules.length; i += 1) {
        const module = modules[i];
        // eslint-disable-next-line no-await-in-loop
        const query = await QueryBuilder.loadModuleQuery(module.name, module.data);
        queriesList.push(query);
      }
    } else {
      const query = await QueryBuilder.loadModuleQuery(modules.name, modules.data);
      queriesList.push(query);
    }
    return queriesList;
  },
};

export default QueryBuilder;
