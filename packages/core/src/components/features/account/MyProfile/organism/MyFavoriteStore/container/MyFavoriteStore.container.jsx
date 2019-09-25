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
  getDefaultStore,
} from '../../../../User/container/User.selectors';
import { getCommonLabels } from '../../../../Account/container/Account.selectors';
import { getMyFavoriteStoreAction, resetMyFavoriteStoreAction } from './MyFavoriteStore.actions';

export class MyFavoriteStoreContainer extends PureComponent {
  componentDidMount() {
    const { favoriteStoreDetails, getMyFavoriteStoreDetails } = this.props;
    if (!favoriteStoreDetails) {
      getMyFavoriteStoreDetails();
    }
  }

  componentWillUnmount() {
    const { resetMyFavoriteStoreDetails } = this.props;
    resetMyFavoriteStoreDetails();
  }

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
      isMyPreferences,
    } = this.props;

    return (
      <MyFavoriteStore
        defaultStore={defaultStore}
        labels={labels}
        favStoreName={favStoreName}
        favStoreAddress={favStoreAddress}
        favStoreState={favStoreState}
        favStoreCity={favStoreCity}
        favStoreZipcode={favStoreZipcode}
        favStorePhone={favStorePhone}
        isMyPreferences={isMyPreferences}
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
  isMyPreferences: false,
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
  resetMyFavoriteStoreDetails: PropTypes.func.isRequired,
  isMyPreferences: PropTypes.bool,
};

export const mapDispatchToProps = dispatch => ({
  getMyFavoriteStoreDetails: () => {
    dispatch(getMyFavoriteStoreAction());
  },
  resetMyFavoriteStoreDetails: () => {
    dispatch(resetMyFavoriteStoreAction());
  },
});

function mapStateToProps(state) {
  return {
    labels: getCommonLabels(state),
    favoriteStoreDetails: getFavoriteStore(state),
    favStoreName: getFavoriteStoreName(state),
    favStoreAddress: getFavoriteStoreAddress(state),
    favStoreCity: getFavoriteStoreCity(state),
    favStoreState: getFavoriteStoreState(state),
    favStoreZipcode: getFavoriteStoreZipcode(state),
    favStorePhone: getFavoriteStorePhone(state),
    defaultStore: getDefaultStore(state),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyFavoriteStoreContainer);
