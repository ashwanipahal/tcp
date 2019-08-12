import { connect } from 'react-redux';

import {
  getCountryListData,
  submitCountrySelection,
  toggleCountrySelectorModal,
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
  };
};

const mapStateToProps = state => {
  const { CountrySelector = {} } = state;
  return {
    isModalOpen: CountrySelector.isModalOpen,
    countryListData: CountrySelector.countryList,
    labels: state.Labels.global.countrySelector,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CountrySelectorView);
