import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  getAddressList,
  loadAddAddressComponent,
  loadAddressBookComponent,
} from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import {
  getAddressListState,
  getAddressListFetchingState,
  showDefaultShippingUpdatedState,
  showAddAddressComponent,
} from './AddressBook.selectors';
import labels from './AddressBook.labels';
import AddAddresslabels from './AddAddress/AddAddress.labels';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';
import AddAddressContainer from './AddAddress/AddAddress.container';
// @flow

type Props = {
  getAddressListAction: () => void,
  addressList: List<any>,
  isFetching: boolean,
  onDefaultShippingAddressClick: () => void,
  showDefaultShippingUpdatedMsg: any,
  addAddressNotification: any,
  addAddressLoaded: any,
  onAddNNewAddressClick: any,
  backToAddressBookClick: any,
};

export class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  render() {
    const {
      addressList,
      isFetching,
      onDefaultShippingAddressClick,
      showDefaultShippingUpdatedMsg,
      addAddressNotification,
      onAddNNewAddressClick,
      addAddressLoaded,
      backToAddressBookClick,
    } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (List.isList(addressList) && !addAddressLoaded) {
      return (
        <AddressBookComponent
          addresses={addressList}
          labels={labels}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          showDefaultShippingUpdatedMsg={showDefaultShippingUpdatedMsg}
          onAddNNewAddressClick={onAddNNewAddressClick}
        />
      );
    }

    if (addAddressLoaded) {
      return (
        <AddAddressContainer
          AddAddresslabels={AddAddresslabels}
          addAddressNotification={addAddressNotification}
          backToAddressBookClick={backToAddressBookClick}
        />
      );
    }
    return null;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
    onDefaultShippingAddressClick: payload => {
      dispatch(setDefaultShippingAddressRequest(payload));
    },
    onAddNNewAddressClick: ({ state }) => {
      dispatch(loadAddAddressComponent({ state }));
    },
    backToAddressBookClick: ({ state }) => {
      dispatch(loadAddressBookComponent({ state }));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getAddressListFetchingState(state),
    showDefaultShippingUpdatedMsg: showDefaultShippingUpdatedState(state),
    addAddressLoaded: showAddAddressComponent(state),
    backToAddressBookClick: showAddAddressComponent(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
