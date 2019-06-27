import HomePageLayout from '../../abstractors/bootstrap/layout/mock';
import ModuleDMock from '../../abstractors/common/moduleD/mock';
import ModuleHMock from '../../abstractors/common/moduleH/mock';
import ModuleDQuery from '../graphQL/queries/moduleD/moduleD.query';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

/**
 *
 * @param {*} modules
 */
export const fetchModuleDataFromGraphQL = async modules => {
  return new Promise((resolve, reject) => {
    if (modules.length) {
      const response = {
        data: {},
      };

      for (let i = 0; i < modules.length; i += 1) {
        const module = modules[i];
        switch (module.name) {
          case 'moduleD':
            response.data.moduleD = ModuleDMock;
            break;
          case 'moduleH':
            response.data.moduleH = ModuleHMock;
            break;
          default:
            break;
        }
      }

      sendResponse(response, resolve, reject);
    }

    if (modules.name === 'layout') {
      const response = {
        data: HomePageLayout,
      };
      sendResponse(response, resolve, reject);
    }
  });
};

export const executeGraphQLQuery = query => {
  return new Promise((resolve, reject) => {
    if (query === ModuleDQuery) {
      const response = {
        data: {},
      };
      response.data.moduleD = ModuleDMock;
      sendResponse(response, resolve, reject);
    }
  });
};

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
