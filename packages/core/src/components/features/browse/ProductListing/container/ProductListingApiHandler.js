import ProductsOperator from './productsRequestFormatter';
import ProductAbstractor from '../../../../../services/abstractors/productListing';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';
import getProductsUserCustomInfo from '../../../../../services/abstractors/productListing/defaultWishlist';

const instanceProductListing = new ProductAbstractor();
const operatorInstance = new ProductsOperator();

export const fetchPlpProductsInfo = async ({
  navigationData,
  location,
  formData,
  sortBySelected,
  state,
}) => {
  let reqObj = operatorInstance.getProductListingBucketedData(
    { ...state, Navigation: { navigationData } },
    location,
    sortBySelected,
    formData,
    1
  );
  let layout;
  let modules;
  let res = {};
  const pageName = 'productListingPage';
  if (reqObj.isFetchFiltersAndCountReq) {
    res = await instanceProductListing.getProducts(
      { ...reqObj, location },
      { ...state, Navigation: { navigationData } }
    );
    ({ layout, modules } = await instanceProductListing.parsedModuleData(res.bannerInfo));
    // yield put(loadLayoutData(layout, 'productListingPage'));
    // yield put(loadModulesData(modules));
    // yield put(setListingFirstProductsPage({ ...res }));
    // state = yield select();
    reqObj = operatorInstance.processProductFilterAndCountData(
      res,
      { ...state, Navigation: { navigationData } },
      reqObj
    );
  }
  if (reqObj && reqObj.categoryId) {
    const plpProducts = await instanceProductListing.getProducts(
      { ...reqObj, location, filterMaps: res.filterMaps },
      { ...state, Navigation: { navigationData } }
    );
    if (plpProducts) {
      ({ layout, modules } = await instanceProductListing.parsedModuleData(plpProducts.bannerInfo));
      // yield put(loadLayoutData(layout, 'productListingPage'));
      // yield put(loadModulesData(modules));
      operatorInstance.updateBucketingConfig(plpProducts);
      const products = plpProducts.loadedProductsPages[0];
      const isGuest = !getUserLoggedInState({ ...state, Navigation: { navigationData } });
      const isRemembered = isRememberedUser({ ...state, Navigation: { navigationData } });
      if (!isGuest && !isRemembered) {
        const generalProductIdsList = products.map(product => product.productInfo.generalProductId);
        plpProducts.loadedProductsPages[0] = await getProductsUserCustomInfo(
          generalProductIdsList,
          products
        );
      }
      // await setListingFirstProductsPage({ ...plpProducts });
      return {
        reqObj,
        res: plpProducts,
        layout,
        modules,
        pageName,
      };
    }
  }
  return {
    reqObj,
    res,
    layout,
    modules,
    pageName,
  };
};

export default fetchPlpProductsInfo;
