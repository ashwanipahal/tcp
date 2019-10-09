import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import StoreStaticMap from '@tcp/core/src/components/common/atoms/StoreStaticMap';
import { Grid } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import StoreAddressTile from '@tcp/core/src/components/common/molecules/StoreAddressTile';
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
  };

  openStoreDetails = (event, store) => {
    const { fetchCurrentStore } = this.props;
    event.preventDefault();
    fetchCurrentStore(store);
    const { routerHandler } = routeToStoreDetails(store);
    routerHandler();
  };

  renderMapView = suggestedStoreList => {
    const { setFavoriteStore, favoriteStore, labels, searchDone, ...others } = this.props;
    const storeList =
      !suggestedStoreList.length && searchDone ? (
        <p>{getLabelValue(labels, 'lbl_storelanding_noStoresFound')}</p>
      ) : (
        suggestedStoreList.map((item, index) => (
          <Col colSize={{ large: 12, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
            <StoreAddressTile
              {...this.props}
              store={item}
              variation="listing"
              storeIndex={index + 1}
              setFavoriteStore={setFavoriteStore}
              isFavorite={favoriteStore && favoriteStore.basicInfo.id === item.basicInfo.id}
              key={item.basicInfo.id}
              openStoreDetails={this.openStoreDetails}
            />
          </Col>
        ))
      );
    const storeMap = (
      <Col colSize={{ large: 12, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
        <StoreStaticMap
          storesList={suggestedStoreList}
          isCanada={isCanada}
          isMobile={getViewportInfo().isMobile}
          apiKey={this.googleApiKey}
          labels={labels}
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
      return <p>{getLabelValue(labels, 'lbl_storelanding_noStoresFound')}</p>;
    }
    return suggestedStoreList.map((item, index) => (
      <Col
        colSize={{ large: 12, medium: 8, small: 6 }}
        ignoreGutter={{ small: true }}
        className="store__list"
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
            <Col colSize={{ large: 12, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
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
      <Grid className={className}>
        <Row>
          <Col colSize={{ large: 6, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
            {this.renderFavoriteStore()}
          </Col>
        </Row>
        <Row fullBleed>
          <Col colSize={{ large: 6, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
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
          </Col>
        </Row>
        <Row>
          <Col colSize={{ large: 6, medium: 8, small: 6 }} ignoreGutter={{ small: true }}>
            <Row className="storeView__List" fullBleed>
              {mapView
                ? this.renderMapView(modifiedStoreList)
                : this.renderStoreList(modifiedStoreList)}
            </Row>
          </Col>
          {!!modifiedStoreList.length && (
            <Col
              colSize={{ large: 6, medium: 8, small: 6 }}
              ignoreGutter={{ small: true }}
              className="mapView__desktop"
            >
              <StoreStaticMap
                storesList={modifiedStoreList}
                isCanada={isCanada()}
                apiKey={this.googleApiKey}
                {...others}
              />
            </Col>
          )}
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
  fetchCurrentStore: PropTypes.func.isRequired,
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
