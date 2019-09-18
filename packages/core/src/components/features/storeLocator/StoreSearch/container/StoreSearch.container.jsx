import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { getIconPath, isGymboree } from '@tcp/core/src/utils';
import { getStoresByCoordinates } from './StoreSearch.actions';
import StoreLocatorSearch from './views/StoreSearch';
import { getCurrentCountry, getPageLabels } from './StoreSearch.selectors';

export class StoreLocator extends PureComponent {
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
    const markerIcon = getIconPath(isGymboree() ? 'marker-icon-gym' : 'marker-icon');
    const backgroundColor = !isGymboree() ? '#edf5fb' : '#fef4e8';
    return (
      <StoreLocatorSearch
        {...this.props}
        markerIcon={markerIcon}
        searchIcon={searchIcon}
        loadStoresByCoordinates={this.loadStoresByCoordinates}
        backgroundColor={backgroundColor}
      />
    );
  }
}

StoreLocator.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
};

export const mapDispatchToProps = dispatch => {
  return {
    fetchStoresByCoordinates: storeConfig => dispatch(getStoresByCoordinates(storeConfig)),
  };
};

const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
  labels: getPageLabels(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoreLocator)
);
