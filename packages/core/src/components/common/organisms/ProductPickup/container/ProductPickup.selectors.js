import {
  PRODUCT_PICKUP_REDUCER_KEY,
  SESSIONCONFIG_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';

export const getBopisItemInventory = state => {
  return (
    (state[PRODUCT_PICKUP_REDUCER_KEY] &&
      state[PRODUCT_PICKUP_REDUCER_KEY].bopisInventoryDetails) ||
    []
  );
};

export const getIsBossEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'IS_BOSS_ENABLED'])
  );
};

export const getIsBopisEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'IS_BOPIS_ENABLED'])
  );
};

export const getIsBopisClearanceProductEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'isBopisClearanceProductEnabled'])
  );
};

export const getIsBossClearanceProductEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'isBossClearanceProductEnabled'])
  );
};

export const getIsRadialInventoryEnabled = state => {
  return (
    state[SESSIONCONFIG_REDUCER_KEY] &&
    state[SESSIONCONFIG_REDUCER_KEY].getIn(['siteDetails', 'isRadialInventoryEnabled'])
  );
};

export const getLabels = state => {
  return state.Labels && state.Labels.Browse && state.Labels.Browse.ProductPickup;
};
