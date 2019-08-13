/* eslint-disable */
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { isClient } from '@tcp/core/src/utils';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import { setPlpProducts } from './ProductListing.actions';
import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';
import BucketingBL from './ProductListing.bucketing';
import { extractCategory, findCategoryIdandName } from './ProductListing.util';

// TODO - refactor this function - this is random and dummy
const matchPath = (url, param) => {
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

// Dummy store value till this user info is available
const userStoreView = {
  isGuest: () => true,
  isRemembered: () => false,
};

const routingInfoStoreView = {
  getOriginImgHostSetting: () => {
    return {};
  },
};

const bindAllClassMethodsToThis = (obj, namePrefix = '', isExclude = false) => {
  const prototype = Object.getPrototypeOf(obj);
  // eslint-disable-next-line
  for (let name of Object.getOwnPropertyNames(prototype)) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, name);
    const isGetter = descriptor && typeof descriptor.get === 'function';
    // eslint-disable-next-line
    if (isGetter) continue;
    if (
      typeof prototype[name] === 'function' && name !== 'constructor' && isExclude
        ? !name.startsWith(namePrefix)
        : name.startsWith(namePrefix)
    ) {
      // eslint-disable-next-line
      obj[name] = prototype[name].bind(obj);
    }
  }
};
class ProductsOperator {
  constructor(store) {
    this.bucketingConfig = {
      start: 0,
      productsToFetchPerLoad: 20,
      L3Left: [],
      currL2NameList: [],
      bucketingSeqScenario: false,
      availableL3: [],
    };
    this.store = store;
    this.shouldApplyUnbxdLogic =
      store && store.getState().session.siteDetails.shouldApplyUnbxdLogic;
    bindAllClassMethodsToThis(this);
  }

  bucketingLogic = () => {
    return new BucketingBL();
  };

  getImgPath(id, excludeExtension) {
    return {
      colorSwatch: this.getSwatchImgPath(id, excludeExtension),
      productImages: this.getProductImgPath(id, excludeExtension),
    };
  }

