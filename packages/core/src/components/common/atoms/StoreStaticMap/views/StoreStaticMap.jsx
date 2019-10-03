import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from '@tcp/core/src/components/common/atoms/Image';
import constants from '../StoreStaticMap.constants';
import { isMobileApp } from '../../../../../utils';

/**
 *
 * @param {object} coordinates - coordinates object with latitude & longitude
 * @param {number} zoomLevel - zoom level for map
 * @param {string} mapUpdatedSize - map size
 * @param {string} markers - store markers to show on map
 * @param {string} googleApiKey - google api key
 */
const staticMapUrlGenerator = ({
  coordinates,
  zoomLevel,
  mapUpdatedSize,
  markers,
  googleApiKey,
}) => {
  const params = `center=${coordinates.lat},${
    coordinates.long
  }&zoom=${zoomLevel}&size=${mapUpdatedSize}${markers}&key=${googleApiKey}`;
  return `${constants.GOOGLE_STATIC_MAPS_URL}?${params}`;
};

/**
 *
 * @param {array} storesList - suggested store list stored in redux state.
 * @param {object} centeredStore - store detail to marked centered on the map
 * @param {number} defaultZoom - zoom parameter
 * @param {string} centeredStoreId - selected store id
 */
const mapConfig = ({ storesList, centeredStore, defaultZoom, centeredStoreId }) => {
  const config = {
    mapCoordinates: '',
    mapZoomLevel: '',
    mapMarkers: '',
  };
  if (storesList && storesList.length > 0) {
    let mapMarks = '';
    config.mapCoordinates = centeredStore
      ? centeredStore.basicInfo.coordinates
      : storesList[0].basicInfo.coordinates;
    config.mapZoomLevel =
      (centeredStoreId && centeredStore) || defaultZoom
        ? constants.MAP_DEFAULT_ZOOM_LEVEL
        : constants.MAP_NORMAL_STORE_LEVEL;
    storesList.forEach(store => {
      mapMarks += `&markers=${store.basicInfo.coordinates.lat},${store.basicInfo.coordinates.long}`;
    });
    config.mapMarkers = mapMarks;
  }

  return config;
};

const renderForMobileApp = mapImageUrl => <Image url={mapImageUrl} height="400px" width="100%" />;

/**
 *
 * @param {Object} props - Props passed to show to Google static maps
 * @param {string} props.storesList - suggested store list stored in redux state.
 * @param {string} props.centeredStoreId - selected store id
 * @param {number} props.defaultZoom - zoom parameter
 * @param {bool} props.isCanada - check for  canada geo
 * @param {bool} props.isMobile - check for mobile view
 * @param {string} props.apiKey - google api key
 */
const StoreStaticMap = props => {
  const { storesList, centeredStoreId, defaultZoom, isCanada, isMobile, apiKey } = props;
  const mapSize = constants.MAP_DIMENSION_ON_LOAD[isMobile || isMobileApp() ? 'mobile' : 'desktop'];
  const [mapUpdatedSize, setMapUpdateSize] = useState(mapSize);
  const [imageLoaded, setImageLoadingState] = useState(false);
  const refMapContainer = React.createRef();

  const resizeMapOnClientWidth = () => {
    let containerWidth = 0;
    if (refMapContainer && refMapContainer.current && !isMobileApp()) {
      containerWidth = refMapContainer.current.clientWidth || constants.DEFAULT_MAP_DIMENSION;
      setMapUpdateSize(`${containerWidth}x${mapSize.split('x')[1]}`);
      setImageLoadingState(true);
    }
  };

  // Added an resize event so that map image is generated correctly.
  const fireResizeEvent = () => {
    let resizeId = '';
    window.addEventListener('resize', () => {
      clearTimeout(resizeId);
      resizeId = setTimeout(resizeMapOnClientWidth, 500);
    });
  };

  useEffect(() => {
    fireResizeEvent();
    resizeMapOnClientWidth();
  });
  const centeredStore =
    storesList && storesList.find(store => store.basicInfo.id === centeredStoreId);
  let coordinates = isCanada ? constants.MAP_DEFAULT_LAT_LNG_CA : constants.MAP_DEFAULT_LAT_LNG_US;
  let zoomLevel = constants.MAP_MIN_ZOOM_LEVEL;
  const googleApiKey = apiKey;
  let markers = '';

  if (storesList && storesList.length > 0) {
    const { mapCoordinates, mapZoomLevel, mapMarkers } = mapConfig({
      storesList,
      centeredStore,
      defaultZoom,
      centeredStoreId,
    });
    coordinates = mapCoordinates;
    zoomLevel = mapZoomLevel;
    markers = mapMarkers;
  }

  const staticmapUrl = staticMapUrlGenerator({
    coordinates,
    zoomLevel,
    mapUpdatedSize,
    markers,
    googleApiKey,
  });

  return isMobileApp() ? (
    renderForMobileApp(staticmapUrl)
  ) : (
    <div ref={refMapContainer} className="google-map">
      {imageLoaded ? <Image url={staticmapUrl} alt="Google Map" title="Stores" /> : null}
    </div>
  );
};

StoreStaticMap.propTypes = {
  storesList: PropTypes.shape([]),
  centeredStoreId: PropTypes.string,
  defaultZoom: PropTypes.string,
  isCanada: PropTypes.bool,
  isMobile: PropTypes.bool,
  apiKey: PropTypes.string.isRequired,
};

StoreStaticMap.defaultProps = {
  storesList: [],
  centeredStoreId: '',
  defaultZoom: '',
  isMobile: false,
  isCanada: false,
};

export default StoreStaticMap;
