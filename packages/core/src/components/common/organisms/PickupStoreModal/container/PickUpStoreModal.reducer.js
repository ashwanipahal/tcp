import { fromJS } from 'immutable';
import { PICKUP_MODAL_ACTIONS_CONSTANTS } from '../PickUpStoreModal.constants';

const initialState = fromJS({
  isModalOpen: false, // TODO - Set ErrorBoundary in PICKUP Modal and .. Change it to default as false
  isBopisCtaEnabled: false,
  isBossCtaEnabled: false,
  isPickUpWarningModal: false,
  openSkuSelectionForm: false,
  generalProductId: null,
  colorProductId: null,
  requestorKey: null,
  initialValues: null,
});

const mergePickupModalState = (state, payload) => {
  const defaultPayload = {
    isModalOpen: true,
    isBopisCtaEnabled: false,
    isBossCtaEnabled: false,
    isPickUpWarningModal: false,
    openSkuSelectionForm: false,
    colorProductId: payload.generalProductId,
    requestorKey: payload.generalProductId,
  };
  // defaultPayload is used to make sure that default values of params are reset if not sent in payload
  const mergedPayload = {
    ...defaultPayload,
    ...payload,
  };
  return fromJS(mergedPayload);
};

const PickupModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_TOGGLE:
      return state.set('isModalOpen', action.payload.isModalOpen); // TODO - Make this one action - and use merge instead of set
    case PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_CLOSE:
      return state.set('isModalOpen', action.payload.isModalOpen);
    case PICKUP_MODAL_ACTIONS_CONSTANTS.PICKUP_MODAL_OPEN:
      return state.merge(mergePickupModalState(state, action.payload));
    default:
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default PickupModalReducer;
