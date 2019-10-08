import filter from 'lodash/filter';
import { getLabelValue } from '@tcp/core/src/utils';
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
 * @function sortAutoSuggest
 * @summary This will sort the list of object on the basis of list of properties provided to the function.
 * @param {Object[]} array - This is a list of items on which sort need to executed
 * @param {Array} sortOrderList - This is a list of order property. Sorting while happen in the
 * same order in which items are there in the list, result will contain the items
 * on the top which matches first list item from this list then after the second list item and so on.
 * @param {String} sortKey - This is a property name which is use to sort the list
 * @return {Object} This is a list with sorted items
 */
// eslint-disable-next-line class-methods-use-this
const sortAutoSuggest = (array, sortOrderList, sortKey) => {
  array.sort((a, b) => {
    const A = a[sortKey];
    const B = b[sortKey];
    if (sortOrderList.indexOf(A) > sortOrderList.indexOf(B)) {
      return 1;
    }
    return -1;
  });
  return array;
};

/**
 * @function removeDuplicateAutosuggest
 * @summary This will removes the duplicate items from the provided list.
 * @param {Object[]} autosuggestItems - This is a list of items from which duplicate item to be removed
 * @param {String} propertyName - This is a property name on which duplicate items to be removed
 * @return {Object} This is a list with unique items
 */
// eslint-disable-next-line class-methods-use-this
const removeDuplicateAutosuggest = (autosuggestItems, propertyName) => {
  const uniqueItems = autosuggestItems.reduce((acc, cur) => {
    acc[cur[propertyName].toLowerCase()] = cur;
    return acc;
  }, {});
  return Object.values(uniqueItems);
};
const getCategoryMatches = response => {
  return filter(response.products, ['doctype', 'categoryLinkMap']).map(val => {
    const category = val.autosuggest.split('~');
    const categorySuggestion = category[0];
    const getCategoryPath = categorySuggestion
      .split('|')
      .map(suggestion => suggestion.split('>'))
      .join(',')
      .split(',');
    const parentCategory = getCategoryPath[0];
    const getPath = getCategoryPath.filter(currentCategory => currentCategory !== parentCategory);
    getPath.unshift(parentCategory);
    const categoryPath = getPath.join('>');
    return {
      text: categoryPath,
      docType: val.doctype,
      url: `'/c/'${category[1] ? category[1] : category[2]}`,
    };
  });
};

/**
 * @function makeSearchApi - Used as abstract layer to do all server request and recieve the track order info.
 * @param {object} payload - data required to make server request.
 * @returns {object} success response or error response.
 */

export const makeSearch = (input, defaultResultCount = 4) => {
  const { suggestionsCount, searchTerm, isHideBundleProduct, slpLabels } = input;

  const bundleFilter = isHideBundleProduct ? { filter: '-product_type:BUNDLE' } : {};
  const payload = {
    header: {},
    body: {
      ...bundleFilter,
      variants: true,
      q: searchTerm,
      version: 'V2',
      sourceFields: 'categoryLinkMap',
      'sourceField.categoryLinkMap.count': suggestionsCount.category,
      'keywordSuggestions.count': suggestionsCount.keywords,
      'topQueries.count': suggestionsCount.promotedTopQueries,
      'popularProducts.count': input.productsCounts ? input.productsCounts : defaultResultCount,
      'popularProducts.fields':
        'catgroup_id,product_name,imageUrl,min_list_price,min_offer_price,TCPOutOfStockFlagUSStore,TCPOutOfStockFlagCanadaStore,seo_token,uniqueId,product_type,low_offer_price, high_offer_price, low_list_price, high_list_price',
    },
    webService: endpoints.searchBarApi,
  };

  return executeUnbxdAPICall(payload)
    .then(res => {
      const { response } = res.body;

      if (!response) {
        throw new Error('Response has errors!');
      }
      // Iterate throughthe full response and grab only the data we require
      // filter out product list from the API response
      const productsList = response.products
        .filter(item => 'catgroup_id' in item)
        .map(product => {
          const bundleProduct = product.product_type === 'BUNDLE' || false;
          const pdpURLID = product.seo_token || product.uniqueId;
          return {
            name: product.product_name,
            imageUrl: product.imageUrl,
            listPrice: parseFloat(product.min_list_price) || 0,
            offerPrice: parseFloat(product.min_offer_price) || 0,
            lowListPrice: parseFloat(product.low_list_price) || 0,
            lowOfferPrice: parseFloat(product.low_offer_price) || 0,
            highListPrice: parseFloat(product.high_list_price) || 0,
            highOfferPrice: parseFloat(product.high_offer_price) || 0,
            isBundleProduct: bundleProduct,
            productUrl: `${bundleProduct ? '/b' : '/p'}/${pdpURLID}`,
          };
        });

      // filter out search suggestion from API response on the basis of filter properties
      const filterProperties = ['PROMOTED_SUGGESTION', 'KEYWORD_SUGGESTION', 'TOP_SEARCH_QUERIES']; // There are properties that need to be filterd out
      const terms = filter(response.products, item => filterProperties.includes(item.doctype)).map(
        val => {
          return { text: val.autosuggest, docType: val.doctype };
        }
      );

      // sort the filtered result so that the 'PROMOTED_SUGGESTION' would be on the top of the result
      const sortedAutoSuggestItems = sortAutoSuggest(terms, filterProperties, 'docType');

      // Revoving duplicate item from the search suggestion.
      const autoSuggestItems = removeDuplicateAutosuggest(sortedAutoSuggestItems, 'text');

      const categories = getCategoryMatches(response);

      return {
        autosuggestList: [
          {
            heading: `${getLabelValue(slpLabels, 'lbl_search_looking_for')}`,
            suggestions: autoSuggestItems,
          },
          {
            heading: `${getLabelValue(slpLabels, 'lbl_category_matches')}`,
            suggestions: categories,
          },
        ],
        autosuggestProducts: productsList,
      };
    })
    .catch(errorHandler);
};

export default makeSearch;
