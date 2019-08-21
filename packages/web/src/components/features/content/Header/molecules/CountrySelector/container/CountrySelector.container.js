import { connect } from 'react-redux';
import utils from '@tcp/core/src/utils';

import {
  getCountryListData,
  submitCountrySelection,
  toggleCountrySelectorModal,
  updateSelectedCountry,
  updateSelectedLanguage,
  updateSelectedCurrency,
  udpateSiteId,
} from './CountrySelector.actions';
import {
  getCurrentCountry,
  getIsModalOpen,
  getCountriesMap,
  getCurrenciesMap,
  getCurrentLanguage,
  getCurrentCurrency,
  getOldCountryCode,
  getOldLanguageCode,
  getSitesTable,
  getSiteId,
} from './CountrySelector.selectors';
import CountrySelectorView from '../views';

export const mapDispatchToProps = dispatch => {
  return {
    toggleModal: payload => {
      dispatch(toggleCountrySelectorModal(payload));
    },
    loadCountryListData: () => {
      dispatch(getCountryListData());
    },
    handleSubmit: payload => {
      dispatch(submitCountrySelection(payload));
    },
    updateCountry: selectedCountry => {
      dispatch(updateSelectedCountry(selectedCountry));
    },
    updateLanguage: selectedLanguage => {
      dispatch(updateSelectedLanguage(selectedLanguage));
    },
    updateCurrency: selectedCurrency => {
      dispatch(updateSelectedCurrency(selectedCurrency));
    },
    updateSiteId: siteId => {
      dispatch(udpateSiteId(siteId));
    },
  };
};

const mapStateToProps = state => {
  return {
    isModalOpen: getIsModalOpen(state),
    countriesMap: getCountriesMap(state),
    currenciesMap: getCurrenciesMap(state),
    sitesTable: getSitesTable(state),
    country: getCurrentCountry(state),
    language: getCurrentLanguage(state),
    currency: getCurrentCurrency(state),
    oldLanguage: getOldLanguageCode(state),
    oldCountry: getOldCountryCode(state),
    siteId: getSiteId(state) || utils.getSiteId(),
    labels: state.Labels.global.countrySelector,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelectorView);
