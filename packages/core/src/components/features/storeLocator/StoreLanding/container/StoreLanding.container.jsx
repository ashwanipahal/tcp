import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getIconPath } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import {
  getStoresByCoordinates,
  setFavoriteStoreActn,
  getFavoriteStoreActn,
  initActions,
} from './StoreLanding.actions';
import { setClickAnalyticsData, trackClick } from '../../../../../analytics/actions';
import { getCurrentStoreInfo } from '../../StoreDetail/container/StoreDetail.actions';
import StoreLandingView from './views/StoreLanding';
import { getCurrentCountry, getPageLabels } from './StoreLanding.selectors';
import constants from './StoreLanding.constants';

const { INITIAL_STORE_LIMIT } = constants;

export class StoreLanding extends PureComponent {
  static openStoreDirections(store) {
    const {
      basicInfo: { address },
    } = store;
    const { addressLine1, city, state, zipCode } = address;
    return `https://maps.google.com/maps?daddr=${addressLine1},%20${city},%20${state},%20${zipCode}`;
  }

  state = {
    geoLocationEnabled: false,
  };

  componentDidMount() {
    this.getFavoriteStoreInititator();
  }

  /**
   * @function getLocationStores function to fetch the
   * stores list based on the user location coordinates
   */
  getLocationStores = () => {
    if (navigator.geolocation) {
      const { loadStoresByCoordinates } = this;
      navigator.geolocation.getCurrentPosition(pos => {
        loadStoresByCoordinates(
          Promise.resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          INITIAL_STORE_LIMIT
        );
      });
    }
  };

  getFavoriteStoreInititator = () => {
    if (navigator.geolocation) {
      const { loadStoresByCoordinates } = this;
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.initiateGetFavoriteStoreRequest(pos.coords.latitude, pos.coords.longitude);
          loadStoresByCoordinates(
            Promise.resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
            INITIAL_STORE_LIMIT
          );
          this.setState({
            geoLocationEnabled: true,
          });
        },
        () => {
          this.initiateGetFavoriteStoreRequest();
          this.setState({
            geoLocationEnabled: false,
          });
        }
      );
    } else {
      this.initiateGetFavoriteStoreRequest();
      this.setState({
        geoLocationEnabled: false,
      });
    }
  };

  initiateGetFavoriteStoreRequest = (lat, long) => {
    const { favoriteStore, getFavoriteStore } = this.props;
    if (!favoriteStore) {
      getFavoriteStore({ geoLatLang: { lat, long } });
    }
  };

  /**
   * @function loadStoresByCoordinates function to fetch the stores based on coordinates.
   * @param {Promise} coordinatesPromise - Promise that resolves with the coordinates
   * @param {Number} maxItems - The maximum number of items to be fetched
   * @param {Number} radius - The radius under which the stores needs to be fetched
   */
  loadStoresByCoordinates = (coordinatesPromise, maxItems, radius) => {
    const { fetchStoresByCoordinates } = this.props;
    coordinatesPromise.then(coordinates => {
      fetchStoresByCoordinates({ coordinates, maxItems, radius });
    });
    return false;
  };

  fetchCurrentStoreDetails = store => {
    const { fetchCurrentStore } = this.props;
    const {
      basicInfo: { id },
    } = store;
    if (id) fetchCurrentStore(id);
  };

  render() {
    const { navigation, searchDone } = this.props;
    const searchIcon = getIconPath('search-icon');
    const markerIcon = getIconPath('marker-icon');
    return (
      <StoreLandingView
        {...this.props}
        loadStoresByCoordinates={this.loadStoresByCoordinates}
        searchIcon={searchIcon}
        markerIcon={markerIcon}
        fetchCurrentStore={store => this.fetchCurrentStoreDetails(store)}
        openStoreDirections={store => this.constructor.openStoreDirections(store)}
        navigation={navigation}
        getLocationStores={this.getLocationStores}
        searchDone={searchDone}
        {...this.state}
      />
    );
  }
}

StoreLanding.getInitActions = () => initActions;

StoreLanding.getInitialProps = () => {
  return {
    pageData: {
      pageName: 'storelocator',
      pageType: 'companyinfo',
      pageSection: 'storelocator',
      pageSubSection: 'storelocator',
      pageNavigationText: 'header-find a store',
    },
  };
};

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
  getFavoriteStore: PropTypes.func.isRequired,
  favoriteStore: PropTypes.shape(PropTypes.string),
  fetchCurrentStore: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  searchDone: PropTypes.bool.isRequired,
  setClickAnalyticsData: PropTypes.func.isRequired,
  trackClick: PropTypes.func.isRequired,
};

StoreLanding.defaultProps = {
  favoriteStore: null,
  navigation: {},
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchStoresByCoordinates: storeConfig => dispatch(getStoresByCoordinates(storeConfig)),
  setFavoriteStore: payload => dispatch(setFavoriteStoreActn(payload)),
  getFavoriteStore: payload => dispatch(getFavoriteStoreActn(payload)),
  fetchCurrentStore: payload => dispatch(getCurrentStoreInfo(payload)),
  setClickAnalyticsData: payload => dispatch(setClickAnalyticsData(payload)),
  trackClick: payload => dispatch(trackClick(payload)),
});

/* istanbul ignore next  */
const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
  labels: getPageLabels(state),
  suggestedStoreList: state.StoreLocatorReducer && state.StoreLocatorReducer.get('suggestedStores'),
  isStoreSearched:
    state.StoreLocatorReducer && state.StoreLocatorReducer.get('storeSuggestionCompleted'),
  favoriteStore: state.User && state.User.get('defaultStore'),
  searchDone: state.StoreLocatorReducer && state.StoreLocatorReducer.get('searchDone'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreLanding);
