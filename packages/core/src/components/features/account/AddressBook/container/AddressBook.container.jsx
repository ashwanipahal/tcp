import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  getAddressList,
  deleteAddress,
  setDeleteModalMountedState,
  loadAddAddressComponent,
  loadAddressBookComponent,
} from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import {
  getAddressListState,
  getAddressListFetchingState,
  showUpdatedNotificationState,
  deleteModalOpenState,
  showUpdatedNotificationOnModalState,
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
  showUpdatedNotification: any,
  onDeleteAddress: Function,
  deleteModalMountedState: boolean,
  setDeleteModalMountState: Function,
  showUpdatedNotificationOnModal: any,
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
      showUpdatedNotification,
      onDeleteAddress,
      deleteModalMountedState,
      setDeleteModalMountState,
      showUpdatedNotificationOnModal,
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
          showUpdatedNotification={showUpdatedNotification}
          onDeleteAddress={onDeleteAddress}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
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
    onAddNNewAddressClick: () => {
      dispatch(loadAddAddressComponent());
    },
    backToAddressBookClick: () => {
      dispatch(loadAddressBookComponent());
    },
    onDeleteAddress: payload => {
      dispatch(deleteAddress(payload));
    },
    setDeleteModalMountState: payload => {
      dispatch(setDeleteModalMountedState(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getAddressListFetchingState(state),
    showUpdatedNotification: showUpdatedNotificationState(state),
    showUpdatedNotificationOnModal: showUpdatedNotificationOnModalState(state),
    deleteModalMountedState: deleteModalOpenState(state),
    addAddressLoaded: showAddAddressComponent(state),
    backToAddressBookClick: showAddAddressComponent(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
