import { executeUnbxdAPICall } from '../../../handler';
import endpoints from '../../../endpoints';

/**
 * @function errorHandler function to handle all the server side errors.
 * @param {object} err - error object in case server side data send server side validation errors.
 * @returns {object} error object with appropirate error message
 */
const errorHandler = err => {
  if (err && err.errorResponse && err.errorResponse.errorMessage) {
    throw new Error(err.errorResponse.errorMessage);
  }
  throw new Error('genericError');
};

/**
 * @function makeSearchApi - Used as abstract layer to do all server request and recieve the track order info.
 * @param {object} payload - data required to make server request.
 * @returns {object} success response or error response.
 */
export const makeSearch = payload => {
  const payloadData = {
    body: {
      variants: 'true',
      q: payload.searchTerm,
      version: 'V2',
      sourceFields: 'categoryLinkMap',
      'sourceField.categoryLinkMap.count': 4,
      'keywordSuggestions.count': 4,
      'topQueries.count': 4,
      'popularProducts.count': 4,
      'popularProducts.fields':
        'catgroup_id,product_name,imageUrl,min_list_price,min_offer_price,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,seo_token,uniqueId,product_type,low_offer_price,%20high_offer_price,%20low_list_price,%20high_list_price',
    },
    webService: endpoints.searchBarApi,
  };
  return executeUnbxdAPICall(payloadData)
    .then(res => {
      return res;
    })
    .catch(errorHandler);
};

export default makeSearch;
