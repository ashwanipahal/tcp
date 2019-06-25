import awsAppSync from '../../services/handler/awsAppSync/awsAppSync';
import LayoutQuery from '../../services/queries/layout/layout.query';

const sendResponse = (data, resolve, reject) =>
  process.nextTick(() => (data ? resolve(data) : reject()));

export const importGraphQLClientDynamically = module => {
  return new Promise(resolve => {
    if (module === 'awsAppSync') {
      sendResponse(
        {
          default: awsAppSync,
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
