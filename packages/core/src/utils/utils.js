export const importGraphQLClientDynamically = module => {
  return import(`../services/handler/${module}`);
};

export const importGraphQLQueriesDynamically = query => {
  return import(`../services/queries/${query}`);
};

export default {
  importGraphQLClientDynamically,
  importGraphQLQueriesDynamically,
};
