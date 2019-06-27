import React from 'react';
import { connect } from 'react-redux';
// import { List } from 'immutable';
import { getAddressList } from './AddressBook.actions';
import AddressBookComponent from '../views/AddressBook.view';
import { getAddressListState, getFetchingState } from './AddressBook.selectors';
import labels from './AddressBook.labels';
import { openAccountModal } from '../../AccountModal/container/AccountModal.actions';

// @flow
const addressList = [
  {
    addressId: '75200250',
    addressLine: ['568 Broadway', '', ''],
    addressType: 'ShippingAndBilling',
    attributes: [
      {
        key: 'addressField2',
        value: '2',
      },
      {
        key: 'addressField3',
        value: '10012',
      },
    ],
    city: 'New York',
    country: 'US',
    email1: 'TEST123@TEST.COM',
    firstName: 'third ',
    lastName: 'add',
    nickName: 'sb_2019-06-27 02:22:44.621',
    phone1: '2012234567',
    phone1Publish: 'false',
    primary: 'true',
    state: 'NY',
    xcont_isBillingAddress: 'false',
    xcont_isShippingAddress: 'true',
    zipCode: '10012',
  },
  {
    addressId: '75201738',
    addressLine: ['568 Broadway', '', ''],
    addressType: 'ShippingAndBilling',
    attributes: [
      {
        key: 'addressField2',
        value: '2',
      },
      {
        key: 'addressField3',
        value: '10012',
      },
    ],
    city: 'New York',
    country: 'US',
    email1: 'TEST123@TEST.COM',
    firstName: 'third',
    lastName: 'add',
    nickName: 'sb_2019-06-27 02:35:07.06',
    phone1: '2012234567',
    phone1Publish: 'false',
    primary: 'false',
    state: 'NY',
    xcont_isBillingAddress: 'false',
    xcont_isShippingAddress: 'true',
    zipCode: '10012',
  },
];
type Props = {
  getAddressListAction: () => void,
  // addressList: List<any>,
  // isFetching: boolean,
};

export class AddressBookContainer extends React.Component<Props> {
  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction();
  }

  render() {
    // const { addressList, isFetching } = this.props;
    // if (isFetching) {
    //   return <p>Loading...</p>;
    // }
    // if (List.isList(addressList)) {
    const { openAccountModalComponent } = this.props;
    return (
      <AddressBookComponent
        addresses={addressList}
        labels={labels}
        openAccountModalComponent={openAccountModalComponent}
      />
    );
    // }
    // return null;
  }
}

export const mapDispatchToProps = (dispatch: ({}) => void) => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
    openAccountModalComponent: (modalToOpen, message) => {
      dispatch(openAccountModal(modalToOpen, message));
    },
  };
};

const mapStateToProps = state => {
  return {
    addressList: getAddressListState(state),
    isFetching: getFetchingState(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainer);
