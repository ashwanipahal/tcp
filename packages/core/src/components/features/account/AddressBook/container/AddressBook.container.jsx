import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  getAddressList,
  deleteAddress,
  setDeleteModalMountedState,
  setAddressBookNotification,
} from './AddressBook.actions';
import AddressView from '../views/AddressView';
import {
  getAddressListState,
  getAddressListFetchingState,
  showUpdatedNotificationState,
  deleteModalOpenState,
  showUpdatedNotificationOnModalState,
  getAddEditAddressLabels,
} from './AddressBook.selectors';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';

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
  clearAddressBookNotification: () => void,
  labels: object,
  addressLabels: object,
};
export class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  componentWillUnmount() {
    const { clearAddressBookNotification } = this.props;
    clearAddressBookNotification();
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
      labels,
      addressLabels,
    } = this.props;
    if (List.isList(addressList)) {
      return (
        <AddressView
          addresses={addressList}
          isFetching={isFetching}
          labels={labels}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          showUpdatedNotification={showUpdatedNotification}
          onDeleteAddress={onDeleteAddress}
          deleteModalMountedState={deleteModalMountedState}
          setDeleteModalMountState={setDeleteModalMountState}
          showUpdatedNotificationOnModal={showUpdatedNotificationOnModal}
          addressLabels={addressLabels}
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
    onDeleteAddress: payload => {
      dispatch(deleteAddress(payload));
    },
    setDeleteModalMountState: payload => {
      dispatch(setDeleteModalMountedState(payload));
    },
    clearAddressBookNotification: () => {
      dispatch(
        setAddressBookNotification({
          status: '',
        })
      );
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
    addressLabels: getAddEditAddressLabels(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
