import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPreferencesTileComponent from '../views';
import { getLabels } from '../../../../Account/container/Account.selectors';
import { isGymboree } from '../../../../../../../utils';
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
import { getCustomerPreferences } from '../../../../MyPreferenceSubscription/container/MyPreferenceSubscriptionText.selectors';
import { getSubscribeStore } from '../../../../MyPreferenceSubscription/container/MyPreferenceSubscription.actions';

class MyPreferencesTile extends PureComponent {
  componentDidMount() {
    const {
      favoriteStoreDetails,
      getMyFavoriteStoreDetails,
      socialAccounts,
      socialLoad,
      getContactPreferences,
      customerPreferences,
    } = this.props;

    if (!customerPreferences) {
      getContactPreferences();
    }

    if (!favoriteStoreDetails) {
      getMyFavoriteStoreDetails();
    }
    if (socialAccounts.size === 0) {
      socialLoad();
    }
  }

  getContactPreferencesValues = customerPreferencesObject => {
    const { CustomerPreferences, CustomerPreferencesGym } = customerPreferencesObject;

    const customerPreferences = isGymboree() ? CustomerPreferencesGym : CustomerPreferences;

    const contactPreferencesValue = { placeRewardsPush: false, placeRewardsSms: false };

    if (customerPreferences && customerPreferences.length) {
      customerPreferences.forEach(customerPreference => {
        const { preferenceMode, isModeSelected } = customerPreference;
        if (preferenceMode === 'placeRewardsPush' || preferenceMode === 'placeRewardsSms') {
          contactPreferencesValue[preferenceMode] = isModeSelected;
        }
      });
      return contactPreferencesValue;
    }

    return contactPreferencesValue;
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
      socialAccounts,
      customerPreferences,
      handleComponentChange,
    } = this.props;

    const customerPreferencesValue =
      (customerPreferences && this.getContactPreferencesValues(customerPreferences)) || {};
    console.info('render customerPreferences',customerPreferences)
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
        customerPreferences={customerPreferencesValue}
        handleComponentChange={handleComponentChange}
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
  getContactPreferences: PropTypes.func.isRequired,
  handleComponentChange: PropTypes.func.isRequired,
  customerPreferences: PropTypes.shape({}),
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
  customerPreferences: {},
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
  customerPreferences: getCustomerPreferences(state),
});

export const mapDispatchToProps = dispatch => ({
  getMyFavoriteStoreDetails: () => {
    dispatch(getMyFavoriteStoreAction());
  },
  socialLoad: () => {
    dispatch(getSocialAccount());
  },
  getContactPreferences: () => {
    dispatch(getSubscribeStore());
  },
});

export { MyPreferencesTile as MyPreferencesTileVanilla };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPreferencesTile);
