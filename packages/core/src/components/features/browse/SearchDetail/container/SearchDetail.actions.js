import { loadPageSEOData } from '@tcp/core/src/reduxStore/actions';
import { SEO_DATA } from '@tcp/core/src/reduxStore/constants';
import SLP_CONSTANTS from './SearchDetail.constants';

export const setSlpProducts = payload => {
  return {
    type: SLP_CONSTANTS.SET_PRODUCTS,
    payload,
  };
};

export const getSlpProducts = payload => {
  return {
    type: SLP_CONSTANTS.FETCH_SLP_PRODUCTS,
    payload,
  };
};

export const getMoreSlpProducts = payload => {
  return {
    type: SLP_CONSTANTS.GET_MORE_SLP_PRODUCTS,
    payload,
  };
};

export function setListingFirstProductsPage(productsPage) {
  return {
    type: SLP_CONSTANTS.SET_SLP_FIRST_PRODUCTS_PAGE,
    productsPage,
  };
}

export const setSlpLoadingState = payload => {
  return {
    type: SLP_CONSTANTS.SET_SLP_LOADING_STATE,
    payload,
  };
};

export const setSlpResultsAvailableState = payload => {
  return {
    type: SLP_CONSTANTS.SET_SLP_RESULTS_AVAILABLE_STATE,
    payload,
  };
};

export const setSlpSearchTerm = payload => {
  return {
    type: SLP_CONSTANTS.SET_SLP_SEARCHTERM_STATE,
    payload,
  };
};

export const getSearchResult = payload => {
  return {
    type: SLP_CONSTANTS.GET_SLP_SEARCH_RESULTS,
    payload,
  };
};

export const resetSlpProducts = payload => {
  return {
    type: SLP_CONSTANTS.RESET_PRODUCTS,
    payload,
  };
};

export const setAddToFavoriteSLP = payload => {
  return {
    type: SLP_CONSTANTS.SET_ADD_TO_FAVORITE,
    payload,
  };
};

export const initActions = [loadPageSEOData({ page: SEO_DATA.search })];