  getSwatchImgPath = (id, excludeExtension) => {
    const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
    return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/swatches/${id}${
      excludeExtension ? '' : '.jpg'
    }`;
  };

  getProductImgPath = (id, excludeExtension) => {
    const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();

    return {
      125: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/125/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      380: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/380/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      500: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/500/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
      900: `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/products/900/${id}${
        excludeExtension ? '' : '.jpg'
      }`,
    };
  };

  getFacetSwatchImgPath = id => {
    const imgHostDomain = routingInfoStoreView.getOriginImgHostSetting();
    return `${imgHostDomain}/wcsstore/GlobalSAS/images/tcp/category/color-swatches/${id}.gif`;
  };

  getNavAttributes(navTree, categoryId, attribute) {
    const index = navTree ? navTree.length : 0;
    let iterator = 0;
    let categoryFound = '';
    while (iterator < index) {
      if (navTree[iterator].categoryId === categoryId) {
        categoryFound = navTree[iterator][attribute];
      } else if (navTree[iterator].menuItems && navTree[iterator].menuItems.length) {
        categoryFound = this.getNavAttributes(
          navTree[iterator].menuItems[0].length
            ? navTree[iterator].menuItems[0]
            : navTree[iterator].menuItems,
          categoryId,
          attribute
        );
      }
      if (categoryFound) {
        break;
      } else {
        iterator += 1;
      }
    }
    return categoryFound;
  }

  /** @function This function return the L3 items of the requested category id of L2.
   * @param navTree {Object} The vaigation free of left navigation.
   * @param targetId {String} The category ID of L2 whose children we need.
   * @param trgtChildItm {Array} The resultant desired array of all L3.
   * @return trgtChildItm {Array} The resultant desired array of all L3.
   */

  shouldBucktSeq(navTree, targetId, trgtChildItm) {
    const navTreeLength = navTree.length;
    let newTrgtChildItm = trgtChildItm || [];
    for (let idx = 0; idx < navTreeLength; idx++) {
      const currItm = navTree[idx];
      // Check if the category of the navigation bieng looped on matches with desired L2 category ID.
      if (currItm.categoryId === targetId) {
        newTrgtChildItm =
          currItm.subCategories.Categories &&
          currItm.subCategories.Categories.length &&
          currItm.menuItems;
        return newTrgtChildItm;
      }
      if (currItm.menuItems && currItm.menuItems.length) {
        // If the category ID does not matches up then recursively call the same function to search depe down the tree.
        newTrgtChildItm = this.shouldBucktSeq(
          currItm.menuItems[0].length ? currItm.menuItems[0] : currItm.menuItems,
          targetId,
          newTrgtChildItm
        );
      }
    }
    return newTrgtChildItm;
  }

  // eslint-disable-next-line
  getProductsListingInfo = (
    state,
    filtersAndSort,
    pageNumber,
    // eslint-disable-next-line
    location = '',
    startProductCount = 0,
    numberOfProducts = 20,
    categoryPathMap = '',
    catNameL3 = ''
    // eslint-disable-next-line
  ) => {
    // const state = this.store.getState();
    // const isSearchPage = routingStoreView.getCurrentPageId(state) === PAGES.search.id;
    const isSearchPage = false;
    const match = isSearchPage
      ? matchPath(window.location.pathname, '/search/')
      : matchPath(window.location.pathname, '/c/');
    const categoryKey = isSearchPage ? match.searchTerm : match.listingKey;
    const navigationTree = state.navigationData;
    const categoryNameList = findCategoryIdandName(navigationTree, categoryKey).reverse();
    const breadCrumb = categoryNameList
      ? categoryNameList.map(crumb => ({
          categoryId: crumb.categoryId,
          displayName: crumb.title,
          urlPathSuffix: extractCategory(crumb.url),
          longDescription: crumb.longDescription,
        }))
      : [];
    const currentCatId = breadCrumb.length ? breadCrumb[breadCrumb.length - 1].categoryId : '';
    const excludeBage = currentCatId
      ? this.getNavAttributes(navigationTree, currentCatId, 'excludeAttribute')
      : '';
    const isUnbxdSequencing = !isSearchPage; /* && abTestingStoreView.getIsUnbxdSequencing(state, match.params.listingKey) */
    const hasShortImage =
      !isSearchPage && currentCatId
        ? parseInt(this.getNavAttributes(navigationTree, currentCatId, 'isShortImage'), 10) === 1
        : '';
    const bucketingSeqConfig = {};
    let requiredChildren;
    let categoryId;
    const clickedL2 = categoryNameList[1];
    const clickedl1 = categoryNameList[0];

    if (!isUnbxdSequencing || this.shouldApplyUnbxdLogic) {
      bucketingSeqConfig.desiredL2 = clickedL2 ? clickedL2.title : '';
      bucketingSeqConfig.desiredl1 = clickedl1 ? clickedl1.title : '';
    }

    if (this.shouldApplyUnbxdLogic) {
      bucketingSeqConfig.requiredChildren = this.bucketingConfig.availableL3;
      bucketingSeqConfig.bucketingRequired = this.bucketingConfig.bucketingSeqScenario;
      bucketingSeqConfig.desiredL3 =
        !catNameL3 && this.bucketingConfig.L3Left.length
          ? this.bucketingConfig.L3Left[0] && this.bucketingConfig.L3Left[0].name
          : catNameL3; // Fix me: Make catNameL3 available for all getProductsListingInfo calls.
      categoryId =
        categoryPathMap ||
        (categoryNameList ? categoryNameList.map(item => item.categoryId).join('>') : '');
      if (isUnbxdSequencing) bucketingSeqConfig.bucketingSeq = 'A/B-Test';
    } else {
      if (categoryNameList[1]) {
        requiredChildren = this.shouldBucktSeq(navigationTree, clickedL2.categoryId);
        const isBuktSeqReq = requiredChildren && requiredChildren.length;
        bucketingSeqConfig.requiredChildren = requiredChildren;

        if (isUnbxdSequencing) {
          if (!isBuktSeqReq) {
            bucketingSeqConfig.bucketingSeq = 'A/B-Test';
          }
        } else if (isBuktSeqReq) {
          const catId = categoryNameList && categoryNameList.length ? clickedL2.categoryId : null;
          bucketingSeqConfig.bucketingSeq = `sort_${catId} asc,pop_score desc`;
        }
      }
      categoryId = categoryNameList ? categoryNameList.map(item => item.categoryId).join('>') : '';
    }
    return {
      seoKeywordOrCategoryIdOrSearchTerm: match.searchTerm || match.listingKey,
      isSearch: isSearchPage,
      filtersAndSort: { sort: [], filter: [] },
      pageNumber,
      getImgPath: this.getImgPath,
      categoryId,
      breadCrumbs: breadCrumb,
      bucketingSeqConfig,
      getFacetSwatchImgPath: this.getFacetSwatchImgPath,
      isUnbxdSequencing,
      excludeBadge: excludeBage,
      startProductCount,
      numberOfProducts,
      cacheFiltersAndCount: false,
      extraParams: '',
      shouldApplyUnbxdLogic: this.shouldApplyUnbxdLogic,
      hasShortImage,
    };

    /* return this.productsAbstractor.getCategoryListingPage(match.params.searchTerm || match.params.listingKey,
        isSearchPage,
        filtersAndSort, 
        pageNumber, 
        this.getImgPath, 
        categoryId, 
        breadCrumb, 
        bucketingSeqConfig, 
        this.getFacetSwatchImgPath, 
        isUnbxdSequencing, 
        excludeBage,
        startProductCount,
        numberOfProducts,
        false,
        "",
        this.shouldApplyUnbxdLogic,
        hasShortImage)
        .then((res) => {
          if (isClient()) {
            const { loadedProducts, ...otherInfo } = res;

            return this.addCustomUserInfoToProducts(loadedProducts)
              .then(productsWithCustomInfo => ({ loadedProducts: productsWithCustomInfo, ...otherInfo }));
          }
          return res;
        }); */
  };

  addCustomUserInfoToProducts(products) {
    // DT-31015 - no customer information for guest / remembered
    const isGuest = userStoreView.isGuest();
    const isRemembered = userStoreView.isRemembered();
    if (isGuest || isRemembered) {
      return Promise.resolve(products);
    }

    const generalProductIdsList = products.map(product => product.productInfo.generalProductId);
    return this.productsAbstractor
      .getProductsUserCustomInfo(generalProductIdsList)
      .then(extraProductsInfo =>
        products.map(product => {
          const { miscInfo, ...otherAttributes } = product;
          const extraProductInfo = extraProductsInfo[product.productInfo.generalProductId];
          return {
            ...otherAttributes,
            miscInfo: {
              ...miscInfo,
              isInDefaultWishlist: !!extraProductInfo && extraProductInfo.isInDefaultWishlist,
            },
          };
        })
      )
      .catch(err => {
        // if failed, log error and simply do not add any extra info to products
        console.log('ProductsOperator.addCustomUserInfoToProducts', err);
        return products;
      });
  }

  formatPlpProducts(plpProducts) {
    if (isClient()) {
      const { loadedProducts, ...otherInfo } = plpProducts;

      return this.addCustomUserInfoToProducts(loadedProducts).then(productsWithCustomInfo => ({
        loadedProducts: productsWithCustomInfo,
        ...otherInfo,
      }));
    }
    return plpProducts;
  }
}

function* fetchPlpProducts() {
  try {
    const stateNav = (yield select()).Navigation;
    const instanceProductListing = new Abstractor();
    const operatorInstance = new ProductsOperator();
    const reqObj = operatorInstance.getProductsListingInfo(stateNav);
    const plpProducts = yield call(instanceProductListing.getProducts, reqObj);
    const plpProductsFormatted = operatorInstance.formatPlpProducts(plpProducts);
    yield put(setPlpProducts({ ...plpProducts }));
  } catch (err) {
    console.log(err);
  }
}

function* ProductListingPageSaga() {
  // A HOF which prevents calling fetchProducts when data in redux exists (within ttl)
  const cachedFetchProducts = validateReduxCache(fetchPlpProducts);
  // const cachedFetchGiftProducts = validateReduxCache(fetchGiftProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, cachedFetchProducts);
  // yield takeLatest(PRODUCTLISTINGPAGE_CONSTANTS.FETCH_GIFT_CARD_PRODUCTS, cachedFetchGiftProducts);
}

export default ProductListingPageSaga;
