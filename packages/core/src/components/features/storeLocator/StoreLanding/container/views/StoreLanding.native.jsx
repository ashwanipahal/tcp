import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import StoreAddressTile from '@tcp/core/src/components/common/molecules/StoreAddressTile';
import StoreLocatorSearch from '../../organisms/StoreSearch';

export class StoreLanding extends PureComponent {
  render() {
    const { suggestedStoreList } = this.props;

    console.log(',,,,', suggestedStoreList)
    return (
      <View>
        <StoreLocatorSearch {...this.props} />
        {
          suggestedStoreList.map(item => (
            <StoreAddressTile
              {...this.props}
              store={item}
              variation="listing"
              // setFavoriteStore={setFavoriteStore}
              // isFavorite={favoriteStore && favoriteStore.basicInfo.id === item.basicInfo.id}
              key={item.basicInfo.id}
            />
          ))
        }
      </View>
    );
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
  suggestedStoreList: PropTypes.arrayOf({}),
};

StoreLanding.defaultProps = {
  suggestedStoreList: [],
}

export default StoreLanding;

export { StoreLanding as StoreLandingVanilla };
