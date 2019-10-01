import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { getNearByStore } from './StoreDetail.actions';
import {
  getFavoriteStoreActn,
  setFavoriteStoreActn,
} from '../../StoreLanding/container/StoreLanding.actions';
import StoreDetail from './views/StoreDetail';
import { routeToStoreDetails, routerPush } from '../../../../../utils';
import {
  getCurrentStore,
  formatCurrentStoreToObject,
  getNearByStores,
  getLabels,
  isFavoriteStore,
} from './StoreDetail.selectors';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import googleMapConstants from '../../../../../constants/googleMap.constants';
import mockLabels from '../../../../common/molecules/StoreAddressTile/__mocks__/labels.mock';

export class StoreDetailContainer extends PureComponent {
  static routesBack(e) {
    e.preventDefault();
    if (window.history.length > 2) window.history.back();
    else {
      routerPush('/', '/home');
    }
  }

  constructor(props) {
    super(props);
    import('../../../../../utils')
      .then(
        ({ isMobileApp, navigateToNestedRoute, UrlHandler, validateExternalUrl, isAndroid }) => {
          this.hasMobileApp = isMobileApp();
          this.navigateToNestedRoute = navigateToNestedRoute;
          this.UrlHandler = UrlHandler;
          this.validateExternalUrl = validateExternalUrl;
          this.isAndroid = isAndroid();
        }
      )
      .catch(error => {
        console.log('error: ', error);
      });
  }

  componentDidMount() {
    this.loadCurrentStoreInitialInfo();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot !== null) {
      this.loadCurrentStoreInitialInfo();
    }
  }

  // eslint-disable-next-line no-unused-vars
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { currentStoreInfo, formatStore, isUserLoggedIn } = this.props;
    const prevStore = formatStore(prevProps.currentStoreInfo);
    const newStore = formatStore(currentStoreInfo);
    if (
      prevStore.basicInfo.id !== newStore.basicInfo.id ||
      prevProps.isUserLoggedIn !== isUserLoggedIn
    ) {
      return true;
    }
    return null;
  }

  openMoreStores = () => {
    const { navigation } = this.props;
    this.navigateToNestedRoute(navigation, 'HomeStack', 'StoreLanding');
  };

  dialStoreNumber = () => {
    const { currentStoreInfo } = this.props;
    const {
      basicInfo: { phone },
    } = currentStoreInfo;
    let phoneUrl = '';
    if (this.isAndroid) {
      phoneUrl = `tel:$${`{${phone}}`}`;
    } else phoneUrl = `telprompt:$${`{${phone}}`}`;
    this.UrlHandler(phoneUrl);
  };

  loadCurrentStoreInitialInfo() {
    const { loadNearByStoreInfo, currentStoreInfo, formatStore, getFavStore } = this.props;
    const store = formatStore(currentStoreInfo);
    if (store.basicInfo && Object.keys(store.basicInfo).length > 0) {
      const { basicInfo } = store;
      const { coordinates, id } = basicInfo;
      const payloadArgs = {
        storeLocationId: id,
        getNearby: true,
        latitude: coordinates.lat,
        longitude: coordinates.long,
      };
      getFavStore({ geoLatLang: { lat: coordinates.lat, long: coordinates.long } });
      loadNearByStoreInfo(payloadArgs);
    }
  }

  openStoreDirections(store) {
    const {
      basicInfo: { address, coordinates },
    } = store;
    const { addressLine1, city, state, zipCode } = address;
    const { lat, long } = coordinates;
    if (this.hasMobileApp) {
      const url = `${googleMapConstants.OPEN_STORE_DIR_APP}${lat}%2C${long}`;
      if (this.validateExternalUrl(url)) {
        this.UrlHandler(url);
      }
    } else {
      window.open(
        `${
          googleMapConstants.OPEN_STORE_DIR_WEB
        }${addressLine1},%20${city},%20${state},%20${zipCode}`
      );
    }
  }

  render() {
    const {
      currentStoreInfo,
      formatStore,
      nearByStores,
      labels,
      isFavorite,
      setFavStore,
    } = this.props;
    const store = formatStore(currentStoreInfo);
    const otherStores =
      nearByStores && nearByStores.length > 0
        ? nearByStores.filter(nStore => nStore.basicInfo.id !== store.basicInfo.id)
        : [];

    return store && Object.keys(store).length > 0 ? (
      <StoreDetail
        className="storedetailinfo"
        store={store}
        labels={labels || mockLabels.StoreLocator}
        otherStores={otherStores}
        openStoreDetails={selectedStore => routeToStoreDetails(selectedStore)}
        openStoreDirections={() => this.openStoreDirections(store)}
        routesBack={this.constructor.routesBack}
        dialStoreNumber={this.dialStoreNumber}
        openMoreStores={this.openMoreStores}
        setFavoriteStore={setFavStore}
        isFavorite={isFavorite}
      />
    ) : null;
  }
}

StoreDetailContainer.propTypes = {
  currentStoreInfo: PropTypes.instanceOf(Map),
  formatStore: PropTypes.func.isRequired,
  nearByStores: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({
    lbl_storelocators_landingpage_openInterval: PropTypes.string,
    lbl_storelocators_landingpage_milesAway: PropTypes.string,
    lbl_storelocators_landingpage_getdirections_link: PropTypes.string,
    lbl_storelocators_landingpage_favStore: PropTypes.string,
    lbl_storelocators_landingpage_setfavStore: PropTypes.string,
    lbl_storelocators_common_atThisPlace: PropTypes.string,
    lbl_storelocators_landingpage_storedetails_link: PropTypes.string,
    lbl_storelocators_details_getdirections_btn: PropTypes.string,
    lbl_storelocators_details_callstore_btn: PropTypes.string,
    lbl_storelocators_details_changestore_btn: PropTypes.string,
    lbl_storelocators_detail_mallType: PropTypes.string,
    lbl_storelocators_detail_entranceType: PropTypes.string,
    lbl_storelocators_details_locations_details_btn: PropTypes.string,
    lbl_storelocators_details_locations_title: PropTypes.string,
  }).isRequired,
  loadNearByStoreInfo: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  getFavStore: PropTypes.func.isRequired,
  setFavStore: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  isUserLoggedIn: PropTypes.bool.isRequired,
};

StoreDetailContainer.defaultProps = {
  currentStoreInfo: fromJS({
    basicInfo: {
      id: '',
      storeName: '',
      phone: '',
      coordinates: {},
      address: {},
    },
    hours: {},
    features: {},
  }),
  navigation: {},
};

const mapStateToProps = state => {
  return {
    currentStoreInfo: getCurrentStore(state),
    formatStore: store => formatCurrentStoreToObject(store),
    nearByStores: getNearByStores(state),
    labels: getLabels(state),
    isFavorite: isFavoriteStore(state),
    isUserLoggedIn: getUserLoggedInState(state),
  };
};

export const mapDispatchToProps = dispatch => ({
  loadNearByStoreInfo: payload => {
    dispatch(getNearByStore(payload));
  },
  getFavStore: payload => {
    dispatch(getFavoriteStoreActn(payload));
  },
  setFavStore: payload => dispatch(setFavoriteStoreActn({ ...payload, key: 'DETAIL' })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreDetailContainer);
