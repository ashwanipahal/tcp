import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  USER_REDUCER_KEY,
  PRODUCT_PICKUP_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';

export const getBopisItemInventory = state => {
  return (
    (state[PRODUCT_PICKUP_REDUCER_KEY] &&
      state[PRODUCT_PICKUP_REDUCER_KEY].get('bopisInventoryDetails')) ||
    []
  );
};

export const getIsBossEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] && state[SESSIONCONFIG_REDUCER_KEY].siteDetails.IS_BOSS_ENABLED
  );
};

export const getIsBopisEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].siteDetails.IS_BOPIS_ENABLED
  );
};

export const getIsBopisClearanceProductEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].siteDetails.isBopisClearanceProductEnabled
  );
};

export const getIsBossClearanceProductEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].siteDetails.isBossClearanceProductEnabled
  );
};

export const getIsRadialInventoryEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].siteDetails.isRadialInventoryEnabled
  );
};

export const getLabels = state => {
  return state.Labels && state.Labels.Browse && state.Labels.Browse.ProductPickup;
};

export const getDefaultStore = state => {
  return (state[USER_REDUCER_KEY] && state[USER_REDUCER_KEY].get('defaultStore')) || null;
};

export const getGeoDefaultStore = state => {
  return (state[USER_REDUCER_KEY] && state[USER_REDUCER_KEY].get('geoDefaultStore')) || null;
};

export const getAccessibilityLabels = state => {
  return {
    lbl_shipping_icon: getLabelValue(state.Labels, 'lbl_shipping_icon', 'accessibility', 'global'),
    lbl_pickup_icon: getLabelValue(state.Labels, 'lbl_pickup_icon', 'accessibility', 'global'),
  };
};
