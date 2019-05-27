import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { globalReducers, globalSagas } from '../index';

const configureStore = (preloadedState) => {

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
		applyMiddleware(sagaMiddleware)
	)
  
	/**
	 * next-redux-saga depends on `sagaTask` being attached to the store.
	 * It is used to await the rootSaga task before sending results to the client.
	 */
	store.sagaTask = sagaMiddleware.run(globalSagas)

	return store
}
  
export default configureStore;