import queryString from 'query-string';
import logger from '@tcp/core/src/utils/loggerInstance';
import { isMobileApp } from '../../../../../utils';
import { FACETS_FIELD_KEY } from '../../../../../services/abstractors/productListing/productListing.utils';

const getIndex = data => {
  return data && data.some(category => !!(category && category.url)) ? data.length : 0;
};

// TODO - add the required information from the commented lines
export const getRequiredCategoryData = data => {
  return {
    categoryId: data.categoryContent.id,
    title: data.categoryContent.name,
    seoTitle: data.categoryContent.seoTitle,
    seoMetaDesc: data.categoryContent.seoMetaDesc,
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
    // if (category && category.indexOf('/') === -1) {
    //   return category;
    // }
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

// eslint-disable-next-line
export const findCategoryIdandName = (data, category) => {
  const index = getIndex(data);
  let iterator = 0;
  let categoryFound = [];
  const categoryId = (category && extractCategory(category)) || '';

  while (iterator < index) {
    const subCategoryArr =
      (data[iterator].subCategories && Object.keys(data[iterator].subCategories)) || [];
    let newCatArr = [];
    if (
      data[iterator] &&
      data[iterator].subCategories &&
      !data[iterator].subCategories.length &&
      subCategoryArr.length
    ) {
      for (let groupCount = 0; groupCount < subCategoryArr.length; groupCount += 1) {
        newCatArr = newCatArr.concat(
          data[iterator].subCategories[subCategoryArr[groupCount]].items
        );
      }
    } else if (data[iterator].subCategories) {
      newCatArr = newCatArr.concat(data[iterator].subCategories);
    }

    const navUrl = extractCategory(data[iterator].url && data[iterator].url.replace('/c?cid=', ''));
    if (
      (data[iterator].categoryContent &&
        data[iterator].categoryContent.categoryId === categoryId) ||
      (navUrl && navUrl.toLowerCase()) === (categoryId && categoryId.toLowerCase())
    ) {
      categoryFound.push(getRequiredCategoryData(data[iterator]));
    } else if (newCatArr && newCatArr.length) {
      categoryFound = findCategoryIdandName(newCatArr, category);
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
  if (param === '/search' && url.indexOf(param) !== -1) {
    return {
      searchTerm: url,
    };
  }
  if (
    (param === '/c?cid=' && url.indexOf(param) !== -1) ||
    (param === '/c/' && url.indexOf(param) !== -1)
  ) {
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

    const listOfGroups = Object.keys(level1.subCategories);
    // for each L2 parse and place in proper group
    listOfGroups.forEach(grp => {
      if (level1.subCategories[grp] && level1.subCategories[grp].items) {
        level1.subCategories[grp].items.forEach(L2 => {
          const groupName = grp;
          const groupOrder = level1.subCategories[grp].order;

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
    });

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
    logger.error('getHeaderNavigationTree:generateGroups', error);
    return [];
  }
};

export const isSearch = () => {
  return false;
};

export const matchValue = (isSearchPage, location) => {
  const categoryParam = isMobileApp() ? '/c?cid=' : '/c/';
  const params = isSearchPage ? '/search/' : categoryParam;
  return matchPath(location, params);
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
    ? bucketingConfig.L3Left[0] &&
        bucketingConfig.L3Left[0].categoryContent &&
        bucketingConfig.L3Left[0].categoryContent.name
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

// Inline function to get sum of object array element
const sumValues = obj => Object.values(obj).reduce((a, b) => a + b);

function getIsShowCategoryGrouping(state) {
  const isL2Category = state.ProductListing.breadCrumbTrail.length === 2;
  // const isNotAppliedSort = !state.productListing.appliedSortId;
  const isNotAppliedSort = !null;
  const appliedFilters = state.ProductListing.appliedFiltersIds;
  const isNotAppliedFilter =
    (appliedFilters && appliedFilters.length > 0 && !sumValues(appliedFilters)) || true;

  return isL2Category && isNotAppliedSort && isNotAppliedFilter;
}

// eslint-disable-next-line
export function getProductsAndTitleBlocks(
  state,
  productBlocks = [],
  gridPromo,
  horizontalPromo,
  rowSize,
  filterCount
) {
  const productsAndTitleBlocks = [];
  let lastCategoryName = null;
  const slots = [];
  const horizontalSlots = [];

  // If filters are applied, do not consider the promos even if they are configured
  if (filterCount === 0) {
    gridPromo.forEach(promoItem => {
      const slotNumber = (promoItem.slot && promoItem.slot.split('slot_')[1]) || '';
      slots.push(parseInt(slotNumber, 10));
    });

    horizontalPromo.forEach(promoItem => {
      const slotNumber = (promoItem.slot && promoItem.slot.split('slot_')[1]) || '';
      horizontalSlots.push(parseInt(slotNumber, 10));
    });
  }

  let totalItemsAdded = 0;
  let promosAdded = 0;

  let isL2WithBucket = false;
  let numberOfItemsInCurrentL2 = 0;
  // eslint-disable-next-line
  productBlocks.forEach((block, productBlocksIndex) => {
    const productsAndTitleBlock = [];
    let promoAddedInCurrentBlock = 0;
    block.forEach((product, index) => {
      const { categoryName } = product.miscInfo;

      // indexOfProduct is all the items added already in the previous iteration
      // plus the promos added in the current iteration
      // plus index which would give the current iteration products added
      const currentSlot = totalItemsAdded + promoAddedInCurrentBlock + index;

      // First add the horizontal/mobile promos as they don't add up to the count
      // For horizontal / mobile only promo
      // Also, if slot_6 needs to be added, the slot number has to be 6 since it gets added after 6th product
      const horizontalSlotIndex = horizontalSlots.indexOf(currentSlot);
      if (horizontalSlotIndex !== -1) {
        productsAndTitleBlock.push({
          itemType: 'gridPromo',
          gridStyle: 'horizontal',
          itemVal: horizontalPromo[horizontalSlotIndex],
        });
      }

      // If Vertical promo slot_8 needs to be added, the slot number has to be 7
      // since it occupies space of the 8th product, which is actually slot 7
      const slotIndex = slots.indexOf(currentSlot + 1);
      if (slotIndex !== -1) {
        promosAdded += 1;
        productsAndTitleBlock.push({
          itemType: 'gridPromo',
          gridStyle: 'vertical',
          itemVal: gridPromo[slotIndex],
        });
        promoAddedInCurrentBlock += 1;
      }

      // push: If we should group and we hit a new category name push on array
      const shouldGroup = state.ProductListing.breadCrumbTrail && getIsShowCategoryGrouping(state);
      if (shouldGroup && (categoryName && categoryName !== lastCategoryName)) {
        isL2WithBucket = true;
        numberOfItemsInCurrentL2 = 0;
        productsAndTitleBlock.push(categoryName);
        lastCategoryName = categoryName;
      }
      // push: product onto block
      productsAndTitleBlock.push(product);
    });

    const productsAdded = block.length;
    totalItemsAdded += productsAdded + promoAddedInCurrentBlock;
    numberOfItemsInCurrentL2 += productsAdded + promoAddedInCurrentBlock;
    // Check if the number of products and the promos count sum
    // to understand the number of slots blank at the end of the block
    const numberOfItemsInLastRow = numberOfItemsInCurrentL2 % rowSize;

    // For L2 with buckets only
    // If there is some empty space in the last row of the block
    // and the next block starts with a new L3 category,
    // or if this is the last block of the entire productsBlock that is loaded yet
    // ie. this is the last row to appear, irrespective of the fact if it is followed by a new L3 or not
    // check if some slots were supposed to be added in those empty space
    if (
      isL2WithBucket &&
      ((numberOfItemsInLastRow !== 0 &&
        (productBlocks[productBlocksIndex + 1] &&
          productBlocks[productBlocksIndex + 1][0].miscInfo.categoryName !== lastCategoryName)) || // TODO - add null check
        productBlocksIndex + 1 === productBlocks.length)
    ) {
      const emptySpaces = rowSize - numberOfItemsInLastRow;
      if (emptySpaces < rowSize) {
        totalItemsAdded += emptySpaces;
        const indexOfEmptySlot = slots.indexOf(totalItemsAdded);
        if (indexOfEmptySlot !== -1) {
          // See if the empty spaces are omitting any promo
          productsAndTitleBlock.push({
            itemType: 'gridPromo',
            gridStyle: 'vertical',
            itemVal: gridPromo[indexOfEmptySlot],
          });
        }
      }
      // If this is the last block
    }

    // push: product block onto matrix
    productsAndTitleBlocks.push(productsAndTitleBlock);
  });

  return productsAndTitleBlocks;
}

export const getPlpCutomizersFromUrlQueryString = urlQueryString => {
  const queryParams = queryString.parse(urlQueryString);
  Object.keys(queryParams).forEach(key => {
    const value = decodeURIComponent(queryParams[key]);
    queryParams[key] =
      key && (key.toLowerCase() === FACETS_FIELD_KEY.sort ? value : value.split(','));
  }); // Fetching Facets and sort key from the URL query string
  return queryParams;
};

// This function is used for mobile app In-grid promo implementation
export const getProductsWithPromo = (products, gridPromo, horizontalPromo, filterCount) => {
  const slots = [];
  const horizontalSlots = [];

  if (filterCount === 0) {
    gridPromo.forEach(promoItem => {
      const slotNumber = (promoItem.slot && promoItem.slot.split('slot_')[1]) || '';
      slots.push(parseInt(slotNumber, 10));
    });

    horizontalPromo.forEach(promoItem => {
      const slotNumber = (promoItem.slot && promoItem.slot.split('slot_')[1]) || '';
      horizontalSlots.push(parseInt(slotNumber, 10));
    });
  }

  let productCount = 0;
  const productsAndPromos = [];

  if (products) {
    products.forEach((product, index) => {
      const slotNum = slots.indexOf(productCount + 1);
      if (slotNum !== -1) {
        productCount += 1;
        productsAndPromos.push({
          itemType: 'gridPromo',
          gridStyle: 'vertical',
          itemVal: gridPromo[slotNum],
        });
      }

      const horizontalSlotIndex = horizontalSlots.indexOf(productCount);
      if (horizontalSlotIndex !== -1) {
        productsAndPromos.push({
          itemType: 'gridPromo',
          gridStyle: 'horizontal',
          itemVal: gridPromo[horizontalSlotIndex],
        });

        // Since horizontal promo occupies two slots, add a dummy blank promo
        productsAndPromos.push({
          itemType: 'gridPromo',
          gridStyle: 'blank',
          itemVal: gridPromo[horizontalSlotIndex],
        });
      }
      productsAndPromos.push(products[index]);
      productCount += 1;
    });
  }
  return productsAndPromos;
};
