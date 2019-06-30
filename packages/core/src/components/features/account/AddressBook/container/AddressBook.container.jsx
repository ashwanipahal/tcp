import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getAddressList } from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import {
  getAddressListState,
  getAddressListFetchingState,
  showDefaultShippingUpdatedState,
} from './AddressBook.selectors';
import labels from './AddressBook.labels';
import { openAccountModal } from '../../AccountModal/container/AccountModal.actions';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';

// @flow
type Props = {
  getAddressListAction: () => void,
  addressList: List<any>,
  isFetching: boolean,
  onDefaultShippingAddressClick: () => void,
  showDefaultShippingUpdatedMsg: any,
  openAccountModalComponent: Function,
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
      openAccountModalComponent,
    } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (List.isList(addressList)) {
      return (
        <AddressBookComponent
          addresses={addressList}
          labels={labels}
          openAccountModalComponent={openAccountModalComponent}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          showDefaultShippingUpdatedMsg={showDefaultShippingUpdatedMsg}
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
    openAccountModalComponent: payload => {
      dispatch(openAccountModal(payload));
    },
    onDefaultShippingAddressClick: payload => {
      dispatch(setDefaultShippingAddressRequest(payload));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getAddressListFetchingState(state),
    showDefaultShippingUpdatedMsg: showDefaultShippingUpdatedState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
