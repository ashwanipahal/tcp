export const importGraphQLClientDynamically = module => {
  return require(`../services/handler/${module}`);
};

export const importGraphQLQueriesDynamically = query => {
  return require(`../services/handler/graphQL/queries/${query}`);
};
