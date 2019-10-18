import { fromJS } from 'immutable';
import SearchDetailReducer from '../container/SearchDetail.reducer';
import {
  setSlpProducts,
  setListingFirstProductsPage,
  setSlpLoadingState,
} from '../container/SearchDetail.actions';

const initialState = fromJS({
  cacheUntil: null,
});

describe('SearchDetail reducer', () => {
  it('should return default object as default state', () => {
    expect(SearchDetailReducer(undefined, {})).toEqual(initialState);
  });

  it('should append the products list page when set products is initited', () => {
    const stateWithLoadedProducts = fromJS({
      loadedProductsPages: [{ products: { categoryId: 234322 } }],
    });
    expect(stateWithLoadedProducts.get('loadedProductsPages').size).toEqual(1);
    const newState = SearchDetailReducer(
      stateWithLoadedProducts,
      setSlpProducts({ loadedProductsPages: [{ products: { categoryId: 342232 } }] })
    );
    expect(newState.get('loadedProductsPages').size).toEqual(2);
  });

  it('should add the initial product list page state', () => {
    const newState = SearchDetailReducer(
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
    const newState = SearchDetailReducer(
      initialState,
      setSlpLoadingState({ loadingMoreProducts: true })
    );
    expect(newState.get('loadingMoreProducts')).toEqual(true);
  });
});
