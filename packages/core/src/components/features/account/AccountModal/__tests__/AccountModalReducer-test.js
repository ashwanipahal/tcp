import { fromJS } from 'immutable';
import AccountModalReducer from '../container/AccountModal.reducer';
import ACCOUNT_MODAL_CONSTANTS from '../AccountModal.constants';

describe('AccountModalReducer', () => {
  const initialState = {
    modalType: null,
    openState: false,
    message: {},
  };
  it('should return initial state', () => {
    expect(AccountModalReducer(undefined, {})).toEqual(fromJS(initialState));
  });
  it('should set modaltype to true and set data in message initial state', () => {
    const payload = {
      modalType: 'delete',
      message: 'hi',
    };
    expect(
      AccountModalReducer(initialState, { type: ACCOUNT_MODAL_CONSTANTS.OPEN_MODAL, payload })
    ).toEqual({ modalType: 'delete', message: 'hi', openState: true });
  });
  it('should set openState to false', () => {
    const payload = {};
    expect(
      AccountModalReducer(initialState, { type: ACCOUNT_MODAL_CONSTANTS.CLOSE_MODAL, payload })
    ).toEqual({ openState: false, message: {}, modalType: null });
  });
});
