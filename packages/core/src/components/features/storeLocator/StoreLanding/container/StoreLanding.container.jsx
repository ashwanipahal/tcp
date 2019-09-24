import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getIconPath } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import { getPersonalDataState } from '@tcp/core/src/components/features/account/User/container/User.selectors';
import { getStoresByCoordinates, setFavoriteStoreActn, getFavoriteStoreActn } from './StoreLanding.actions';
import StoreLandingView from './views/StoreLanding';
import { getCurrentCountry, getPageLabels } from './StoreLanding.selectors';

export class StoreLanding extends PureComponent {

  componentDidMount() {
    this.getFavoriteStoreInititator();
  }

  componentDidUpdate() {
    this.getFavoriteStoreInititator();
  }

  getFavoriteStoreInititator = () => {
    const { favoriteStore, getFavoriteStore, personalDataState } = this.props;
    const isGuest = personalDataState && !personalDataState.get('isGuest');
    if (!favoriteStore && isGuest) {
      getFavoriteStore({ geoLatLang: { lat: 22, long: 77 }});
    }
  }

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
  favoriteStore: PropTypes.shape(PropTypes.string),
};

StoreLanding.defaultProps = {
  favoriteStore: null,
}

/* istanbul ignore next  */
const mapDispatchToProps = dispatch => {
  return {
    fetchStoresByCoordinates: storeConfig => dispatch(getStoresByCoordinates(storeConfig)),
    setFavoriteStore: payload => dispatch(setFavoriteStoreActn(payload)),
    getFavoriteStore: payload => dispatch(getFavoriteStoreActn(payload)),
  };
};

/* istanbul ignore next  */
const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
  labels: getPageLabels(state),
  suggestedStoreList: state.StoreLocatorReducer && state.StoreLocatorReducer.get('suggestedStores'),
  favoriteStore: state.User && state.User.get('defaultStore'),
  personalDataState: state.User && state.User.get('personalData'),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StoreLanding);
