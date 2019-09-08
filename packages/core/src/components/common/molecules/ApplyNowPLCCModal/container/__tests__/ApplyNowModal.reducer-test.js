import { fromJS } from 'immutable';
import ApplyNowModalPLCCReducer from '../ApplyNowModal.reducer';
import constants from '../ApplyNowModal.constants';

const initialState = fromJS({
  isModalOpen: false,
});

describe('ApplyModalReducer', () => {
  it('should return default state', () => {
    expect(ApplyNowModalPLCCReducer(undefined, {})).toEqual(initialState);
  });

  it('should trigger APPLY_NOW_MODAL_TOGGLE action', () => {
    const action = {
      type: constants.APPLY_NOW_MODAL_TOGGLE,
      payload: { isPLCCModalOpen: true, isModalOpen: true },
    };

    const newState = ApplyNowModalPLCCReducer(fromJS({ isModalOpen: false }), action);
    expect(newState.get('isModalOpen')).toEqual(false);
  });
});
