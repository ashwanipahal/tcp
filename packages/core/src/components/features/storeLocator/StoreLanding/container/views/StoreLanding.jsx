import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import StoreStaticMap from '@tcp/core/src/components/common/atoms/StoreStaticMap';
import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import StoreAddressTile from '@tcp/core/src/components/common/molecules/StoreAddressTile';
import Notification from '@tcp/core/src/components/common/molecules/Notification';
import {
  isCanada,
  getViewportInfo,
  getAPIConfig,
  routeToStoreDetails,
  isGymboree,
  getLabelValue,
} from '@tcp/core/src/utils';
import StoreLocatorSearch from '../../organisms/StoreSearch';

import styles from '../styles/StoreLanding.style';

export class StoreLanding extends PureComponent {
  googleApiKey = getAPIConfig().googleApiKey;

  state = {
    mapView: false,
    isOutlet: false,
    isGym: isGymboree(),
    centeredStoreId: '',
  };

  openStoreDetails = (event, store) => {
    event.preventDefault();
    const { routerHandler } = routeToStoreDetails(store);
    routerHandler();
  };

  focusOnMap = (event, id) => {
    event.preventDefault();
    this.setState({
      centeredStoreId: id,
    });
  };

  renderMapView = suggestedStoreList => {
    const { setFavoriteStore, favoriteStore, labels, searchDone, ...others } = this.props;
    const { centeredStoreId } = this.state;
    const storeList =
      !suggestedStoreList.length && searchDone ? (
        <Notification
          status="info"
          message={getLabelValue(labels, 'lbl_storelanding_noStoresFound')}
        />
      ) : (
        suggestedStoreList.map((item, index) => (
          <Col
            colSize={{ large: 12, medium: 8, small: 6 }}
            ignoreGutter={{ small: true }}
            className="store_item_container"
          >
            <StoreAddressTile
              {...this.props}
              store={item}
              variation="listing"
              storeIndex={index + 1}
              setFavoriteStore={setFavoriteStore}
              isFavorite={favoriteStore && favoriteStore.basicInfo.id === item.basicInfo.id}
              key={item.basicInfo.id}
              openStoreDetails={this.openStoreDetails}
              titleClickCb={this.focusOnMap}
            />
          </Col>
        ))
      );
    const storeMap = (
      <Col colSize={{ large: 12, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
        <StoreStaticMap
          storesList={suggestedStoreList}
          isCanada={isCanada()}
          isMobile={getViewportInfo().isMobile}
          apiKey={this.googleApiKey}
          labels={labels}
          centeredStoreId={centeredStoreId}
          {...others}
        />
      </Col>
    );

    return (
      <>
        <Col
          colSize={{ large: 6, medium: 4, small: 6 }}
          ignoreGutter={{ small: true }}
          className="store__map"
        >
          <Row fullBleed>{storeMap}</Row>
        </Col>
        <Col
          colSize={{ large: 12, medium: 4, small: 6 }}
          ignoreGutter={{ small: true }}
          className="storeList__map"
        >
          <Row fullBleed>{storeList}</Row>
        </Col>
      </>
    );
  };

  renderStoreList = suggestedStoreList => {
    const { setFavoriteStore, favoriteStore, openStoreDirections, labels, searchDone } = this.props;
    if (searchDone && !(suggestedStoreList && suggestedStoreList.length)) {
      return (
        <Notification
          status="info"
          message={getLabelValue(labels, 'lbl_storelanding_noStoresFound')}
        />
      );
    }
    return suggestedStoreList.map((item, index) => (
      <Col
        colSize={{ large: 12, medium: 8, small: 6 }}
        ignoreGutter={{ small: true }}
        className="store__list store_item_container"
        key={item.basicInfo.id}
      >
        <StoreAddressTile
          {...this.props}
          store={item}
          variation="listing"
          setFavoriteStore={setFavoriteStore}
          isFavorite={favoriteStore && favoriteStore.basicInfo.id === item.basicInfo.id}
          openStoreDirections={openStoreDirections}
          openStoreDetails={this.openStoreDetails}
          storeIndex={!!getViewportInfo().isDesktop && index + 1}
          titleClickCb={this.focusOnMap}
        />
      </Col>
    ));
  };

  renderFavoriteStore = () => {
    const { favoriteStore, labels, geoLocationEnabled } = this.props;
    return (
      <>
        {favoriteStore && (
          <Row className="favoriteStore__container">
            <Col
              colSize={{ large: 12, medium: 8, small: 6 }}
              ignoreGutter={{ small: true }}
              className="store_item_container"
            >
              <h3 className="favoriteStore__heading">
                {getLabelValue(labels, 'lbl_storelanding_favStoreHeading')}
              </h3>
              <StoreAddressTile
                {...this.props}
                store={favoriteStore}
                variation="listing-header"
                isFavorite
                openStoreDetails={this.openStoreDetails}
                geoLocationDisabled={!geoLocationEnabled}
              />
            </Col>
          </Row>
        )}
      </>
    );
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

  render() {
    const {
      className,
      suggestedStoreList,
      labels,
      loadStoresByCoordinates,
      searchIcon,
      markerIcon,
      getLocationStores,
      ...others
    } = this.props;
    const { mapView, isGym, isOutlet, centeredStoreId } = this.state;

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
      <Grid className={className}>
        <Row fullBleed>
          <Col colSize={{ large: 6, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
            {this.renderFavoriteStore()}
            <Row fullBleed>
              <Col colSize={{ large: 12, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
                <StoreLocatorSearch
                  labels={labels}
                  loadStoresByCoordinates={loadStoresByCoordinates}
                  toggleMap={this.toggleMap}
                  mapView={mapView}
                  selectStoreType={this.selectStoreType}
                  searchIcon={searchIcon}
                  markerIcon={markerIcon}
                  getLocationStores={getLocationStores}
                  selectedCountry={isCanada() ? 'CA' : 'USA'}
                />
              </Col>
            </Row>
            <Row className="storeView__List" fullBleed>
              {mapView
                ? this.renderMapView(modifiedStoreList)
                : this.renderStoreList(modifiedStoreList)}
            </Row>
          </Col>
          <Col
            colSize={{ large: 6, medium: 8, small: 6 }}
            ignoreGutter={{ small: true }}
            className="mapView__desktop"
          >
            <StoreStaticMap
              storesList={modifiedStoreList}
              isCanada={isCanada()}
              apiKey={this.googleApiKey}
              centeredStoreId={centeredStoreId}
              {...others}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

StoreLanding.propTypes = {
  fetchStoresByCoordinates: PropTypes.func.isRequired,
  suggestedStoreList: PropTypes.arrayOf({}),
  setFavoriteStore: PropTypes.func.isRequired,
  favoriteStore: PropTypes.shape(PropTypes.string),
  className: PropTypes.string.isRequired,
  labels: PropTypes.shape(PropTypes.string).isRequired,
  openStoreDirections: PropTypes.func.isRequired,
  loadStoresByCoordinates: PropTypes.func.isRequired,
  markerIcon: PropTypes.string.isRequired,
  searchIcon: PropTypes.string.isRequired,
  getLocationStores: PropTypes.func.isRequired,
  searchDone: PropTypes.bool,
  geoLocationEnabled: PropTypes.bool,
};

StoreLanding.defaultProps = {
  suggestedStoreList: [],
  favoriteStore: null,
  searchDone: false,
  geoLocationEnabled: false,
};

export default withStyles(StoreLanding, styles);

export { StoreLanding as StoreLandingVanilla };
