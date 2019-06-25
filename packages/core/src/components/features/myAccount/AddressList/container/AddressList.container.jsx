import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { List } from 'immutable';
import { getAddressList } from './AddressList.actions';
import AddressBookComponent from '../views/AddressBook.view';
import getAddressListState from './AddressList.selectors';
import labels from './AddressList.labels';

// @flow

type Props = {
  getAddressListAction: () => void,
  addressList: Object[],
};

export class AddressListContainer extends React.PureComponent<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  render() {
    const { addressList } = this.props;
    if (List.isList(addressList)) {
      return <AddressBookComponent addresses={addressList} labels={labels} />;
    }
    return null;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
  };
};

const mapStateToProps = createStructuredSelector({
  addressList: getAddressListState,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressListContainer);
