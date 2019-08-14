import { connect } from 'react-redux';

import {
  getCountryListData,
  submitCountrySelection,
  toggleCountrySelectorModal,
  updateSelectedCountry,
  updateSelectedLanguage,
  updateSelectedCurrency,
} from './CountrySelector.actions';
import CountrySelectorView from '../views';

export const mapDispatchToProps = dispatch => {
  return {
    toggleModal: payload => {
      dispatch(toggleCountrySelectorModal(payload));
    },
    loadCountryListData: () => {
      dispatch(getCountryListData());
    },
    handleSubmit: () => {
      dispatch(submitCountrySelection());
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
  };
};

const mapStateToProps = state => {
  const { CountrySelector = {} } = state;
  return {
    isModalOpen: CountrySelector.isModalOpen,
    countryListData: CountrySelector.countryList,
    country: CountrySelector.country,
    labels: state.Labels.global.countrySelector,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelectorView);
