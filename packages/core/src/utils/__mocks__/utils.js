import graphQLClient from '../../services/handler/graphQL/graphQLClient';
import LayoutQuery from '../../services/handler/graphQL/queries/layout/layout.query';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

export const importGraphQLClientDynamically = module => {
  return new Promise(resolve => {
    if (module === 'graphQLClient') {
      sendResponse(
        {
          default: graphQLClient,
        },
        resolve
      );
    }
  });
};

export const importGraphQLQueriesDynamically = module => {
  return new Promise(resolve => {
    if (module === 'layout') {
      sendResponse(
        {
          default: LayoutQuery,
        },
        resolve
      );
    }
  });
};

export default {
  importGraphQLClientDynamically,
  importGraphQLQueriesDynamically,
};
