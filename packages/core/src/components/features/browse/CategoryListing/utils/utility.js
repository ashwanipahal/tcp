export const getCategoryIds = categoryListingSlots => {
  const categoryPromos =
    categoryListingSlots.filter(slot => {
      return slot.moduleName === 'categoryPromo';
    }) || [];

  return categoryPromos.map(categoryPromo => {
    return categoryPromo.contentId;
  });
};

export const getImagesGrids = (categoryIds, modules) => {
  const categoryPromoModules = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const categoryId in modules) {
    if (
      Object.prototype.hasOwnProperty.call(modules, categoryId) &&
      categoryIds.indexOf(categoryId) >= 0
    ) {
      categoryPromoModules[categoryId] = modules[categoryId];
    }
  }
  return categoryPromoModules;
};
