import logger from '@tcp/core/src/utils/loggerInstance';

export const extractCategory = category => {
  // Extracting category id or path from the URL
  try {
    let categoryId;
    if (Number.isInteger(category)) {
      categoryId = category;
    } else if (category && category.lastIndexOf('/') === category.length - 1) {
      categoryId = category && category.split('/');
      categoryId = categoryId.length > 1 ? categoryId[categoryId.length - 2] : categoryId[0];
    } else {
      categoryId = category && category.split('/').pop();
    }
    return categoryId;
  } catch (error) {
    logger.error(error);
  }
  return category;
};

export const processBreadCrumbs = breadCrumbTrail => {
  if (breadCrumbTrail && breadCrumbTrail.length) {
    return breadCrumbTrail.map(crumb => ({
      displayName: crumb.displayName,
      destination: 'c',
      pathSuffix: extractCategory(crumb.urlPathSuffix),
    }));
  }
  return [];
};
