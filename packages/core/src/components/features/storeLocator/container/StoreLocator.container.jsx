import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'; //eslint-disable-line
import PropTypes from 'prop-types';
import { getStoresByLatLng } from './StoreLocator.actions';
import StoreLocatorView from '../views/StoreLocator.view';
import { getCurrentCountry } from './StoreLocator.selectors';

export class StoreLocator extends PureComponent {
  loadStoresByLatLng = (latLngPromise, maxItems, radius) => {
    const { fetchStoresByLatLng } = this.props;
    latLngPromise.then(({ lat, lng }) =>
      fetchStoresByLatLng({ coordinates: { lat, lng }, maxItems, radius })
    );
  };

  render() {
    return <StoreLocatorView {...this.props} loadStoresByLatLng={this.loadStoresByLatLng} />;
  }
}

StoreLocator.propTypes = {
  fetchStoresByLatLng: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStoresByLatLng: storeConfig => dispatch(getStoresByLatLng(storeConfig)),
  };
};

const mapStateToProps = state => ({
  selectedCountry: getCurrentCountry(state),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StoreLocator)
);
