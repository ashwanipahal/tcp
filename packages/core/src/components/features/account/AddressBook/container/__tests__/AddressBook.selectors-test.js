import { fromJS } from 'immutable';
import { getAddressListState, showDefaultShippingUpdatedMsg } from '../AddressBook.selectors';

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

  it('#showDefaultShippingUpdatedMsg should return AddressListReduer state', () => {
    const AddressListState = fromJS({
      showDefaultShippingUpdatedMsg,
    });
    const state = {
      AddressBookReducer: AddressListState,
    };

    expect(showDefaultShippingUpdatedMsg(state)).toEqual(
      AddressListState.get('showDefaultShippingUpdatedMsg')
    );
  });
});
