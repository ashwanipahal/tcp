import { fromJS } from 'immutable';
import { getModalComponent, getOpenState, getMessage } from '../container/AccountModal.selectors';

describe('#AccountModalselector', () => {
  it('#getModalComponent should return modalType state', () => {
    const AccountModalState = fromJS({
      modalType: null,
      openState: false,
      message: {},
    });
    const state = {
      AccountModalReducer: AccountModalState,
    };

    expect(getModalComponent(state)).toEqual(AccountModalState.get('modalType'));
  });

  it('#getOpenState should return open state', () => {
    const AccountModalState = fromJS({
      modalType: null,
      openState: false,
      message: {},
    });
    const state = {
      AccountModalReducer: AccountModalState,
    };

    expect(getOpenState(state)).toEqual(AccountModalState.get('openState'));
  });

  it('#getMessage should return message stored in reducer', () => {
    const AccountModalState = fromJS({
      modalType: null,
      openState: false,
      message: {},
    });
    const state = {
      AccountModalReducer: AccountModalState,
    };

    expect(getMessage(state)).toEqual(AccountModalState.get('message'));
  });
});
