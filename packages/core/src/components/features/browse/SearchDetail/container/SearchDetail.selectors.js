import { SEARCH_REDUCER_KEY } from '../../../../../constants/reducer.constants';

const getSearchedResult = state => {
  return (
    state[SEARCH_REDUCER_KEY] &&
    state[SEARCH_REDUCER_KEY].searchResults &&
    state[SEARCH_REDUCER_KEY].searchResults.response &&
    state[SEARCH_REDUCER_KEY].searchResults.response.products
  );
};
export default getSearchedResult;
