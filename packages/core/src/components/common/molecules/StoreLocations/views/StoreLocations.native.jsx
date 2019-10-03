import React from 'react';
import PropTypes from 'prop-types';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { getLabelValue } from '@tcp/core/src/utils';
import StoreLocationsRoot from '../styles/StoreLocations.style.native';

const StoreLocations = ({ children, labels, openMoreStores }) => (
  <StoreLocationsRoot>
    <Button
      type="button"
      onPress={openMoreStores}
      buttonVariation="variable-width"
      text={getLabelValue(labels, 'lbl_storedetails_seemorestores_btn')}
    />
    {children}
  </StoreLocationsRoot>
);

StoreLocations.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node),
  labels: PropTypes.shape({
    lbl_storedetails_locations_more_store: PropTypes.string,
  }).isRequired,
  openMoreStores: PropTypes.func,
};

StoreLocations.defaultProps = {
  children: null,
  openMoreStores: null,
};

export default StoreLocations;
