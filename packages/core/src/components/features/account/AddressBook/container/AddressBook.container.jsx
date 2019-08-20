import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import {
  getAddressList,
  deleteAddress,
  setDeleteModalMountedState,
  setAddressBookNotification,
} from './AddressBook.actions';
import { getUserInfo } from '../../User/container/User.actions';
import AddressView from '../views/AddressView';
import {
  getAddressListState,
  getAddressListFetchingState,
  showUpdatedNotificationState,
  deleteModalOpenState,
  showUpdatedNotificationOnModalState,
} from './AddressBook.selectors';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';

// @flow
type Props = {
  getAddressListAction: () => void,
  getUserInfoAction: () => void,
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
};
export class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddressListAction, getUserInfoAction } = this.props;
    getUserInfoAction();
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
    getUserInfoAction: () => {
      dispatch(getUserInfo());
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
