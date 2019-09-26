import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getIconPath } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import {
  getStoresByCoordinates,
  setFavoriteStoreActn,
  getFavoriteStoreActn,
} from './StoreLanding.actions';
import { getCurrentStoreInfo } from '../../StoreDetail/container/StoreDetail.actions';
import StoreLandingView from './views/StoreLanding';
import { getCurrentCountry, getPageLabels } from './StoreLanding.selectors';

export class StoreLanding extends PureComponent {
  static openStoreDirections(store) {
    const {
      basicInfo: { address },
    } = store;
    const { addressLine1, city, state, zipCode } = address;
    window.open(
      `https://maps.google.com/maps?daddr=${addressLine1},%20${city},%20${state},%20${zipCode}`
    );
  }

  componentDidMount() {
    this.getFavoriteStoreInititator();
  }

  getFavoriteStoreInititator = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          this.initiateGetFavoriteStoreRequest(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          this.initiateGetFavoriteStoreRequest();
        }
      );
    } else {
      this.initiateGetFavoriteStoreRequest();
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
    coordinatesPromise.then(({ lat, lng }) =>
      fetchStoresByCoordinates({ coordinates: { lat, lng }, maxItems, radius })
    );
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
      />
    );
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
  getFavoriteStore: PropTypes.func.isRequired,
  favoriteStore: PropTypes.shape(PropTypes.string),
  fetchCurrentStore: PropTypes.func.isRequired,
};

StoreLanding.defaultProps = {
  favoriteStore: null,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchStoresByCoordinates: storeConfig => dispatch(getStoresByCoordinates(storeConfig)),
  setFavoriteStore: payload => dispatch(setFavoriteStoreActn(payload)),
  getFavoriteStore: payload => dispatch(getFavoriteStoreActn(payload)),
  fetchCurrentStore: payload => dispatch(getCurrentStoreInfo(payload)),
});

/* istanbul ignore next  */
const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
  labels: getPageLabels(state),
  suggestedStoreList: state.StoreLocatorReducer.get('suggestedStores'),
  favoriteStore: state.User.get('defaultStore'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreLanding);
