const userAddressData = addressTemp => {
  return {
    addressLine1: addressTemp.get('addressLine1') || '',
    addressLine2: addressTemp.get('addressLine2') || '',
    city: addressTemp.get('city') || '',
    state: addressTemp.get('state') || '',
    zipCode: addressTemp.get('zipCode'),
  };
};

export default userAddressData;
