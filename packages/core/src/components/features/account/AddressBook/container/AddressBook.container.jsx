import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  getAddressList,
  deleteAddress,
  setDeleteModalMountedState,
  loadAddAddressComponent,
  loadAddressBookComponent,
  setEditAddress,
} from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import {
  getAddressListState,
  getAddressListFetchingState,
  showUpdatedNotificationState,
  deleteModalOpenState,
  showUpdatedNotificationOnModalState,
  showAddAddressComponent,
  getEditAddressItem,
  getEditAddressActive,
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
  editAddress: any,
  onEditAddressClick: () => void,
  isEditingAddress: boolean,
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
      onEditAddressClick,
      editAddress,
      isEditingAddress,
    } = this.props;
    let formInitialValue = {};
    if (isEditingAddress) {
      formInitialValue = {
        firstName: editAddress.firstName,
        lastName: editAddress.lastName,
        addressLine1: editAddress.addressLine.join(' '),
        addressLine2: '',
        city: editAddress.city,
        state: editAddress.state,
        zip: editAddress.zipCode,
        country: editAddress.country === 'US' ? 'United States' : 'Canada',
        phoneNumber: editAddress.phone1,
        defaultShip: editAddress.primary === 'true',
        nickName: editAddress.nickName,
        email: editAddress.email1,
      };
    }

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
          onEditAddressClick={onEditAddressClick}
        />
      );
    }

    if (addAddressLoaded || isEditingAddress) {
      return (
        <AddAddressContainer
          AddAddresslabels={AddAddresslabels}
          addAddressNotification={addAddressNotification}
          backToAddressBookClick={backToAddressBookClick}
          initialValues={formInitialValue}
          isEditingAddress={isEditingAddress}
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
    onEditAddressClick: payload => {
      dispatch(setEditAddress(payload));
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
    editAddress: getEditAddressItem(state),
    isEditingAddress: getEditAddressActive(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
