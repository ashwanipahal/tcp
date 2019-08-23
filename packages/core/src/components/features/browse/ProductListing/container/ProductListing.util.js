const getIndex = data => {
  return data && data.some(category => !!category.url) ? data.length : 0;
};

// TODO - add the required information from the commented lines
const getRequiredCategoryData = data => {
  return {
    categoryId: data.categoryContent.id,
    title: data.categoryContent.name,
    // seoTitle: data.seoTitle,
    // seoDesc: data.seoDesc,
    longDescription: data.categoryContent.longDescription,
    url: data.url,
    // productCount: data.productCount,
    // isL1Category: data.isL1Category,
    // isUnique: data.isUnique,
  };
};

export const extractCategory = category => {
  // Extracting category id or path from the URL
  try {
    let categoryId;
    if (Number.isInteger(category)) {
      categoryId = category;
    } else if (category.lastIndexOf('/') === category.length - 1) {
      categoryId = category.split('/');
      categoryId = categoryId.length > 1 ? categoryId[categoryId.length - 2] : categoryId[0];
    } else {
      categoryId = category.split('/').pop();
    }
    return categoryId;
  } catch (error) {
    console.log(error);
  }
  return category;
};

// eslint-disable-next-line
export const findCategoryIdandName = (data, category) => {
  const index = getIndex(data);
  let iterator = 0;
  let categoryFound = [];
  const categoryId = extractCategory(category);
  while (iterator < index) {
    const navUrl = extractCategory(data[iterator].url);
    if (
      data[iterator].categoryId === categoryId ||
      navUrl.toLowerCase() === categoryId.toLowerCase()
    ) {
      categoryFound.push(getRequiredCategoryData(data[iterator]));
    } else if (
      // TODO - only looking for items in Categories. Should look for all the groups
      data[iterator].subCategories &&
      data[iterator].subCategories.Categories &&
      data[iterator].subCategories.Categories.length
    ) {
      categoryFound = findCategoryIdandName(data[iterator].subCategories.Categories, category);
      if (categoryFound.length) {
        categoryFound.push(getRequiredCategoryData(data[iterator]));
      }
    } else if (data[iterator].subCategories && data[iterator].subCategories.length) {
      categoryFound = findCategoryIdandName(data[iterator].subCategories, category);
      if (categoryFound.length) {
        categoryFound.push(getRequiredCategoryData(data[iterator]));
      }
    }
    if (categoryFound.length) {
      break;
    } else {
      iterator += 1;
    }
  }
  return categoryFound;
};

// TODO - refactor this function - this is random and dummy
export const matchPath = (url, param) => {
  if (param === '/search/' && url.indexOf(param) !== -1) {
    return {
      searchTerm: url,
    };
  }
  if (param === '/c/' && url.indexOf(param) !== -1) {
    const urlWithCat = url.split(param)[1];
    return {
      listingKey: urlWithCat,
    };
  }
  return url;
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

// Organized Navigation Tree
export const generateGroups = level1 => {
  try {
    let level2Groups = [];
    const groupings = {};

    // for each L2 parse and place in proper group
    if (level1.subCategories.Categories) {
      level1.subCategories.Categories.forEach(L2 => {
        const groupName = 'Categories';
        const groupOrder = 1;

        // if new grouping initalize array
        if (!groupings[groupName]) {
          groupings[groupName] = {
            order: groupOrder,
            menuItems: [],
          };
        }

        // Push L2 in this bucket
        groupings[groupName].menuItems.push(L2);
      });
    }

    // Now get all groups and generate array of object, this is not to bad as there are at most 3-4 groups
    level2Groups = Object.keys(groupings).map(group => ({
      groupName: group,
      order: groupings[group].order,
      menuItems: groupings[group].menuItems,
    }));

    return level2Groups.sort((prevGroup, curGroup) => {
      return prevGroup.order - curGroup.order;
    });
  } catch (error) {
    console.error('getHeaderNavigationTree:generateGroups', error);
    return [];
  }
};

export const isSearch = () => {
  return false;
};

export const matchValue = isSearchPage => {
  return isSearchPage
    ? matchPath(window.location.pathname, '/search/')
    : matchPath(window.location.pathname, '/c/');
};

export const getCategoryKey = (isSearchPage, match) => {
  return isSearchPage ? match.searchTerm : match.listingKey;
};

export const getCurrentCatId = breadCrumb => {
  return breadCrumb.length ? breadCrumb[breadCrumb.length - 1].categoryId : '';
};

export const getCatId = categoryNameList => {
  return categoryNameList ? categoryNameList.map(item => item.categoryId).join('>') : '';
};

export const getDesiredL3 = (catNameL3, bucketingConfig) => {
  return !catNameL3 && bucketingConfig.L3Left.length
    ? bucketingConfig.L3Left[0] && bucketingConfig.L3Left[0].name
    : catNameL3;
};

export const getCatIdUbxd = (categoryPathMap, categoryNameList) => {
  return (
    categoryPathMap ||
    (categoryNameList ? categoryNameList.map(item => item.categoryId).join('>') : '')
  );
};

export const isRequiredChildrenExists = requiredChildren => {
  return requiredChildren && requiredChildren.length;
};

export const isCatIdBucketingSeq = (categoryNameList, clickedL2) => {
  return categoryNameList && categoryNameList.length ? clickedL2.categoryId : null;
};

export const getSeoKeywordOrCategoryIdOrSearchTerm = match => {
  return match.searchTerm || match.listingKey;
};

export const getDesiredNav = clickedNav => {
  return clickedNav ? clickedNav.title : '';
};

export const isRequiredL2L1 = (isUnbxdSequencing, shouldApplyUnbxdLogic) => {
  return !isUnbxdSequencing || shouldApplyUnbxdLogic;
};

export const getBreadCrumb = categoryNameList => {
  return categoryNameList
    ? categoryNameList.map(crumb => ({
        categoryId: crumb.categoryId,
        displayName: crumb.title,
        urlPathSuffix: extractCategory(crumb.url),
        longDescription: crumb.longDescription,
      }))
    : [];
};
