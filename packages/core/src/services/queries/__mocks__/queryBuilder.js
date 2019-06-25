import gql from 'graphql-tag';
import LayoutQuery from '../layout/layout.query';
import ModuleDQuery from '../moduleD/moduleD.query';
import ModuleHQuery from '../moduleH/moduleH.query';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

const QueryBuilder = {
  getQuery: async modules => {
    return new Promise(resolve => {
      let finalQuery = '';
      if (modules.name === 'layout') {
        finalQuery = LayoutQuery.getQuery(modules.data);
      }
      if (modules.name === 'moduleD') {
        finalQuery = ModuleDQuery.getQuery(modules.data);
      }
      if (modules.name === 'moduleH') {
        finalQuery = ModuleHQuery.getQuery(modules.data);
      }
      sendResponse(QueryBuilder.wrapQuery(finalQuery), resolve);
    });
  },
  loadModuleQuery: async module => {
    return new Promise(resolve => {
      if (module === 'moduleD') {
        sendResponse(ModuleDQuery.getQuery(), resolve);
      }
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
        const query = await QueryBuilder.loadModuleQuery(module.name);
        queriesList.push(query);
      }
    } else {
      const query = await QueryBuilder.loadModuleQuery(modules.name);
      queriesList.push(query);
    }
    return queriesList;
  },
};

export default QueryBuilder;
