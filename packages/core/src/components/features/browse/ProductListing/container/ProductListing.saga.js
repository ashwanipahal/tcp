import { call, put, takeLatest } from 'redux-saga/effects';
import { isClient } from '@tcp/core/src/utils';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import { setPlpProducts /* , setGiftCardProducts */ } from './ProductListing.actions';
import { validateReduxCache } from '../../../../../utils/cache.util';
import Abstractor from '../../../../../services/abstractors/productListing';

// Dummy store value till this user info is available
const userStoreView = {
  isGuest: () => true,
  isRemembered: () => false,
};
function addCustomUserInfoToProducts(products) {
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

function formatPlpProducts(plpProducts) {
  if (isClient()) {
    const { loadedProducts, ...otherInfo } = plpProducts;

    return addCustomUserInfoToProducts(loadedProducts).then(productsWithCustomInfo => ({
      loadedProducts: productsWithCustomInfo,
      ...otherInfo,
    }));
  }
  return plpProducts;
}

function* fetchPlpProducts() {
  try {
    const instanceProductListing = new Abstractor();
    const plpProducts = yield call(instanceProductListing.getProducts, {});
    const plpProductsFormatted = formatPlpProducts(plpProducts);
    console.log('plpProductsFormatted ==> ', plpProductsFormatted);
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
