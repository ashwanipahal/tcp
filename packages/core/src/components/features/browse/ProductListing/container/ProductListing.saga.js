import { call, put, putResolve, takeLatest, select } from 'redux-saga/effects';
import logger from '@tcp/core/src/utils/loggerInstance';
import { loadLayoutData, loadModulesData } from '@tcp/core/src/reduxStore/actions';
import PRODUCTLISTING_CONSTANTS from './ProductListing.constants';
import {
  setPlpProducts,
  setListingFirstProductsPage,
  setPlpLoadingState,
} from './ProductListing.actions';
import ProductAbstractor from '../../../../../services/abstractors/productListing';
import ProductsOperator from './productsRequestFormatter';
import getProductsUserCustomInfo from '../../../../../services/abstractors/productListing/defaultWishlist';
import {
  getUserLoggedInState,
  isRememberedUser,
} from '../../../account/User/container/User.selectors';

const instanceProductListing = new ProductAbstractor();
const operatorInstance = new ProductsOperator();

const getUrl = url => {
  return url
    ? {
        pathname: url,
      }
    : typeof window !== 'undefined' && window.location;
};

export function* fetchPlpProducts({ payload }) {
  try {
    const { url, formData, sortBySelected, scrollToTop, isKeepModalOpen } = payload;
    yield put(loadLayoutData({}, 'productListingPage'));
    const location = getUrl(url);
    yield put(
      setPlpLoadingState({
        isLoadingMore: true,
        isScrollToTop: scrollToTop,
        isDataLoading: true,
        isKeepModalOpen,
      })
    );
    let state = yield select();
    let reqObj = operatorInstance.getProductListingBucketedData(
      { ...state },
      location,
      sortBySelected,
      formData,
      1
    );
    if (reqObj.isFetchFiltersAndCountReq) {
      const res = yield call(
        instanceProductListing.getProducts,
        { ...reqObj, location },
        { ...state }
      );

      const { layout, modules } = yield call(
        instanceProductListing.parsedModuleData,
        res.bannerInfo
      );
      yield put(loadLayoutData(layout, 'productListingPage'));
      yield put(loadModulesData(modules));
      yield put(setListingFirstProductsPage({ ...res }));
      state = yield select();
      reqObj = operatorInstance.processProductFilterAndCountData(res, { ...state }, reqObj);
    }
    if (reqObj && reqObj.categoryId) {
      const plpProducts = yield call(
        instanceProductListing.getProducts,
        { ...reqObj, location },
        { ...state }
      );
      if (plpProducts) {
        const { layout, modules } = yield call(
          instanceProductListing.parsedModuleData,
          plpProducts.bannerInfo
        );
        yield put(loadLayoutData(layout, 'productListingPage'));
        yield put(loadModulesData(modules));
        operatorInstance.updateBucketingConfig(plpProducts);
        const products = plpProducts.loadedProductsPages[0];
        const isGuest = !getUserLoggedInState({ ...state });
        const isRemembered = isRememberedUser({ ...state });
        if (!isGuest && !isRemembered) {
          const generalProductIdsList = products.map(
            product => product.productInfo.generalProductId
          );
          plpProducts.loadedProductsPages[0] = yield call(
            getProductsUserCustomInfo,
            generalProductIdsList,
            products
          );
        }
        yield put(setListingFirstProductsPage({ ...plpProducts }));
      }
    }
    yield put(
      setPlpLoadingState({ isLoadingMore: false, isScrollToTop: false, isDataLoading: false })
    );
  } catch (err) {
    logger.error(err);
    yield put(
      setPlpLoadingState({ isLoadingMore: false, isScrollToTop: false, isDataLoading: false })
    );
  }
}

export function* fetchMoreProducts({ payload = {} }) {
  try {
    const { url } = payload;
    const location = getUrl(url);
    let state = yield select();
    yield put(setPlpLoadingState({ isLoadingMore: true }));
    const reqObj = operatorInstance.getMoreBucketedProducts(state, location);
    if (reqObj && reqObj.categoryId) {
      state = yield select();
      const plpProducts = yield call(instanceProductListing.getProducts, reqObj, state);
      if (
        plpProducts &&
        plpProducts.loadedProductsPages &&
        plpProducts.loadedProductsPages[0] &&
        plpProducts.loadedProductsPages[0].length
      ) {
        operatorInstance.updateBucketingConfig(plpProducts);
        const products = plpProducts.loadedProductsPages[0];
        const isGuest = !getUserLoggedInState(state);
        const isRemembered = isRememberedUser(state);
        if (!isGuest && !isRemembered) {
          const generalProductIdsList = products.map(
            product => product.productInfo.generalProductId
          );
          plpProducts.loadedProductsPages[0] = yield call(
            getProductsUserCustomInfo,
            generalProductIdsList,
            products
          );
        }
        yield putResolve(setPlpProducts({ ...plpProducts }));
      }
    }
    yield put(setPlpLoadingState({ isLoadingMore: false }));
  } catch (err) {
    logger.error(err);
  }
}

function* ProductListingSaga() {
  yield takeLatest(PRODUCTLISTING_CONSTANTS.FETCH_PRODUCTS, fetchPlpProducts);
  yield takeLatest(PRODUCTLISTING_CONSTANTS.GET_MORE_PRODUCTS, fetchMoreProducts);
}

export default ProductListingSaga;
