import React from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';
import { getAddressList } from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import {
  getAddressListState,
  getFetchingState,
  showDefaultShippingSuccessMsg,
} from './AddressBook.selectors';
import labels from './AddressBook.labels';
import { setDefaultShippingAddressRequest } from './DefaultShippingAddress.actions';

// @flow

type Props = {
  getAddressListAction: () => void,
  addressList: List<any>,
  isFetching: boolean,
  onDefaultShippingAddressClick: () => void,
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
      showDefaultShippingSuccessMsg,
    } = this.props;
    if (isFetching) {
      return <p>Loading...</p>;
    }
    if (List.isList(addressList)) {
      return (
        <AddressBookComponent
          addresses={addressList}
          labels={labels}
          onDefaultShippingAddressClick={onDefaultShippingAddressClick}
          showDefaultShippingSuccessMsg={showDefaultShippingSuccessMsg}
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
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getFetchingState(state),
    showDefaultShippingSuccessMsg: showDefaultShippingSuccessMsg(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
