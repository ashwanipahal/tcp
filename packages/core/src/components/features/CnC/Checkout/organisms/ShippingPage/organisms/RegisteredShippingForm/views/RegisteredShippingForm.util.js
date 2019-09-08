import PropTypes from 'prop-types';

const getSelectedAddress = (addressList, onFileAddressKey) => {
  let selectedAddress = null;
  if (onFileAddressKey) {
    selectedAddress = addressList.find(add => add.addressId === onFileAddressKey);
  }
  return selectedAddress;
};

const getDefaultShippingDisabledState = ({
  isEditing,
  isSaveToAddressBookChecked,
  isAddNewAddress,
  modalState,
  modalType,
}) => {
  let defaultShippingDisabled = !isEditing && !(modalState && modalType === 'edit');
  if (isAddNewAddress) {
    if (!isSaveToAddressBookChecked) {
      defaultShippingDisabled = true;
    } else {
      defaultShippingDisabled = false;
    }
  } else if (modalState && modalType === 'add') {
    defaultShippingDisabled = false;
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

export {
  getSelectedAddress,
  getDefaultShippingDisabledState,
  onSaveBtnClick,
  getCancelAction,
  getShowAddressFields,
  propTypes,
  defaultProps,
};
