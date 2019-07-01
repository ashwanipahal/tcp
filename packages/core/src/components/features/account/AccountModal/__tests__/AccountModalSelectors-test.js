import { getModalComponent, getOpenState, getMessage } from '../container/AccountModal.selectors';

describe('#AccountModalselector', () => {
  it('#getModalComponent should return modalType state', () => {
    const AccountModalState = {
      modalType: null,
      openState: false,
      message: {},
    };
    const state = {
      AccountModalReducer: AccountModalState,
    };

    expect(getModalComponent(state)).toEqual(AccountModalState.modalType);
  });

  it('#getOpenState should return open state', () => {
    const AccountModalState = {
      modalType: null,
      openState: false,
      message: {},
    };
    const state = {
      AccountModalReducer: AccountModalState,
    };

    expect(getOpenState(state)).toEqual(AccountModalState.openState);
  });

  it('#getMessage should return message stored in reducer', () => {
    const AccountModalState = {
      modalType: null,
      openState: false,
      message: {},
    };
    const state = {
      AccountModalReducer: AccountModalState,
    };

    expect(getMessage(state)).toEqual(AccountModalState.message);
  });
});
