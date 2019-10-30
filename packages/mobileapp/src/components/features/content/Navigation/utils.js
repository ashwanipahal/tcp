import ROUTE_NAMES from '../../../../reduxStore/routes';

/**
 * @function navigateFromL2 populates the L3 menu or PLP page for the L1 link that has been clicked
 * @param {object} subCategories Details of the L2 menu item that has been clicked
 * @param {object} hasL3 flag that defines if L3 is present for the L2
 */
export const navigateFromL2 = (navigate, subCategories, name, hasL3, accessibilityLabels, url) => {
  if (hasL3) {
    return navigate(ROUTE_NAMES.NAV_MENU_LEVEL_3, {
      navigationObj: subCategories,
      l2Title: name,
      accessibilityLabels,
    });
  }

  if (url.includes('-outfit')) {
    // Navigate to outfit listing for outfits
    const categoryIds = url.split('cid=');
    return navigate('OutfitListing', {
      title: name,
      url,
      accessibilityLabels,
      outfitPath: (categoryIds && categoryIds.length > 1 && categoryIds[1]) || '',
    });
  }

  return navigate('ProductListing', {
    title: name,
    url,
    reset: true,
    accessibilityLabels,
  });
};

export default {
  navigateFromL2,
};
