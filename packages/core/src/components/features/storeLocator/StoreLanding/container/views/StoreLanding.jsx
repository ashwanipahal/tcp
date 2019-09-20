import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import StoreLocatorSearch from '../../organisms/StoreSearch';

export class StoreLanding extends PureComponent {
  render() {
    return <StoreLocatorSearch {...this.props} />;
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
};

export default StoreLanding;

export { StoreLanding as StoreLandingVanilla };
