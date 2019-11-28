import layoutAbstractor from '@tcp/core/src/services/abstractors/bootstrap/layout/index';
import { getAPIConfig } from '@tcp/core/src/utils';
import logger from '@tcp/core/src/utils/loggerInstance';
import { defaultBrand, defaultChannel, defaultCountry } from '@tcp/core/src/services/api.constants';
import ProductsOperator from './productsRequestFormatter';
import ProductAbstractor from '../../../../../services/abstractors/productListing';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import getProductsUserCustomInfo from '../../../../../services/abstractors/productListing/defaultWishlist';

const instanceProductListing = new ProductAbstractor();
const operatorInstance = new ProductsOperator();

const getListingPageType = (navigationData, pathname) =>
  navigationData &&
  navigationData.find(item => {
    if (item.categoryContent) {
      const regex = new RegExp(`/..${item.categoryContent.asPath}`);
      return regex.test(pathname);
    }
    return false;
  });

const isCustomInfo = state => {
  const isGuest = !getUserLoggedInState(state);
  const isRemembered = isRememberedUser(state);
  return !isGuest && !isRemembered;
};

/* eslint-disable sonarjs/cognitive-complexity */
// eslint-disable-next-line complexity
export const fetchPlpProductsInfo = async ({
  navigationData,
  location,
  formData,
  sortBySelected,
  state,
}) => {
  let reqObj = {};
  let layout;
  let modules;
  let res = {};
  let pageName;
  if (!getListingPageType(navigationData, location.pathname)) {
    reqObj = operatorInstance.getProductListingBucketedData(
      { ...state, Navigation: { navigationData } },
      location,
      sortBySelected,
      formData,
      1
    );
    res = {};
    pageName = 'productListingPage';
    if (reqObj.isFetchFiltersAndCountReq) {
      res = await instanceProductListing.getProducts(
        { ...reqObj, location },
        { ...state, Navigation: { navigationData } }
      );
      ({ layout, modules } = await instanceProductListing.parsedModuleData(res.bannerInfo));
      reqObj = operatorInstance.processProductFilterAndCountData(
        res,
        { ...state, Navigation: { navigationData } },
        reqObj
      );
    }
    if (reqObj.categoryId) {
      const plpProducts = await instanceProductListing.getProducts(
        { ...reqObj, location, filterMaps: res.filterMaps },
        { ...state, Navigation: { navigationData } }
      );
      if (plpProducts) {
        ({ layout, modules } = await instanceProductListing.parsedModuleData(
          plpProducts.bannerInfo
        ));
        operatorInstance.updateBucketingConfig(plpProducts);
        const products = plpProducts.loadedProductsPages[0];
        if (isCustomInfo({ ...state, Navigation: { navigationData } })) {
          const generalProductIdsList = products.map(
            product => product.productInfo.generalProductId
          );
          plpProducts.loadedProductsPages[0] = await getProductsUserCustomInfo(
            generalProductIdsList,
            products
          );
        }
        return {
          reqObj,
          res: plpProducts,
          layout,
          modules,
          pageName,
        };
      }
    }
  } else {
    try {
      pageName = 'categoryListingPage';
      const apiConfig = getAPIConfig();
      const { language } = apiConfig;
      const layoutParams = {
        page: 'boy',
        layoutName: pageName,
        brand: (apiConfig && apiConfig.brandIdCMS) || defaultBrand,
        channel: defaultChannel,
        country: (apiConfig && apiConfig.siteIdCMS) || defaultCountry,
      };
      const layoutData = await layoutAbstractor.getLayoutData(layoutParams);
      const [layoutItem] = layoutData.items;
      ({ layout } = layoutItem);
      modules = await layoutAbstractor.getModulesFromLayout(layoutData, language);
    } catch (e) {
      logger.error(e);
    }
  }
  return new Promise(resolve =>
    resolve({
      reqObj,
      res,
      layout,
      modules,
      pageName,
    })
  );
};
/* eslint-disable sonarjs/cognitive-complexity */

export default fetchPlpProductsInfo;
