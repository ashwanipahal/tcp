import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import createSagaMiddleware from 'redux-saga';
import { cacheEnhancerMiddleware } from '@tcp/core/src/utils/cache.util';
import { setStoreRef } from '@tcp/core/src/utils/store.utils';
import globalSagas from '../sagas';
import globalReducers from '../reducers';
import createAnalyticsMiddleware from '../middlewares/analytics';
import createDataLayer from '../../analytics/dataLayer';

const configureStore = preloadedState => {
  /**
   * Recreate the stdChannel (saga middleware) with every context.
   */

  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [
    sagaMiddleware,
    // Use analytics middleware conditionally
    process.env.ANALYTICS && createAnalyticsMiddleware(),
  ];

  const enhancers = [applyMiddleware(...middlewares), cacheEnhancerMiddleware()];

  // Choose compose method depending upon environment and platform
  const composeEnhancers = typeof window === 'object' ? composeWithDevTools : compose;

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass
   * `preloadedState` when creating the store.
   */

  const store = createStore(globalReducers, preloadedState, composeEnhancers(...enhancers));

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store.
   * It is used to await the rootSaga task before sending results to the client.
   */
  store.sagaTask = sagaMiddleware.run(globalSagas);

  // Need to save the store in a separate variable as there is no easy way of getting the store in Non-saga file like util.js
  setStoreRef(store);

  /**
   * This is where we assign window._dataLayer for analytics logic
   */
  if (process.env.ANALYTICS && typeof window !== 'undefined') {
    // eslint-disable-next-line
    window._dataLayer = createDataLayer(store);
  }

  return store;
};

export default configureStore;
