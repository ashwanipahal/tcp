import { createSelector } from 'reselect';
import {
  LOGINPAGE_REDUCER_KEY,
  ADDEDITADDRESS_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { getAddressListState } from '../../../../features/account/AddressBook/container/AddressBook.selectors';

export const getAddressResponse = state => {
  return state[ADDEDITADDRESS_REDUCER_KEY];
};

export const getUserEmail = state => {
  return state[LOGINPAGE_REDUCER_KEY] && state[LOGINPAGE_REDUCER_KEY].get('email1');
};

export const getAddressId = (state, props) => {
  return (props.router && props.router.query && props.router.query.addressId) || false;
};

export const getAddressById = createSelector(
  [getAddressListState, getAddressId],
  (addressList, addressId) => {
    return addressId ? addressList.find(address => address.addressId === addressId) : null;
  }
);

export const getLabels = state => state.Labels.global;

export const getAddEditErrorResponse = state => {
  return state[ADDEDITADDRESS_REDUCER_KEY].get('error');
};

export const getshowNotification = createSelector(
  getAddressResponse,
  resp => resp && resp.get('showNotification')
);

export const getAddEditLabels = createSelector(
  getLabels,
  labels => labels && labels.addEditAddress
);

export const getAddEditErrorMessage = createSelector(
  [getAddEditErrorResponse, getAddEditLabels],
  (loginState, labels) => {
    const errorParameters = loginState && loginState.getIn(['errorParameters', '0']);
    const errorCode = loginState && loginState.get('errorCode');
    if (
      (errorParameters && labels[`lbl_addEditAddress_error_${errorParameters}`]) ||
      (errorCode && labels[`lbl_addEditAddress_error_${errorCode}`])
    ) {
      if (errorParameters) {
        return labels[`lbl_addEditAddress_error_${errorParameters}`];
      }
      return labels[`lbl_addEditAddress_error_${errorCode}`];
    }
    return (
      (loginState && loginState.getIn(['errorMessage', '_error'])) ||
      labels.lbl_addEditAddress_error
    );
  }
);

export const getAddEditAddressLabels = state => {
  const {
    lbl_addEditAddress_editAddress: editAddress,
    lbl_addEditAddress_addAddress: addAddressHeading,
    lbl_addEditAddress_fname: firstName,
    lbl_addEditAddress_lname: lastName,
    lbl_addEditAddress_addressLine1: addressLine1,
    lbl_addEditAddress_addressLine2: addressLine2,
    lbl_addEditAddress_city: city,
    lbl_addEditAddress_state: stateLbl,
    lbl_addEditAddress_province: province,
    lbl_addEditAddress_zipCode: zipCode,
    lbl_addEditAddress_postalCode: postalCode,
    lbl_addEditAddress_country: country,
    lbl_addEditAddress_phoneNumber: phoneNumber,
    lbl_addEditAddress_setDefault: setDefaultMsg,
    lbl_addEditAddress_addressButton: addAddress,
    lbl_addEditAddress_update: update,
    lbl_addEditAddress_cancel: cancel,
    lbl_addEditAddress_internationalShipping: shipInternationally,
  } = state.Labels.global && state.Labels.global.addEditAddress;

  const {
    ACC_LBL_ADD_ADDRESS_FORM_HEADING: addNewAddress,
    ACC_LBL_EDIT_ADDRESS_FORM_HEADING: editAddressLbl,
    ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER: verifyAddress,
  } = state.Labels.account && state.Labels.account.addressBook;

  return {
    addressFormLabels: {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      stateLbl,
      province,
      zipCode,
      postalCode,
      country,
      phoneNumber,
      setDefaultMsg,
      addAddress,
      update,
      cancel,
      editAddress,
      addAddressHeading,
      shipInternationally,
      editAddressLbl,
      addNewAddress,
      verifyAddress,
    },
  };
};
