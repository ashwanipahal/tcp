import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Reactotron from 'reactotron-react-native';
import { cacheEnhancerMiddleware } from '@tcp/core/src/utils/cache.util';
import { setStoreRef } from '@tcp/core/src/utils/store.utils';

import globalReducers from '../reducers';
import rootSaga from '../sagas/sagas';
import createAnalyticsMiddleware from '../middlewares/analytics';

export const initializeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware, createAnalyticsMiddleware()];

  const enhancers = [
    applyMiddleware(...middlewares),
    __DEV__ && Reactotron.createEnhancer(),
    cacheEnhancerMiddleware(),
  ];
  /* eslint-disable  */

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  // eslint-disable-next-line no-underscore-dangle

  const store = createStore(globalReducers, initialState, composeEnhancers(...enhancers));

  store.sagaTask = sagaMiddleware.run(rootSaga);

  // Need to save the store in a separate variable as there is no easy way of getting the store in Non-saga file like util.js
  setStoreRef(store);
  return store;
};

export default initializeStore;
