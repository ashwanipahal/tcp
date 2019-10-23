import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import logger from '@tcp/core/src/utils/loggerInstance';
import {
  getNearByStore,
  getCurrentStoreInfo,
  getModuleXContent,
  getDistance,
} from './StoreDetail.actions';
import {
  getFavoriteStoreActn,
  setFavoriteStoreActn,
} from '../../StoreLanding/container/StoreLanding.actions';
import StoreDetail from './views/StoreDetail';
import {
  routeToStoreDetails,
  routerPush,
  fetchStoreIdFromUrlPath,
  isMobileApp,
} from '../../../../../utils';
import {
  getCurrentStore,
  formatCurrentStoreToObject,
  getNearByStores,
  getLabels,
  isFavoriteStore,
  getReferredContentList,
  getRichTextContent,
  getStoreDistance,
} from './StoreDetail.selectors';
import { getUserLoggedInState } from '../../../account/User/container/User.selectors';
import googleMapConstants from '../../../../../constants/googleMap.constants';

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
      .then(({ navigateToNestedRoute, UrlHandler, isAndroid, mapHandler }) => {
        this.navigateToNestedRoute = navigateToNestedRoute;
        this.UrlHandler = UrlHandler;
        this.isAndroid = isAndroid && isAndroid();
        this.mapHandler = mapHandler;
      })
      .catch(error => {
        logger.error(error);
      });
  }

  componentDidMount() {
    const { getModuleX, referredContentList } = this.props;
    this.loadCurrentStoreInitialInfo();
    getModuleX(referredContentList);
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
      (prevStore.basicInfo !== undefined && prevStore.basicInfo.id) !==
        (newStore.basicInfo !== undefined && newStore.basicInfo.id) ||
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

  openStoreDetails = (event, store) => {
    event.preventDefault();
    const { routerHandler } = routeToStoreDetails(store);
    routerHandler();
  };

  openStoreDirections(store) {
    const {
      basicInfo: { address },
    } = store;
    const { addressLine1, city, state, zipCode } = address;
    if (isMobileApp()) {
      this.mapHandler(store);
    } else {
      window.open(
        `${
          googleMapConstants.OPEN_STORE_DIR_WEB
        }${addressLine1},%20${city},%20${state},%20${zipCode}`
      );
    }
  }

  loadCurrentStoreInitialInfo() {
    const {
      loadNearByStoreInfo,
      currentStoreInfo,
      formatStore,
      getFavStore,
      calcDistanceByLatLng,
    } = this.props;
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
      const distanceArgs = {
        destination: [{ lat: coordinates.lat, long: coordinates.long }],
      };
      calcDistanceByLatLng(distanceArgs);
      getFavStore({ geoLatLang: { lat: coordinates.lat, long: coordinates.long } });
      loadNearByStoreInfo(payloadArgs);
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
      getRichContent,
      distanceFromUser,
    } = this.props;
    const store = formatStore(currentStoreInfo, distanceFromUser);
    const otherStores =
      nearByStores && nearByStores.length > 0
        ? nearByStores.filter(nStore => nStore.basicInfo.id !== store.basicInfo.id)
        : [];

    return store && store !== undefined && Object.keys(store).length > 0 ? (
      <StoreDetail
        className="storedetailinfo"
        store={store}
        labels={labels}
        otherStores={otherStores}
        openStoreDetails={this.openStoreDetails}
        openStoreDirections={() => this.openStoreDirections(store)}
        routesBack={this.constructor.routesBack}
        dialStoreNumber={this.dialStoreNumber}
        openMoreStores={this.openMoreStores}
        setFavoriteStore={setFavStore}
        isFavorite={isFavorite}
        fetchRichContent={getRichContent}
      />
    ) : null;
  }
}

StoreDetailContainer.getInitialProps = async ({ store, query }, pageProps) => {
  const storeId = fetchStoreIdFromUrlPath(query.storeStr);
  store.dispatch(getCurrentStoreInfo(storeId));
  return pageProps;
};

StoreDetailContainer.propTypes = {
  currentStoreInfo: PropTypes.instanceOf(Map),
  formatStore: PropTypes.func.isRequired,
  nearByStores: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({
    lbl_storelanding_openInterval: PropTypes.string,
    lbl_storelanding_milesAway: PropTypes.string,
    lbl_storelanding_getdirections_link: PropTypes.string,
    lbl_storelanding_favStore: PropTypes.string,
    lbl_storelanding_setfavStore: PropTypes.string,
    lbl_storelanding_atThisPlace: PropTypes.string,
    lbl_storelanding_storedetails_link: PropTypes.string,
    lbl_storedetails_getdirections_btn: PropTypes.string,
    lbl_storedetails_callstore_btn: PropTypes.string,
    lbl_storedetails_changestore_btn: PropTypes.string,
    lbl_storedetails_mallType: PropTypes.string,
    lbl_storedetails_entranceType: PropTypes.string,
    lbl_storedetails_locations_details_btn: PropTypes.string,
    lbl_storedetails_locations_title: PropTypes.string,
  }).isRequired,
  loadNearByStoreInfo: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  getFavStore: PropTypes.func.isRequired,
  setFavStore: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  isUserLoggedIn: PropTypes.bool.isRequired,
  getModuleX: PropTypes.func,
  referredContentList: PropTypes.shape([]),
  getRichContent: PropTypes.func,
  calcDistanceByLatLng: PropTypes.func,
  distanceFromUser: PropTypes.string,
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
    features: {
      mallType: '',
      entranceType: '',
    },
  }),
  navigation: {},
  getModuleX: () => null,
  referredContentList: [],
  getRichContent: () => null,
  calcDistanceByLatLng: () => null,
  distanceFromUser: null,
};

const mapStateToProps = state => {
  return {
    currentStoreInfo: getCurrentStore(state),
    formatStore: (store, distance) => formatCurrentStoreToObject(store, distance),
    nearByStores: getNearByStores(state),
    labels: getLabels(state),
    isFavorite: isFavoriteStore(state),
    isUserLoggedIn: getUserLoggedInState(state),
    referredContentList: getReferredContentList(state),
    getRichContent: key => getRichTextContent(state, key),
    distanceFromUser: getStoreDistance(state),
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
  getModuleX: payload => {
    dispatch(getModuleXContent(payload));
  },
  calcDistanceByLatLng: payload => dispatch(getDistance(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreDetailContainer);
