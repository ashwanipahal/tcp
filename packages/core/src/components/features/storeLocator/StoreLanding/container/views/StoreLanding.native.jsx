import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import { isGymboree } from '@tcp/core/src/utils/index.native';
import { isCanada, getAPIConfig, navigateToNestedRoute } from '@tcp/core/src/utils';
import StoreStaticMap from '@tcp/core/src/components/common/atoms/StoreStaticMap';
import StoreAddressTile from '@tcp/core/src/components/common/molecules/StoreAddressTile';
import { withTheme } from 'styled-components/native';
import StoreLocatorSearch from '../../organisms/StoreSearch';
import {
  StyleStoreLandingContainer,
  StyledFavStoreHeading,
  StyledStoreListView,
} from '../styles/StoreLanding.style.native';

export class StoreLanding extends PureComponent {
  state = {
    mapView: false,
    isOutlet: false,
    isGym: isGymboree(),
  };

  toggleMap = event => {
    event.preventDefault();
    this.setState(prevState => ({
      mapView: !prevState.mapView,
    }));
  };

  selectStoreType = ({ gymSelected, outletSelected }) => {
    this.setState({
      isGym: gymSelected,
      isOutlet: outletSelected,
    });
  };

  openStoreDetails = store => {
    const { fetchCurrentStore, navigation } = this.props;
    fetchCurrentStore(store);
    navigateToNestedRoute(navigation, 'HomeStack', 'StoreDetails');
  };

  render() {
    const { suggestedStoreList, setFavoriteStore, favoriteStore, theme, labels } = this.props;
    const { mapView, isGym, isOutlet } = this.state;

    let modifiedStoreList = suggestedStoreList;

    if (isOutlet && isGym) {
      modifiedStoreList = suggestedStoreList.filter(
        item => item.isGym || item.features.storeType === 'Outlet'
      );
    } else if (isGym) {
      modifiedStoreList = suggestedStoreList.filter(item => item.isGym);
    } else if (isOutlet) {
      modifiedStoreList = suggestedStoreList.filter(
        item => !item.isGym && item.features.storeType === 'Outlet'
      );
    }

    return (
      <StyleStoreLandingContainer>
        <View>
          <ScrollView>
            {favoriteStore && (
              <StyledFavStoreHeading>
                <Text
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    textTransform: 'uppercase',
                    color: theme.colors.TEXT.DARK,
                    fontSize: 16,
                    margin: 0,
                    fontWeight: 'bold',
                  }}
                >
                  {labels.lbl_storelocators_detail_favStoreHeading}
                </Text>
                <StoreAddressTile
                  {...this.props}
                  store={favoriteStore}
                  variation="listing-header"
                  isFavorite
                />
              </StyledFavStoreHeading>
            )}
            <StoreLocatorSearch
              {...this.props}
              selectStoreType={this.selectStoreType}
              toggleMap={this.toggleMap}
              mapView={mapView}
            />
            {mapView && modifiedStoreList.length && (
              <StoreStaticMap
                storesList={modifiedStoreList}
                isCanada={isCanada}
                apiKey={getAPIConfig().googleApiKey}
                {...this.props}
              />
            )}
            <StyledStoreListView>
              {modifiedStoreList.map((item, index) => (
                <StoreAddressTile
                  {...this.props}
                  store={item}
                  variation="listing"
                  storeIndex={mapView && `${index + 1}`}
                  setFavoriteStore={setFavoriteStore}
                  isFavorite={favoriteStore && favoriteStore.basicInfo.id === item.basicInfo.id}
                  key={item.basicInfo.id}
                  openStoreDetails={this.openStoreDetails}
                />
              ))}
            </StyledStoreListView>
          </ScrollView>
        </View>
      </StyleStoreLandingContainer>
    );
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
  suggestedStoreList: PropTypes.arrayOf({}),
  setFavoriteStore: PropTypes.func.isRequired,
  favoriteStore: PropTypes.shape(PropTypes.string),
  theme: PropTypes.shape(PropTypes.string).isRequired,
  labels: PropTypes.shape(PropTypes.string).isRequired,
  fetchCurrentStore: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
};

StoreLanding.defaultProps = {
  suggestedStoreList: [],
  favoriteStore: null,
};

export default withTheme(StoreLanding);

export { StoreLanding as StoreLandingVanilla };
