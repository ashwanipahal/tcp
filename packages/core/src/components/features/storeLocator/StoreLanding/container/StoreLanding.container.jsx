import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getIconPath } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import {
  getStoresByCoordinates,
  setFavoriteStoreActn,
  getFavoriteStoreActn,
} from './StoreLanding.actions';
import StoreLandingView from './views/StoreLanding';
import { getCurrentCountry, getPageLabels } from './StoreLanding.selectors';
import constants from './StoreLanding.constants';

const { INITIAL_STORE_LIMIT } = constants;

export class StoreLanding extends PureComponent {
  componentDidMount() {
    this.getFavoriteStoreInititator();
  }

  getFavoriteStoreInititator = () => {
    if (navigator.geolocation) {
      const { loadStoresByCoordinates } = this;
      navigator.geolocation.getCurrentPosition(pos => {
        loadStoresByCoordinates(
          Promise.resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
          INITIAL_STORE_LIMIT
        );
      });
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

  render() {
    const searchIcon = getIconPath('search-icon');
    const markerIcon = getIconPath('marker-icon');
    return (
      <StoreLandingView
        {...this.props}
        loadStoresByCoordinates={this.loadStoresByCoordinates}
        searchIcon={searchIcon}
        markerIcon={markerIcon}
      />
    );
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
  getFavoriteStore: PropTypes.func.isRequired,
  favoriteStore: PropTypes.shape(PropTypes.string),
};

StoreLanding.defaultProps = {
  favoriteStore: null,
};

/* istanbul ignore next */
const mapDispatchToProps = dispatch => ({
  fetchStoresByCoordinates: storeConfig => dispatch(getStoresByCoordinates(storeConfig)),
  setFavoriteStore: payload => dispatch(setFavoriteStoreActn(payload)),
  getFavoriteStore: payload => dispatch(getFavoriteStoreActn(payload)),
});

/* istanbul ignore next  */
const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
  labels: getPageLabels(state),
  suggestedStoreList: state.StoreLocatorReducer && state.StoreLocatorReducer.get('suggestedStores'),
  favoriteStore: state.User && state.User.get('defaultStore'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreLanding);
