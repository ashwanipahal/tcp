const userAddressData = addressTemp => {
  return {
    addressLine1: addressTemp.get('addressLine1') || '',
    addressLine2: addressTemp.get('addressLine2') || '',
    city: addressTemp.get('city') || '',
    state: addressTemp.get('state') || '',
    zipCode: addressTemp.get('zipCode'),
  };
};

const fetchBillingOrShippingAddress = address => {
  let plccAddress = {};
  address.map(item => {
    if (item.xcont_isBillingAddress === 'true' && item.xcont_isDefaultBilling === 'true') {
      plccAddress = item;
    }
    return true;
  });

  if (!Object.keys(plccAddress).length) {
    const primaryShippingAddress = address.filter(item => item.primary === 'true');
    primaryShippingAddress.map(item => {
      if (item.xcont_isShippingAddress === 'true') {
        plccAddress = item;
      }
      return true;
    });
  }
  return plccAddress;
};

export { userAddressData, fetchBillingOrShippingAddress };
