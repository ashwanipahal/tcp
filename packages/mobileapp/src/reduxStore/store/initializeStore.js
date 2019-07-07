import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { cacheEnhancerMiddleware } from '@tcp/core/src/utils/cache.util';
import globalReducers from '../reducers/reducers';
import rootSaga from '../sagas/sagas';

let store;

export const initializeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  store = createStore(
    globalReducers,
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
