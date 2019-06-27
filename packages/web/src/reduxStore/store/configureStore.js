import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { cacheEnhancerMiddleware } from '@tcp/core/src/utils/cache.util';
import globalReducers from '../reducers';
import globalSagas from '../sagas';

const configureStore = preloadedState => {
  /**
   * Recreate the stdChannel (saga middleware) with every context.
   */

  const sagaMiddleware = createSagaMiddleware();

  /**
   * Since Next.js does server-side rendering, you are REQUIRED to pass
   * `preloadedState` when creating the store.
   */

  const store = createStore(
    globalReducers,
    preloadedState,
    compose(
      applyMiddleware(sagaMiddleware),
      cacheEnhancerMiddleware()
    )
  );

  /**
   * next-redux-saga depends on `sagaTask` being attached to the store.
   * It is used to await the rootSaga task before sending results to the client.
   */
  store.sagaTask = sagaMiddleware.run(globalSagas);

  return store;
};

export default configureStore;
