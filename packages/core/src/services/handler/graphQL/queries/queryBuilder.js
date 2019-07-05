import gql from 'graphql-tag';
// import { importGraphQLQueriesDynamically } from '../../../../utils';
import gqlQuery from './layout';

/**
 * Builds query for GraphQL service
 */
const QueryBuilder = {
  /**
   * Async function which returns query for single or list of modules
   */
  getQuery: async modules => {
    const queriesList = await QueryBuilder.loadQueriesList(modules);
    const finalQuery = QueryBuilder.buildQuery(queriesList);
    return QueryBuilder.wrapQuery(finalQuery);
  },
  /**
   * Async function which dynamically loads query for a module
   * @param {String} module
   * @param {Object} data
   */
  loadModuleQuery: async (module, data) => {
    return gqlQuery.then(({ default: QueryModule }) => {
      return QueryModule.getQuery(data);
    });
  },
  /**
   * This function wraps query with graphql-tag
   */
  wrapQuery: query => {
    return gql(query);
  },
  /**
   * This is a helper function which concatenates separate queries into one single query
   * @param {Array} queriesList
   */
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
  /**
   * This function fetches queries dynamically for a list of modules or a single module
   * @param {Object|Array} modules Either object or array of objects with below structure
   * {
   *    name: "moduleD",
   *    data: {
   *
   *    }
   * }
   */
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
