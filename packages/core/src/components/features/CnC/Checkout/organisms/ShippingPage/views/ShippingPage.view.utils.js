import { getSiteId } from '../../../../../../../utils';

const setPickupInitialValues = pickUpContactPerson => {
  return {
    firstName: pickUpContactPerson.firstName,
    lastName: pickUpContactPerson.lastName,
    phoneNumber: pickUpContactPerson.phoneNumber,
    emailAddress: pickUpContactPerson.emailAddress,
    country: getSiteId() && getSiteId().toUpperCase(),
  };
};

export const setShippingAddress = (shippingAddress, shippingPhoneAndEmail) => {
  return {
    addressLine1: shippingAddress.addressLine1,
    addressLine2: shippingAddress.addressLine2,
    firstName: shippingAddress.firstName,
    lastName: shippingAddress.lastName,
    city: shippingAddress.city,
    state: shippingAddress.state,
    zipCode: shippingAddress.zipCode,
    phoneNumber: shippingPhoneAndEmail.phoneNumber,
    country: getSiteId() && getSiteId().toUpperCase(),
    emailAddress: shippingPhoneAndEmail.emailAddress,
  };
};

export const getAddressInitialValues = scope => {
  const {
    shippingAddress,
    shippingPhoneAndEmail,
    userAddresses,
    isGuest,
    pickUpContactPerson,
    orderHasPickUp,
  } = scope.props;
  const shippingAddressLine1 = shippingAddress && shippingAddress.addressLine1;
  if (!!shippingAddressLine1 && (isGuest || !userAddresses || userAddresses.size === 0)) {
    return setShippingAddress(shippingAddress, shippingPhoneAndEmail);
  }
  if (!shippingAddressLine1 && isGuest && orderHasPickUp) {
    return setPickupInitialValues(pickUpContactPerson);
  }
  return {
    country: getSiteId() && getSiteId().toUpperCase(),
  };
};

export default setPickupInitialValues;
