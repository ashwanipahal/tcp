// @flow

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getAddressList } from './AddressList.actions';
import AddressBook from '../views/AddressBook.view';
import getAddressListState from './AddressList.selectors';
import labels from './AddressList.labels';

type Props = {
  getAddressListAction: () => void,
  addressList: Array,
};

class AddressListContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  render() {
    const { addressList } = this.props;
    if (addressList) {
      return <AddressBook addresses={addressList} labels={labels} />;
    }
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  addressList: getAddressListState,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressListContainer);
