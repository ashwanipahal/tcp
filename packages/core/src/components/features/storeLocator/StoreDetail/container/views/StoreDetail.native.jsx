import React from 'react';
import PropTypes from 'prop-types';
import { StoreAddressTile, StoreHours, StoreLocations } from '../../../../../common/molecules';
import StoreDetailRoot from '../styles/StoreDetail.style.native';
import formatStoreTiming from '../../../../../../utils/formatStoreTiming';

const StoreDetail = ({
  labels,
  store,
  openStoreDirections,
  dialStoreNumber,
  openMoreStores,
  isFavorite,
  setFavoriteStore,
}) => {
  const { hours } = store;
  const storeTimings = [];
  if (hours !== undefined && Object.keys(hours).length > 0)
    Object.keys(hours).forEach(hour => storeTimings.push(...hours[hour]));
  return (
    <StoreDetailRoot>
      <StoreAddressTile
        store={store}
        labels={labels}
        openStoreDirections={openStoreDirections}
        openCallStore={dialStoreNumber}
        isFavorite={isFavorite}
        setFavoriteStore={setFavoriteStore}
      />
      {storeTimings.length > 0 ? (
        <StoreHours title="Store Hours" defaultOpen storeTiming={formatStoreTiming(storeTimings)} />
      ) : null}
      <StoreLocations labels={labels} openMoreStores={openMoreStores} />
    </StoreDetailRoot>
  );
};

StoreDetail.propTypes = {
  store: PropTypes.shape({
    basicInfo: PropTypes.shape({
      id: PropTypes.string,
      storeName: PropTypes.string,
      phone: PropTypes.string,
      address: PropTypes.shape({
        addressLine1: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        country: PropTypes.string,
        zipCode: PropTypes.string,
      }),
      coordinates: PropTypes.shape({
        lat: PropTypes.number,
        long: PropTypes.number,
      }),
    }),
    hours: PropTypes.shape({}),
    features: PropTypes.shape({}),
  }).isRequired,
  labels: PropTypes.shape({}).isRequired,
  openStoreDirections: PropTypes.func.isRequired,
  dialStoreNumber: PropTypes.func.isRequired,
  openMoreStores: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  setFavoriteStore: PropTypes.func.isRequired,
};

export default StoreDetail;
