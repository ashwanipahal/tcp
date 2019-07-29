import HomePageLayout from '../../abstractors/bootstrap/layout/mock';
import HeaderMock from '../../abstractors/bootstrap/header/mock';
import FooterMock from '../../abstractors/bootstrap/footer/mock';
import LabelsMock from '../../abstractors/bootstrap/labels/mock';
import ModuleDMock from '../../abstractors/common/moduleD/mock';
import ModuleHMock from '../../abstractors/common/moduleH/mock';
import ModuleDQuery from '../graphQL/queries/moduleD/moduleD.query';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

const processResponse = name => {
  let response = {};
  switch (name) {
    case 'moduleD':
      response = ModuleDMock;
      break;
    case 'moduleH':
      response = ModuleHMock;
      break;
    case 'layout':
      response = HomePageLayout;
      break;
    case 'header':
      response = HeaderMock;
      break;
    case 'footer':
      response = FooterMock;
      break;
    case 'labels':
      response = LabelsMock;
      break;
    default:
      break;
  }
  return response;
};

export const fetchModuleDataFromGraphQL = async modules => {
  return new Promise((resolve, reject) => {
    if (modules.length) {
      const response = {
        data: {},
      };

      for (let i = 0; i < modules.length; i += 1) {
        const module = modules[i];
        if (module.name !== 'layout') {
          response.data[module.name] = processResponse(module.name);
        } else {
          response.data[module.data.path] = processResponse(module.name)[module.data.path];
        }
      }

      sendResponse(response, resolve, reject);
    } else {
      const response = {
        data: processResponse(modules.name),
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

export const executeStatefulAPICall = reqObj => {
  return new Promise((resolve, reject) => {
    let response = null;
    if (reqObj.webService) {
      response = {
        data: {},
      };
    }
    sendResponse(response, resolve, reject);
  });
};

export const executeExternalAPICall = reqObj => {
  return new Promise((resolve, reject) => {
    let response;
    if (reqObj.webService) {
      response = {
        data: {},
      };
    }
    sendResponse(response, resolve, reject);
  });
};

export default {
  fetchModuleDataFromGraphQL,
  executeGraphQLQuery,
};
