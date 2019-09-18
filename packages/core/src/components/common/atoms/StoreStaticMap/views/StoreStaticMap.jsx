import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from '@tcp/core/src/components/common/atoms/Image';
import constants from '../StoreStaticMap.constants';
import { isMobileApp } from '../../../../../utils';

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

const StoreStaticMap = props => {
  const { storesList, centeredStoreId, defaultZoom, isCanada, isMobile, config } = props;
  const mapSize = constants.MAP_DIMENSION_ON_LOAD[isMobile || isMobileApp() ? 'mobile' : 'desktop'];
  const [mapUpdatedSize, setMapUpdateSize] = useState(mapSize);
  const refMapContainer = React.createRef();
  useEffect(() => {
    let containerWidth = 0;
    if (refMapContainer && refMapContainer.current) {
      containerWidth = refMapContainer.current.clientWidth;
      setMapUpdateSize(`${containerWidth}x${mapSize.split('x')[1]}`);
    }
  });
  const centeredStore =
    storesList && storesList.find(store => store.basicInfo.id === centeredStoreId);
  let coordinates = isCanada ? constants.MAP_DEFAULT_LAT_LNG_CA : constants.MAP_DEFAULT_LAT_LNG_US;
  let zoomLevel = constants.MAP_MIN_ZOOM_LEVEL;
  const googleApiKey = config && config.googleApiKey;
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
    <Image url={staticmapUrl} height="400px" width="100%" />
  ) : (
    <div ref={refMapContainer} className="google-map">
      <Image url={staticmapUrl} alt="Google Map" title="Stores" />
    </div>
  );
};

StoreStaticMap.propTypes = {
  storesList: PropTypes.shape([]),
  centeredStoreId: PropTypes.string,
  defaultZoom: PropTypes.string,
  isCanada: PropTypes.bool,
  isMobile: PropTypes.bool,
  config: PropTypes.shape({
    googleApiKey: PropTypes.string.isRequired,
  }),
};

StoreStaticMap.defaultProps = {
  storesList: [],
  centeredStoreId: '',
  defaultZoom: '',
  isMobile: false,
  isCanada: false,
  config: {},
};

export default StoreStaticMap;
