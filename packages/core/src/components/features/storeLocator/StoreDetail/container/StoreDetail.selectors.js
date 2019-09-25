import { STORE_DETAIL_REDUCER_KEY } from '@tcp/core/src/constants/reducer.constants';
import { createSelector } from 'reselect';

export const getCurrentStore = state => {
  return state[STORE_DETAIL_REDUCER_KEY].get('currentStore');
};

export const getCurrentStoreBasicInfo = createSelector(
  [getCurrentStore],
  currentStoreState =>
    currentStoreState && currentStoreState.size > 0 && currentStoreState.get('basicInfo')
);

export const formatHoursToObject = storeHours => {
  const formattedHrs = {};
  const formatHoursChild = hoursToFormat => {
    const returnedHours = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < hoursToFormat.size; i++) {
      const tempIntObj = {};
      hoursToFormat.getIn([i, 'openIntervals', 0]).forEach((value, key) => {
        tempIntObj[key] = value;
      });
      returnedHours.push({
        dayName: hoursToFormat.getIn([i, 'dayName']),
        isClosed: hoursToFormat.getIn([i, 'isClosed']),
        openIntervals: [tempIntObj],
      });
    }
    return returnedHours;
  };
  storeHours.forEach((value, key) => {
    formattedHrs[key] = formatHoursChild(storeHours.get(key));
  });
  return formattedHrs;
};

export const formatGenericMapObject = store => {
  const resultObject = {};
  // eslint-disable-next-line no-return-assign
  store.forEach((value, key) => (resultObject[key] = value));
  return resultObject;
};

export const formatCurrentStoreToObject = store => {
  const formattedStore = {};
  if (store && store.size > 0) {
    const basicInfoState = store.get('basicInfo');
    const addressState = basicInfoState.get('address');
    const coordinateState = basicInfoState.get('coordinates');
    const address = {};
    const coordinates = {};
    // eslint-disable-next-line no-return-assign
    addressState.forEach((value, key) => (address[key] = value));
    // eslint-disable-next-line no-return-assign
    coordinateState.forEach((value, key) => (coordinates[key] = value));
    formattedStore.basicInfo = {
      id: basicInfoState.get('id'),
      storeName: basicInfoState.get('storeName'),
      phone: basicInfoState.get('phone'),
      address,
      coordinates,
    };
    formattedStore.hours = formatHoursToObject(store.get('hours'));
    formattedStore.features = formatGenericMapObject(store.get('features'));
  }
  return formattedStore;
};

export const getNearByStores = state => state[STORE_DETAIL_REDUCER_KEY].get('suggestedStores');

export const getLabels = state => state.Labels.StoreLocator;
