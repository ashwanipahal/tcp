import { createSelector } from 'reselect';
import {
  LOGINPAGE_REDUCER_KEY,
  ADDEDITADDRESS_REDUCER_KEY,
} from '../../../../../constants/reducer.constants';
import { getLabelValue, getErrorSelector } from '../../../../../utils/utils';
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
  (state, labels) => {
    return getErrorSelector(state, labels, 'lbl_addEditAddress_error');
  }
);
const globalAddressLabelsObj = state =>
  state.Labels && state.Labels.global && state.Labels.global.addEditAddress;
const getAddressBookLabels = state =>
  state.Labels && state.Labels.account && state.Labels.account.addressBook;

export const getAddEditAddressLabels = createSelector(
  [globalAddressLabelsObj, getAddressBookLabels],
  (addressLabels, addressBookLabels) => {
    const labels = {};
    const addressLabelsKeys = [
      'lbl_addEditAddress_fname',
      'lbl_addEditAddress_lname',
      'lbl_addEditAddress_addressLine1',
      'lbl_addEditAddress_addressLine2',
      'lbl_addEditAddress_city',
      'lbl_addEditAddress_state',
      'lbl_addEditAddress_province',
      'lbl_addEditAddress_zipCode',
      'lbl_addEditAddress_postalCode',
      'lbl_addEditAddress_country',
      'lbl_addEditAddress_phoneNumber',
      'lbl_addEditAddress_addNewAddress',
      'lbl_addEditAddress_selectFromAddress',
      'lbl_addEditAddress_update',
      'lbl_addEditAddress_cancel',
      'lbl_addEditAddress_setDefault',
      'lbl_addEditAddress_addressButton',
      'lbl_addEditAddress_select',
      'lbl_addEditAddress_internationalShipping',
    ];

    addressLabelsKeys.forEach(key => {
      labels[key] = getLabelValue(addressLabels, key);
    });
    const addrBookLbl = [
      'ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER',
      'ACC_LBL_EDIT_ADDRESS_FORM_HEADING',
      'ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER',
    ];
    addrBookLbl.forEach(key => {
      labels[key] = getLabelValue(addressBookLabels, key);
    });
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
      lbl_addEditAddress_addNewAddress: addNewAddressSign,
      lbl_addEditAddress_selectFromAddress: selectFromAddress,
      lbl_addEditAddress_select: select,
      ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER: editAddressLbl,
      ACC_LBL_EDIT_ADDRESS_FORM_HEADING: addNewAddress,
      ACC_LBL_VERIFY_YOUR_ADDRESS_HEADER: verifyAddress,
    } = labels;
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
        select,
        setDefaultMsg,
        addAddress,
        update,
        cancel,
        editAddress,
        addAddressHeading,
        shipInternationally,
        addNewAddressSign,
        selectFromAddress,
        editAddressLbl,
        addNewAddress,
        verifyAddress,
      },
    };
  }
);
