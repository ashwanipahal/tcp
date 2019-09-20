import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { getIconPath } from '@tcp/core/src/utils';
import { getStoresByCoordinates } from './StoreSearch.actions';
import StoreLocatorSearch from './views/StoreSearch';
import { getCurrentCountry, getPageLabels } from './StoreSearch.selectors';

export class StoreSearch extends PureComponent {
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
      <StoreLocatorSearch
        {...this.props}
        markerIcon={markerIcon}
        searchIcon={searchIcon}
        loadStoresByCoordinates={this.loadStoresByCoordinates}
      />
    );
  }
}

StoreSearch.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
};

/* istanbul ignore next  */
const mapDispatchToProps = dispatch => {
  return {
    fetchStoresByCoordinates: storeConfig => dispatch(getStoresByCoordinates(storeConfig)),
  };
};

/* istanbul ignore next  */
const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
  labels: getPageLabels(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoreSearch)
);
