import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, Text, ScrollView } from 'react-native';
import {
  isCanada,
  getAPIConfig,
  navigateToNestedRoute,
  getLabelValue,
  isGymboree,
  mapHandler,
} from '@tcp/core/src/utils';
import StoreStaticMap from '@tcp/core/src/components/common/atoms/StoreStaticMap';
import StoreAddressTile from '@tcp/core/src/components/common/molecules/StoreAddressTile';
import { withTheme } from 'styled-components/native';
import StoreLocatorSearch from '../../organisms/StoreSearch';
import {
  StyleStoreLandingContainer,
  StyledFavStoreHeading,
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
    const { fetchCurrentStore, navigation, labels } = this.props;
    fetchCurrentStore(store);
    navigateToNestedRoute(navigation, 'HomeStack', 'StoreDetails', {
      title: getLabelValue(labels, 'lbl_storedetail_storedetailTxt'),
    });
  };

  renderList = modifiedStoreList => {
    const { labels, setFavoriteStore, favoriteStore, searchDone } = this.props;
    const { mapView } = this.state;
    return searchDone && !modifiedStoreList.length ? (
      <Text>{getLabelValue(labels, 'lbl_storelanding_noStoresFound')}</Text>
    ) : (
      modifiedStoreList.map((item, index) => (
        <StoreAddressTile
          {...this.props}
          store={item}
          variation="listing"
          storeIndex={mapView && `${index + 1}`}
          setFavoriteStore={setFavoriteStore}
          isFavorite={favoriteStore && favoriteStore.basicInfo.id === item.basicInfo.id}
          key={item.basicInfo.id}
          openStoreDetails={this.openStoreDetails}
          openStoreDirections={() => this.openStoreDirections(item)}
        />
      ))
    );
  };

  openStoreDirections = store => {
    mapHandler(store);
  };

  render() {
    const {
      suggestedStoreList,
      favoriteStore,
      theme,
      labels,
      loadStoresByCoordinates,
      getLocationStores,
      geoLocationEnabled,
    } = this.props;
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
              <View>
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
                    {getLabelValue(labels, 'lbl_storelanding_favStoreHeading')}
                  </Text>
                </StyledFavStoreHeading>
                <StoreAddressTile
                  {...this.props}
                  store={favoriteStore}
                  variation="listing-header"
                  isFavorite
                  geoLocationDisabled={!geoLocationEnabled}
                  openStoreDetails={this.openStoreDetails}
                  openStoreDirections={() => this.openStoreDirections(favoriteStore)}
                />
              </View>
            )}
            <StoreLocatorSearch
              labels={labels}
              loadStoresByCoordinates={loadStoresByCoordinates}
              toggleMap={this.toggleMap}
              mapView={mapView}
              selectStoreType={this.selectStoreType}
              getLocationStores={getLocationStores}
              selectedCountry={isCanada() ? 'CA' : 'USA'}
            />
            {mapView && !!modifiedStoreList.length && (
              <StoreStaticMap
                storesList={modifiedStoreList}
                isCanada={isCanada()}
                apiKey={getAPIConfig().googleApiKey}
                {...this.props}
              />
            )}
            {this.renderList(modifiedStoreList)}
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
  loadStoresByCoordinates: PropTypes.func.isRequired,
  getLocationStores: PropTypes.func.isRequired,
  geoLocationEnabled: PropTypes.bool,
  searchDone: PropTypes.bool,
};

StoreLanding.defaultProps = {
  suggestedStoreList: [],
  favoriteStore: null,
  geoLocationEnabled: false,
  searchDone: false,
};

export default withTheme(StoreLanding);

export { StoreLanding as StoreLandingVanilla };
