import { combineReducers, createStore, applyMiddleware } from 'redux';
import { ProductListingPageReducer } from '@tcp/core/src/components/features/browse/ProductListingPage/container/ProductListingPage.reducer';
import createSagaMiddleware from 'redux-saga';
import { homePageReducer } from './homePage/homePage.reducer';
import rootSaga from './sagas';

let store;

export const initializeStore = (initialState, options) => {
  const sagaMiddleware = createSagaMiddleware();
  const AppReducers = combineReducers({
    ProductListingPageReducer,
    homePageReducer,
  });
  const rootReducer = (state, action) => {
    return AppReducers(state, action);
  };
  store = createStore(rootReducer, initialState, applyMiddleware(sagaMiddleware));
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};
