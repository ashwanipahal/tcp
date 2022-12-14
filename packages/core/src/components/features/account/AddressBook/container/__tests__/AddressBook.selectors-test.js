import { fromJS } from 'immutable';
import {
  getAddressListState,
  showUpdatedNotificationState,
  showUpdatedNotificationOnModalState,
  deleteModalOpenState,
  getAddressListFetchingState,
} from '../AddressBook.selectors';

describe('#AddressBook selector', () => {
  it('#getAddressListState should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      list: [],
      isFetching: false,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(getAddressListState(state)).toEqual(AddressListState.get('list'));
  });

  it('#showUpdatedNotificationState should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      showUpdatedNotificationState,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(showUpdatedNotificationState(state)).toEqual(
      AddressListState.get('showUpdatedNotification')
    );
  });
  it('#getAddressListFetchingState should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      isFetching: true,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(getAddressListFetchingState(state)).toEqual(AddressListState.get('isFetching'));
  });

  it('#showUpdatedNotificationState should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      showUpdatedNotificationOnModalState,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(showUpdatedNotificationOnModalState(state)).toEqual(
      AddressListState.get('showUpdatedNotificationOnModal')
    );
  });
  it('#deleteModalMountedState should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      deleteModalMountedState: false,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(deleteModalOpenState(state)).toEqual(AddressListState.get('deleteModalMountedState'));
  });
});
