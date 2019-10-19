import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPreferencesTileComponent from '../views';
import { getLabels } from '../../../../Account/container/Account.selectors';
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
import { getsocialDataOnLoadState } from '../../../../../../common/organisms/SocialAccount/container/Social.selectors';
import { getSocialAccount } from '../../../../../../common/organisms/SocialAccount/container/Social.actions';
import { getMyFavoriteStoreAction } from '../../../../MyProfile/organism/MyFavoriteStore/container/MyFavoriteStore.actions';

class MyPreferencesTile extends PureComponent {
  componentDidMount() {
    const {
      favoriteStoreDetails,
      getMyFavoriteStoreDetails,
      socialAccounts,
      socialLoad,
    } = this.props;

    if (!favoriteStoreDetails) {
      getMyFavoriteStoreDetails();
    }
    if (socialAccounts.size === 0) {
      socialLoad();
    }
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
      socialAccounts,
    } = this.props;
    return (
      <MyPreferencesTileComponent
        labels={labels}
        defaultStore={defaultStore}
        favStoreName={favStoreName}
        favStoreAddress={favStoreAddress}
        favStoreState={favStoreState}
        favStoreCity={favStoreCity}
        favStoreZipcode={favStoreZipcode}
        favStorePhone={favStorePhone}
        socialAccounts={socialAccounts}
      />
    );
  }
}

MyPreferencesTile.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  defaultStore: PropTypes.string,
  favoriteStoreDetails: PropTypes.shape({}),
  favStoreName: PropTypes.string,
  favStoreAddress: PropTypes.string,
  favStoreState: PropTypes.string,
  favStoreCity: PropTypes.string,
  favStoreZipcode: PropTypes.string,
  favStorePhone: PropTypes.string,
  getMyFavoriteStoreDetails: PropTypes.func.isRequired,
  socialAccounts: PropTypes.shape({}),
  socialLoad: PropTypes.func.isRequired,
};

MyPreferencesTile.defaultProps = {
  defaultStore: '',
  favoriteStoreDetails: {},
  favStoreName: '',
  favStoreAddress: '',
  favStoreState: '',
  favStoreCity: '',
  favStoreZipcode: '',
  favStorePhone: '',
  socialAccounts: {},
};

export const mapStateToProps = state => ({
  labels: getLabels(state),
  favoriteStoreDetails: getFavoriteStore(state),
  favStoreName: getFavoriteStoreName(state),
  favStoreAddress: getFavoriteStoreAddress(state),
  favStoreCity: getFavoriteStoreCity(state),
  favStoreState: getFavoriteStoreState(state),
  favStoreZipcode: getFavoriteStoreZipcode(state),
  favStorePhone: getFavoriteStorePhone(state),
  defaultStore: getDefaultStore(state),
  socialAccounts: getsocialDataOnLoadState(state),
});

export const mapDispatchToProps = dispatch => ({
  getMyFavoriteStoreDetails: () => {
    dispatch(getMyFavoriteStoreAction());
  },
  socialLoad: () => {
    dispatch(getSocialAccount());
  },
});

export { MyPreferencesTile as MyPreferencesTileVanilla };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPreferencesTile);
