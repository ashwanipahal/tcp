import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyPreferencesTileComponent from '../views';
// import { getSiteId } from '../../../../../../../utils';
import { isCanada } from '../../../../../../../utils';
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
  constructor(props) {
    super(props);
    this.isCanada = isCanada();
  }

  componentDidMount() {
    const {
      favoriteStoreDetails,
      getMyFavoriteStoreDetails,
      getSocialAcc,
      socialLoad,
    } = this.props;

    if (!favoriteStoreDetails) {
      getMyFavoriteStoreDetails();
    }
    if (getSocialAcc.size === 0) {
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
      getSocialAcc,
    } = this.props;
    return (
      <MyPreferencesTileComponent
        labels={labels}
        isCanada={this.isCanada}
        defaultStore={defaultStore}
        favStoreName={favStoreName}
        favStoreAddress={favStoreAddress}
        favStoreState={favStoreState}
        favStoreCity={favStoreCity}
        favStoreZipcode={favStoreZipcode}
        favStorePhone={favStorePhone}
        getSocialAcc={getSocialAcc}
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
  getSocialAcc: PropTypes.shape({}),
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
  getSocialAcc: {},
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
  getSocialAcc: getsocialDataOnLoadState(state),
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
