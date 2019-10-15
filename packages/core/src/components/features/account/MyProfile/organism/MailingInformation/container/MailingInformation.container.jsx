import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AddEditCreditCardComponent from '../../../../AddEditCreditCard/views/AddEditCreditCard.view';
import { addMailingAddress } from './MailingAddress.actions';
import getAddressResponse from './MailingAddress.selectors';
import { verifyAddress } from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import {
  getAddressListState,
  showUpdatedNotificationState,
} from '../../../../AddressBook/container/AddressBook.selectors';
import { getProfileInfoTileData } from '../../../../User/container/User.selectors';
import { routerPush, isCanada, isMobileApp } from '../../../../../../../utils';
import { getAddEditAddressLabels } from '../../../../../../common/organisms/AddEditAddress/container/AddEditAddress.selectors';
import { getOnFileAddressKey } from '../../../../AddEditCreditCard/container/AddEditCreditCard.selectors';
import internalEndpoints from '../../../../common/internalEndpoints';
import { getAddressList } from '../../../../AddressBook/container/AddressBook.actions';

export class MailingInformationContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.initialValues = null;
  }

  componentDidMount() {
    const { getAddressListAction } = this.props;
    getAddressListAction({
      ignoreCache: true,
    });
  }

  componentDidUpdate() {
    const { addressResponse, onUpdateMailingAddress } = this.props;
    const isSuccess = addressResponse && addressResponse.get('addressId');
    if (isSuccess) {
      if (!isMobileApp()) {
        this.backToAddressBookClick();
      } else if (onUpdateMailingAddress) {
        onUpdateMailingAddress();
      }
    }
  }

  getInitialValues = (addressList, address) => {
    if (!address) {
      return {
        address: {
          firstName: '',
          lastName: '',
          country: isCanada() ? 'CA' : 'US',
          addressLine2: '',
        },
        onFileAddressKey: '',
        primary: addressList && addressList.size === 0,
      };
    }
    return {
      onFileAddressKey: '',
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
    const { submitNewAddressFormAction, address } = this.props;
    const payload = Object.assign(payloadParam, {
      email: address.emailAddress,
      phoneNumber: address.phoneNumber,
      nickName: address.emailAddress && address.emailAddress.toUpperCase(),
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

  backToAddressBookClick = () => {
    routerPush('/account?id=profile', '/account/profile');
  };

  render() {
    const {
      addressResponse,
      addressList,
      address,
      labels,
      addressLabels,
      addressKey,
      onClose,
    } = this.props;
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
        pageBackLink={internalEndpoints.profilePage.link}
        pageBackLinkPath={internalEndpoints.profilePage.path}
        errorMessage={errorMessage}
        addressList={addressList}
        pageheading={getLabelValue(labels, 'lbl_profile_heading', 'profile')}
        showCreditCardFields={false}
        showUserName={false}
        showEmailAddress={false}
        subHeading={getLabelValue(labels, 'lbl_profile_mailing_address', 'profile')}
        onClose={onClose}
      />
    );
  }
}

MailingInformationContainer.defaultProps = {
  addressLabels: {},
  address: null,
  addressKey: '',
  onClose: () => {},
};

export const mapDispatchToProps = dispatch => {
  return {
    submitNewAddressFormAction: payload => {
      dispatch(addMailingAddress(payload));
    },
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
    getAddressListAction: payload => {
      dispatch(getAddressList(payload));
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
  onUpdateMailingAddress: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  getAddressListAction: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailingInformationContainer);
