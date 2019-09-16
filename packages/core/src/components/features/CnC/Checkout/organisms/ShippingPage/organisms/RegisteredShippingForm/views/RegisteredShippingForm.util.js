import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

const getSelectedAddress = (addressList, onFileAddressKey, shippingAddressId) => {
  let selectedAddress = null;
  if (shippingAddressId) {
    selectedAddress = addressList.find(add => add.addressId === shippingAddressId);
  }
  if (onFileAddressKey) {
    selectedAddress = addressList.find(add => add.addressId === onFileAddressKey);
  }
  return selectedAddress;
};

const setDefaultShippingValue = ({ userAddresses, dispatch, change, formName }) => {
  if (userAddresses && userAddresses.size === 0) {
    dispatch(change(formName, 'defaultShipping', true));
  }
};

const getDefaultShippingDisabledState = ({
  isEditing,
  isSaveToAddressBookChecked,
  modalState,
  modalType,
  userAddresses,
}) => {
  let defaultShippingDisabled = false;
  if (
    (userAddresses &&
      userAddresses.size === 1 &&
      (isEditing || (modalState && modalType === 'edit'))) ||
    !isSaveToAddressBookChecked
  ) {
    defaultShippingDisabled = true;
  }
  if (isSaveToAddressBookChecked && (userAddresses && userAddresses.size === 0)) {
    defaultShippingDisabled = true;
  }
  return defaultShippingDisabled;
};

const onSaveBtnClick = ({
  updateShippingAddress,
  modalType,
  addNewShippingAddress,
  modalState,
  isEditing,
}) => {
  if (((modalState && modalType === 'edit') || isEditing) && updateShippingAddress) {
    updateShippingAddress();
  }
  if (modalState && modalType === 'add' && addNewShippingAddress) {
    addNewShippingAddress();
  }
};

const getCancelAction = ({ modalState, modalType, toggleAddEditModal, toggleEditingMode }) => {
  let cancelAction = () => toggleEditingMode();
  if (modalState) {
    cancelAction = () => toggleAddEditModal({ type: modalType });
  }
  return cancelAction;
};

const getShowAddressFields = ({ isEditing, isAddNewAddress, modalState, userAddresses }) => {
  return isEditing || isAddNewAddress || modalState || (userAddresses && userAddresses.size === 0);
};

const getFieldsValidation = ({ syncErrorsObject }) => {
  let disabledState = false;
  if (syncErrorsObject) {
    const {
      syncError: { address: addressErrors },
    } = syncErrorsObject;
    if (addressErrors && !isEmpty(addressErrors) && Object.keys(addressErrors).length !== 1) {
      disabledState = true;
    }
  }
  return disabledState;
};

const propTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  loadShipmentMethods: PropTypes.func.isRequired,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  isMobile: PropTypes.bool,
  newUserPhoneNo: PropTypes.number,
  shippingAddressId: PropTypes.string,
  isEditing: PropTypes.bool,
  className: PropTypes.string,
  modalState: PropTypes.bool,
  modalType: PropTypes.string,
  toggleAddEditModal: PropTypes.func.isRequired,
  isAddNewAddress: PropTypes.bool,
  toggleAddNewAddress: PropTypes.func.isRequired,
  toggleIsEditing: PropTypes.func.isRequired,
  labels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
};

const defaultProps = {
  addressPhoneNo: null,
  isGuest: true,
  userAddresses: [],
  onFileAddressKey: null,
  isMobile: false,
  newUserPhoneNo: null,
  shippingAddressId: null,
  isEditing: null,
  className: '',
  modalState: false,
  modalType: null,
  isAddNewAddress: false,
  shippingAddress: null,
};

const nativePropTypes = {
  addressFormLabels: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  addressPhoneNo: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  loadShipmentMethods: PropTypes.func.isRequired,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  newUserPhoneNo: PropTypes.number,
  labels: PropTypes.shape({}).isRequired,
  shippingAddress: PropTypes.shape({}),
  address: PropTypes.shape({}),
  formName: PropTypes.string,
  updateShippingAddress: PropTypes.func.isRequired,
  addNewShippingAddress: PropTypes.func.isRequired,
  syncErrorsObject: PropTypes.shape({}),
  isSaveToAddressBookChecked: PropTypes.bool,
  setAsDefaultShipping: PropTypes.bool,
  defaultAddressId: PropTypes.string,
};

const nativeDefaultPropTypes = {
  addressPhoneNo: null,
  isGuest: true,
  userAddresses: [],
  onFileAddressKey: null,
  newUserPhoneNo: null,
  shippingAddress: null,
  address: null,
  formName: 'checkoutShipping',
  syncErrorsObject: {},
  isSaveToAddressBookChecked: false,
  setAsDefaultShipping: false,
  defaultAddressId: null,
};

export {
  getSelectedAddress,
  getDefaultShippingDisabledState,
  onSaveBtnClick,
  getCancelAction,
  getShowAddressFields,
  propTypes,
  defaultProps,
  getFieldsValidation,
  nativePropTypes,
  nativeDefaultPropTypes,
  setDefaultShippingValue,
};
