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
    hoursToFormat.forEach((hr, i) => {
      const tempIntObj = {};
      hoursToFormat.getIn([i, 'openIntervals', 0]).forEach((value, key) => {
        tempIntObj[key] = value;
      });
      returnedHours.push({
        dayName: hoursToFormat.getIn([i, 'dayName']),
        isClosed: hoursToFormat.getIn([i, 'isClosed']),
        openIntervals: [tempIntObj],
      });
      return hr;
    });
    return returnedHours;
  };
  storeHours.forEach((value, key) => {
    formattedHrs[key] = formatHoursChild(storeHours.get(key));
    return value;
  });
  return formattedHrs;
};

export const formatGenericMapObject = store => {
  const resultObject = {};
  store.forEach((value, key) => {
    resultObject[key] = value;
    return value;
  });
  return resultObject;
};

export const formatCurrentStoreToObject = store => {
  if (store && store.size > 0) {
    const formattedStore = {};
    const basicInfoState = store.get('basicInfo');
    const addressState = basicInfoState.get('address');
    const coordinateState = basicInfoState.get('coordinates');
    const address = {};
    const coordinates = {};
    addressState.forEach((value, key) => {
      address[key] = value;
      return value;
    });
    coordinateState.forEach((value, key) => {
      coordinates[key] = value;
      return value;
    });
    formattedStore.basicInfo = {
      id: basicInfoState.get('id'),
      storeName: basicInfoState.get('storeName'),
      phone: basicInfoState.get('phone'),
      address,
      coordinates,
    };
    formattedStore.hours = formatHoursToObject(store.get('hours'));
    formattedStore.features = formatGenericMapObject(store.get('features'));
    return formattedStore;
  }
  return store;
};

export const getNearByStores = state => state[STORE_DETAIL_REDUCER_KEY].get('suggestedStores');

export const getLabels = ({ Labels }) => {
  const pageLabels = Labels.StoreLocator;
  let finalLabels = {};
  if (pageLabels !== undefined) {
    const { StoreLanding, StoreDetail, StoreList } = pageLabels;
    finalLabels = {
      ...StoreLanding,
      ...StoreDetail,
      ...StoreList,
    };
  }
  return finalLabels;
};

export const isFavoriteStore = state => {
  const defaultStore = state.User.get('defaultStore');
  const basicInfoDefaultStore = defaultStore && defaultStore.basicInfo;
  const currentStoreState = getCurrentStore(state);
  const basicInfoStore =
    currentStoreState && formatCurrentStoreToObject(currentStoreState).basicInfo;
  return (
    (basicInfoStore && basicInfoStore.id) === (basicInfoDefaultStore && basicInfoDefaultStore.id)
  );
};
