import { fromJS } from 'immutable';
import { getAddressListState, showDefaultShippingUpdatedState } from '../AddressBook.selectors';

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

  it('#showDefaultShippingUpdatedState should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      showDefaultShippingUpdatedState,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(showDefaultShippingUpdatedState(state)).toEqual(
      AddressListState.get('showDefaultShippingUpdatedMsg')
    );
  });
});
