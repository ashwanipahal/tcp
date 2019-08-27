import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddAddressComponent from '../views/AddEditAddress.view';
import { getAddressList } from '../../AddressBook/container/AddressBook.actions';
import { getAddressResponse, getAddressById } from './AddEditAddress.selectors';
import { routerPush, isMobileApp } from '../../../../../utils';

export class AddEditAddressContainer extends React.PureComponent<Props> {
  static propTypes = {
    addressResponse: PropTypes.shape({}),
    address: PropTypes.shape({}),
  };

  componentDidUpdate() {
    const { addressResponse, getAddressListAction } = this.props;
    const isSuccess = addressResponse && addressResponse.get('addressId');
    if (isSuccess) {
      if (isMobileApp()) {
        getAddressListAction();
      } else this.backToAddressBookClick();
    }
  }

  backToAddressBookClick = () => {
    return routerPush('/account?id=address-book', '/account/address-book');
  };

  render() {
    const { addressResponse, address, labels, onCancel, showHeading } = this.props;
    return (
      <AddAddressComponent
        addressResponse={addressResponse}
        isEdit={!!address}
        backToAddressBookClick={this.backToAddressBookClick}
        labels={labels}
        onCancel={onCancel}
        showHeading={showHeading}
      />
    );
  }
}

AddEditAddressContainer.defaultProps = {
  addressResponse: {},
  address: null,
};

export const mapDispatchToProps = dispatch => {
  return {
    getAddressListAction: () => {
      dispatch(getAddressList());
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    addressResponse: getAddressResponse(state),
    address: getAddressById(state, ownProps),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditAddressContainer);
