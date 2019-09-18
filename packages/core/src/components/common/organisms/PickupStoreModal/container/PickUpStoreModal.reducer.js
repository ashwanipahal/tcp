import { fromJS } from 'immutable';
import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';

const initialState = {
  isModalOpen: false, // TODO - Set ErrorBoundary in PICKUP Modal and .. Change it to default as false
  isBopisCtaEnabled: true,
  isBossCtaEnabled: true,
  isPickUpWarningModal: false,
  openSkuSelectionForm: false,
  generalProductId: null,
  colorProductId: null,
  requestorKey: null,
  initialValues: null,
  suggestedStores: null,
};

const mergePickupModalState = (state, payload) => {
  // mergedPayload is used to make sure that default values of params are reset if not sent in payload
  const mergedPayload = {
    ...initialState,
    isModalOpen: true,
    colorProductId: payload.generalProductId,
    requestorKey: payload.generalProductId,
    ...payload,
  };
  return fromJS(mergedPayload);
};

const PickupModalReducer = (state = fromJS(initialState), action) => {
  switch (action.type) {
    case PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_TOGGLE:
      return state.set('isModalOpen', action.payload.isModalOpen); // TODO - Make this one action - and use merge instead of set
    case PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_CLOSE:
      return state.set('isModalOpen', action.payload.isModalOpen);
    case PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_OPEN:
      return state.merge(mergePickupModalState(state, action.payload));
    case PICKUP_MODAL_ACTIONS_CONSTANTS.SET_BOPIS_STORES:
      return state.set('suggestedStores', action.payload.stores);
    case PICKUP_MODAL_ACTIONS_CONSTANTS.SET_LOCATION_SEARCH_ERROR:
      return state.set('locationError', action.payload);
    case PICKUP_MODAL_ACTIONS_CONSTANTS.SET_STORE_SEARCH_ERROR:
      console.log('action.payload.errorMessage', action.payload);
      return state.set('storeSearchError', action.payload);
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default PickupModalReducer;
