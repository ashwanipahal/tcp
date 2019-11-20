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

export const getSeoText = (listOfL1, cid) => {
  let description = '';
  for (let i = 0; i < listOfL1.length; i += 1) {
    if (listOfL1[i] && listOfL1[i].url && listOfL1[i].url.split('/c?cid=')[1] === cid) {
      description = listOfL1[i].categoryContent && listOfL1[i].categoryContent.longDescription;
    }
  }
  return description;
};
