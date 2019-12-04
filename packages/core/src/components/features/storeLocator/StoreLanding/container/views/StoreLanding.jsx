import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
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
import { CALL_TO_ACTION_VISIBLE, FULLY_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import StoreLocatorSearch from '../../organisms/StoreSearch';
import StoreDetailContainerClass from '../../../StoreDetail/container/StoreDetail.container';

import styles from '../styles/StoreLanding.style';

export class StoreLanding extends PureComponent {
  googleApiKey = getAPIConfig().googleApiKey;

  state = {
    mapView: false,
    isOutlet: false,
    isGym: isGymboree(),
    centeredStoreId: '',
    showSubmitError: false,
    mapImageHasLoaded: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { favoriteStore } = this.props;
    const { mapView } = this.state;
    const currentFavStoreBasicInfo = favoriteStore && favoriteStore.basicInfo;
    const prevFavStoreBasicInfo = prevProps.favoriteStore && prevProps.favoriteStore.basicInfo;

    /**
     * USE CASE - When we select a store to be fav store, the fav store icon will replace the button.
     *  Then the selected flex item height is greater than one in the row, which make the user experience bad.
     * IMPLEMENTATION - Put a check whether prev prop fav store is not equal to new prop fav store, then
     *  retrieve all the tiles and calculate the height and apply the max height to all the tiles.
     */
    if (
      (currentFavStoreBasicInfo &&
        prevFavStoreBasicInfo &&
        prevFavStoreBasicInfo.id !== currentFavStoreBasicInfo.id) ||
      mapView !== prevState.mapView
    ) {
      const storeList = document.querySelectorAll(
        '.store__list.store_item_container .address-tile'
      );
      let storeMaxHeight = storeList && storeList.length > 0 ? storeList[0].offsetHeight : 0;
      storeList.forEach(list => {
        if (storeMaxHeight < list.offsetHeight) storeMaxHeight = list.offsetHeight;
      });
      storeList.forEach(list => {
        const element = list;
        element.style.height = `${storeMaxHeight}px`;
      });
    }
  }

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

  handleMapImageLoaded = () => {
    this.setState({
      mapImageHasLoaded: true,
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
          className="storeview__error"
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
              selectedStoreId={centeredStoreId === item.basicInfo.id}
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
          onImageLoad={this.handleMapImageLoaded}
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
    const { centeredStoreId, showSubmitError } = this.state;
    const {
      setFavoriteStore,
      favoriteStore,
      openStoreDirections,
      labels,
      searchDone,
      geoLocationEnabled,
    } = this.props;
    if (
      showSubmitError ||
      (searchDone &&
        !(suggestedStoreList && (suggestedStoreList.length || suggestedStoreList.size)))
    ) {
      return (
        <Notification
          status={showSubmitError ? 'error' : 'info'}
          message={getLabelValue(
            labels,
            showSubmitError ? 'lbl_storelanding_errorLabel' : 'lbl_storelanding_noStoresFound'
          )}
          className="storeview__error"
        />
      );
    }
    return suggestedStoreList.map((item, index) => (
      <Col
        colSize={{ large: 12, medium: 4, small: 6 }}
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
          selectedStoreId={centeredStoreId === item.basicInfo.id}
          geoLocationDisabled={!geoLocationEnabled}
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

  showSubmitError = value => {
    const { showSubmitError } = this.state;
    if (showSubmitError !== value) this.setState({ showSubmitError: value });
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
      setClickAnalyticsData,
      trackClick,
      ...others
    } = this.props;
    const { mapView, isGym, isOutlet, centeredStoreId, mapImageHasLoaded } = this.state;

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
      <>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          handleLinkClick={StoreDetailContainerClass.routesBack}
          noLink
          className={`${className}__backlink`}
          title={getLabelValue(labels, 'lbl_storedetails_backLink')}
        >
          <span className="left-arrow" />
          {getLabelValue(labels, 'lbl_storedetails_backLink')}
        </Anchor>
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
                    showSubmitError={this.showSubmitError}
                    setClickAnalyticsData={setClickAnalyticsData}
                    trackClick={trackClick}
                    selectedCountry={isCanada() ? 'CA' : 'USA'}
                  />
                  {/* UX Timer */}
                  <RenderPerf.Measure name={CALL_TO_ACTION_VISIBLE} />
                </Col>
              </Row>
              <Row
                className={`storeView__List${mapView ? ' storeView__ListAndMap' : ''}`}
                fullBleed
                aria-live="polite"
              >
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
                onImageLoad={this.handleMapImageLoaded}
                {...others}
              />
            </Col>
          </Row>
          {/* UX Timer */}
          {mapImageHasLoaded && <RenderPerf.Measure name={FULLY_VISIBLE} />}
        </Grid>
      </>
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
  setClickAnalyticsData: PropTypes.func.isRequired,
  trackClick: PropTypes.func.isRequired,
};

StoreLanding.defaultProps = {
  suggestedStoreList: [],
  favoriteStore: null,
  searchDone: false,
  geoLocationEnabled: false,
};

export default withStyles(StoreLanding, styles);

export { StoreLanding as StoreLandingVanilla };
