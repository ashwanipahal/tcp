import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import LoginPageReducer from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.reducer';
import createSagaMiddleware from 'redux-saga';
import { cacheEnhancerMiddleware } from '@tcp/core/src/utils/cache.util';
import {
  HOMEPAGE_REDUCER_KEY,
  PRODUCTLISTINGPAGE_REDUCER_KEY,
  ADDRESSBOOK_REDUCER_KEY,
} from '@tcp/core/src/constants/reducer.constants';
import { createFilteredReducer } from '@tcp/core/src/utils/redux.util';
import AddressBookReducer from '@tcp/core/src/components/features/account/AddressBook/container/AddressBook.reducer';
import HomePageReducer from '../components/features/content/HomePage/container/HomePage.reducer';

import rootSaga from './sagas';

let store;

const filteredProductListingPageReducer = createFilteredReducer(
  ProductListingPageReducer,
  PRODUCTLISTINGPAGE_REDUCER_KEY
);

export const initializeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const AppReducers = combineReducers({
    [PRODUCTLISTINGPAGE_REDUCER_KEY]: filteredProductListingPageReducer,
    [HOMEPAGE_REDUCER_KEY]: HomePageReducer,
    LoginPageReducer,
    [ADDRESSBOOK_REDUCER_KEY]: AddressBookReducer,
  });
  const rootReducer = (state, action) => {
    return AppReducers(state, action);
  };
  store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(sagaMiddleware),
      cacheEnhancerMiddleware()
    )
  );
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export default initializeStore;
