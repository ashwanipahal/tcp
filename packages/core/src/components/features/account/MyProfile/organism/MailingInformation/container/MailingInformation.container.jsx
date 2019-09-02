import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddEditCreditCardComponent from '../../../../AddEditCreditCard/views/AddEditCreditCard.view';
import { addMailingAddress } from './MailingAddress.actions';
import { getAddressResponse } from './MailingAddress.selectors';
import { verifyAddress } from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import {
  getAddressListState,
  showUpdatedNotificationState,
} from '../../../../AddressBook/container/AddressBook.selectors';
import { getProfileInfoTileData } from '../../../../User/container/User.selectors';
import { routerPush, isCanada } from '../../../../../../../utils';
import { getAddEditAddressLabels } from '../../../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import { getOnFileAddressKey } from '../../../../AddEditCreditCard/container/AddEditCreditCard.selectors';

export class MailingInformationContainer extends React.PureComponent<Props> {
  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  componentDidUpdate() {
    const { addressResponse } = this.props;
    const isSuccess = addressResponse && addressResponse.get('addressId');
    if (isSuccess) {
      this.backToAddressBookClick();
    }
  }

  getInitialValues = (addressList, address) => {
    if (!address) {
      return {
        address: {
          firstName: '',
          lastName: '',
        },
        primary: addressList && addressList.size === 0,
        country: isCanada() ? 'CA' : 'US',
        addressLine2: '',
      };
    }
    return {
      address: {
        ...address.address,
        firstName: address.firstName,
        lastName: address.lastName,
      },
    };
  };

  verifyAddress = payload => {
    const { verifyAddressAction, addressList } = this.props;
    if (!payload.onFileAddressKey) {
      verifyAddressAction(this.formatPayload(payload.address));
    }
    if (payload.onFileAddressKey) {
      const selectedAddressPayload = addressList.find(
        add => add.addressId === payload.onFileAddressKey
      );
      verifyAddressAction(this.formatPayload(selectedAddressPayload));
    }
  };

  submitAddressForm = payloadParam => {
    const { submitNewAddressFormAction } = this.props;
    const { address } = this.props;
    const payload = Object.assign(payloadParam, {
      email: address.emailAddress,
      phoneNumber: address.phoneNumber,
      nickName: address.emailAddress.toUpperCase(),
      primary: address.primary ? 'true' : 'false',
    });
    submitNewAddressFormAction(payload);
  };

  formatPayload = payload => {
    const { addressLine, addressLine1, addressLine2, zipCode, primary, ...otherPayload } = payload;
    return {
      ...otherPayload,
      ...{
        address1: addressLine ? addressLine[0] : addressLine1,
        address2: addressLine ? addressLine[1] : addressLine2,
        zip: zipCode,
        primary: primary ? 'true' : 'false',
      },
    };
  };

  formatSelectedPayload = payload => {
    const { addressLine, zipCode, primary, ...otherPayload } = payload;
    return {
      ...otherPayload,
      ...{
        address1: addressLine[0],
        address2: addressLine[1],
        zip: zipCode,
        primary: primary ? 'true' : 'false',
      },
    };
  };

  backToAddressBookClick = () => {
    routerPush('/account?id=profile', '/account/profile');
  };

  render() {
    const { addressResponse, addressList, address, labels, addressLabels, addressKey } = this.props;
    this.initialValues = this.getInitialValues(addressList, address);
    const errorObject = addressResponse && addressResponse.get('errors');
    const errorMessage = errorObject && errorObject.getIn(['0', 'errorKey']);

    return (
      <AddEditCreditCardComponent
        addressResponse={addressResponse}
        submitAddressFormAction={this.submitAddressForm}
        verifyAddressAction={this.verifyAddress}
        initialValues={this.initialValues}
        backToAddressBookClick={this.backToAddressBookClick}
        isEdit={!!address}
        labels={labels}
        addressFormLabels={addressLabels.addressFormLabels}
        onFileAddressKey={addressKey}
        mailingAddress
        errorMessage={errorMessage}
        addressList={addressList}
      />
    );
  }
}

MailingInformationContainer.defaultProps = {
  addressLabels: {},
  address: null,
  addressKey: '',
};

export const mapDispatchToProps = dispatch => {
  return {
    submitNewAddressFormAction: payload => {
      dispatch(addMailingAddress(payload));
    },
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    addressResponse: getAddressResponse(state),
    addressList: getAddressListState(state),
    address: getProfileInfoTileData(state),
    addressLabels: getAddEditAddressLabels(state),
    addressKey: getOnFileAddressKey(state, ownProps),
    showUpdatedNotification: showUpdatedNotificationState(state),
  };
};

MailingInformationContainer.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  addressList: PropTypes.shape({}).isRequired,
  addressResponse: PropTypes.shape({}).isRequired,
  address: PropTypes.shape({}),
  addressLabels: PropTypes.shape({}),
  addressFormLabels: PropTypes.shape({}).isRequired,
  submitNewAddressFormAction: PropTypes.func.isRequired,
  verifyAddressAction: PropTypes.func.isRequired,
  addressKey: PropTypes.string,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailingInformationContainer);
