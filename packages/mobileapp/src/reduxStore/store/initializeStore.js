import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Reactotron from 'reactotron-react-native';
import { cacheEnhancerMiddleware } from '@tcp/core/src/utils/cache.util';
import { setStoreRef } from '@tcp/core/src/utils/store.utils';

import globalReducers from '../reducers/reducers';
import rootSaga from '../sagas/sagas';

let store;

export const initializeStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();

  // eslint-disable-next-line no-underscore-dangle
  const composeEnhancers = (__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  if (__DEV__) {
    store = createStore(
      globalReducers,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware), Reactotron.createEnhancer())
    );
  } else {
    store = createStore(
      globalReducers,
      initialState,
      composeEnhancers(applyMiddleware(sagaMiddleware), cacheEnhancerMiddleware())
    );
  }

  store.sagaTask = sagaMiddleware.run(rootSaga);

  // Need to save the store in a separate variable as there is no easy way of getting the store in Non-saga file like util.js
  setStoreRef(store);
  return store;
};

export default initializeStore;
