import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import StoreLocatorSearch from '../../organisms/StoreSearch';

export class StoreLanding extends PureComponent {
  render() {
    return (
      <View>
        <StoreLocatorSearch {...this.props} />
      </View>
    );
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
};

export default StoreLanding;

export { StoreLanding as StoreLandingVanilla };
