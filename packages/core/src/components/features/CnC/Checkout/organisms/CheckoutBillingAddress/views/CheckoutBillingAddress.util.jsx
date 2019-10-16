import { change } from 'redux-form';

const updateFormField = (dispatch, formName, fieldName, value) => {
  dispatch(change(formName, fieldName, value));
};

const updateAddress = (shippingAddress, editMode, dispatch, formName, update) => {
  const {
    firstName,
    lastName,
    addressLine1,
    addressLine2,
    state,
    city,
    zipCode,
    country,
    addressId,
  } = shippingAddress;
  let fieldsToUpdate = [];
  if (editMode) {
    fieldsToUpdate.push({ fieldName: `address.addressId`, value: addressId });
  }
  if (update) {
    fieldsToUpdate.push({ fieldName: `onFileAddressId`, value: addressId });
  }

  const fields = [
    { fieldName: `address.firstName`, value: firstName },
    { fieldName: `address.lastName`, value: lastName },
    { fieldName: `address.addressLine1`, value: addressLine1 },
    { fieldName: `address.addressLine2`, value: addressLine2 },
    { fieldName: `address.state`, value: state },
    { fieldName: `address.city`, value: city },
    { fieldName: `address.zipCode`, value: zipCode },
    { fieldName: `address.country`, value: country },
  ];
  fieldsToUpdate = [...fieldsToUpdate, ...fields];
  fieldsToUpdate.forEach(({ fieldName, value: fieldValue }) => {
    updateFormField(dispatch, formName, fieldName, fieldValue);
  });
};

const getSelectedAddress = (addressList, onFileAddressId) => {
  let selectedAddress = null;
  if (onFileAddressId) {
    selectedAddress = addressList.find(add => add.addressId === onFileAddressId);
  }
  return selectedAddress;
};

export { updateFormField, updateAddress, getSelectedAddress };
