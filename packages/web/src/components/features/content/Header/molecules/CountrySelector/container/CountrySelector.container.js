import { connect } from 'react-redux';

import { getCountryListData } from '@tcp/core/src/reduxStore/actions';
import {
  getModuleXContent,
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
  getLabels,
  getCurrenciesMap,
  getCurrentLanguage,
  getCurrentCurrency,
  getOldCountry,
  getOldCurrency,
  getOldLanguage,
  getSitesTable,
  getSiteId,
  getModuleXContentId,
  getNoteContent,
  getSelectedCountryName,
} from './CountrySelector.selectors';
import CountrySelectorView from '../views';

export const mapDispatchToProps = dispatch => {
  return {
    getModuleXContent: payload => {
      dispatch(getModuleXContent(payload));
    },
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
    savedLanguage: getOldLanguage(state),
    savedCountry: getOldCountry(state),
    savedCurrency: getOldCurrency(state),
    siteId: getSiteId(state),
    labels: getLabels(state),
    noteContent: getNoteContent(state),
    noteContentId: getModuleXContentId(state),
    selectedCountryName: getSelectedCountryName(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelectorView);
