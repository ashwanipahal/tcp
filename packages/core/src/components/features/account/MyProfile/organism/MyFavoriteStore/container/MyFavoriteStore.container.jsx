import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import MyFavoriteStore from '../views';
import {
  getFavoriteStore,
  getFavoriteStoreName,
  getFavoriteStoreAddress,
  getFavoriteStorePhone,
  getFavoriteStoreState,
  getFavoriteStoreZipcode,
  getFavoriteStoreCity,
} from '../../../../User/container/User.selectors';
import getMyFavoriteStoreLabels from './MyFavoriteStore.selector';
import getMyFavoriteStoreAction from './MyFavoriteStore.actions';

export class MyFavoriteStoreContainer extends PureComponent {
  componentDidMount() {
    const { favoriteStoreDetails, getMyFavoriteStoreDetails } = this.props;
    if (!favoriteStoreDetails) {
      getMyFavoriteStoreDetails();
    }
  }

  formatPhone = phone => {
    if (phone) return `(${phone.slice(0, 3)})-${phone.slice(3, 6)}-${phone.slice(6, 15)}`;
    return '';
  };

  capitalizeFirstLetter = string => {
    if (string)
      return string
        .toLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(' ');
    return '';
  };

  render() {
    const {
      defaultStore,
      labels,
      favStoreName,
      favStoreAddress,
      favStoreState,
      favStoreCity,
      favStoreZipcode,
      favStorePhone,
    } = this.props;

    return (
      <MyFavoriteStore
        defaultStore={defaultStore}
        labels={labels}
        favStoreName={this.capitalizeFirstLetter(favStoreName)}
        favStoreAddress={this.capitalizeFirstLetter(favStoreAddress)}
        favStoreState={favStoreState}
        favStoreCity={this.capitalizeFirstLetter(favStoreCity)}
        favStoreZipcode={favStoreZipcode}
        favStorePhone={this.formatPhone(favStorePhone)}
      />
    );
  }
}

MyFavoriteStoreContainer.defaultProps = {
  defaultStore: '',
  favoriteStoreDetails: {},
  favStoreName: '',
  favStoreAddress: '',
  favStoreState: '',
  favStoreCity: '',
  favStoreZipcode: '',
  favStorePhone: '',
};

MyFavoriteStoreContainer.propTypes = {
  defaultStore: PropTypes.string,
  labels: PropTypes.shape({}).isRequired,
  favoriteStoreDetails: PropTypes.shape({}),
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,

  getMyFavoriteStoreDetails: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => ({
  getMyFavoriteStoreDetails: () => {
    dispatch(getMyFavoriteStoreAction());
  },
});

function mapStateToProps(state) {
  return {
    labels: getMyFavoriteStoreLabels(state),
    favoriteStoreDetails: getFavoriteStore(state),
    favStoreName: getFavoriteStoreName(state),
    favStoreAddress: getFavoriteStoreAddress(state),
    favStoreCity: getFavoriteStoreCity(state),
    favStoreState: getFavoriteStoreState(state),
    favStoreZipcode: getFavoriteStoreZipcode(state),
    favStorePhone: getFavoriteStorePhone(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavoriteStoreContainer);
