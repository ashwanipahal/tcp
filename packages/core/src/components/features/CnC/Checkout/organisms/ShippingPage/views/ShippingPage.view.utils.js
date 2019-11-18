import { getSiteId } from '../../../../../../../utils/utils.web';

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

export const shippingPageGetDerivedStateFromProps = (nextProps, prevState) => {
  const { defaultAddress: prevDefaultAddress } = prevState;
  const { userAddresses, addEditResponseAddressId } = nextProps;
  if (
    userAddresses &&
    (!addEditResponseAddressId || prevDefaultAddress === addEditResponseAddressId)
  ) {
    const defaultAddress = userAddresses.filter(item => item.primary === 'true');
    return {
      defaultAddressId:
        defaultAddress && defaultAddress.size > 0
          ? defaultAddress.get(0) && defaultAddress.get(0).addressId
          : userAddresses.get(0) && userAddresses.get(0).addressId,
    };
  }
  if (addEditResponseAddressId && prevDefaultAddress !== addEditResponseAddressId) {
    return { defaultAddressId: addEditResponseAddressId };
  }
  return null;
};

export default setPickupInitialValues;
