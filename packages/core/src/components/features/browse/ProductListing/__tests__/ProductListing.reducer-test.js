import { fromJS } from 'immutable';
import ProductListingReducer from '../container/ProductListing.reducer';
import {
  setPlpProducts,
  setListingFirstProductsPage,
  setPlpLoadingState,
} from '../container/ProductListing.actions';

const initialState = fromJS({
  cacheUntil: null,
});

describe('ProductListing reducer', () => {
  it('should return default object as default state', () => {
    expect(ProductListingReducer(undefined, {})).toEqual(initialState);
  });

  it('should append the products list page when set products is initited', () => {
    const stateWithLoadedProducts = fromJS({
      loadedProductsPages: [{ products: { categoryId: 234322 } }],
    });
    expect(stateWithLoadedProducts.get('loadedProductsPages').size).toEqual(1);
    const newState = ProductListingReducer(
      stateWithLoadedProducts,
      setPlpProducts({ loadedProductsPages: [{ products: { categoryId: 342232 } }] })
    );
    expect(newState.get('loadedProductsPages').size).toEqual(2);
  });

  it('should add the initial product list page state', () => {
    const newState = ProductListingReducer(
      initialState,
      setListingFirstProductsPage({
        productsPage: { loadedProductsPages: [{ products: { categoryId: 342232 } }] },
      })
    );
    expect(newState.get('productsPage')).toEqual({
      loadedProductsPages: [{ products: { categoryId: 342232 } }],
    });
  });

  it('should add the loader state', () => {
    const newState = ProductListingReducer(
      initialState,
      setPlpLoadingState({ loadingMoreProducts: true })
    );
    expect(newState.get('loadingMoreProducts')).toEqual(true);
  });
});
