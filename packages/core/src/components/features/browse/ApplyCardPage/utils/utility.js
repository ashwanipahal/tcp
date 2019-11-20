import { routerPush } from '../../../../../utils';

const refFields = [
  'preScreenCode',
  'firstName',
  'lastName',
  'addressLine1',
  'addressLine2',
  'city',
  'statewocountry',
  'noCountryZip',
  'phoneNumberWithAlt',
  'altPhoneNumber',
  'month',
  'date',
  'year',
  'ssNumber',
  'iAgree',
];

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

const fetchPLCCFormErrors = errors => {
  const plccFormFields = [];
  refFields.forEach(fieldName => {
    if (errors[fieldName]) {
      plccFormFields.push(fieldName);
    }
  });
  return plccFormFields;
};

/**
 * @const getModalSizeForApprovedPLCC - returning grid row size for approved plcc modal.
 *
 */
const getModalSizeForApprovedPLCC = isPLCCModalFlow => {
  return isPLCCModalFlow ? 12 : 8;
};

/**
 * @const redirectToBag - function to return to bag page.
 *
 */
const redirectToBag = resetPLCCResponse => {
  resetPLCCResponse({ status: null });
  routerPush(window.location.href, '/bag');
};

/**
 * @const redirectToHome - function to return home.
 *
 * @param - isModalFlow - Check whether working on a modal based plcc flow.
 * @param - closeModal - Function to trigger the closure of modal.
 * @param - resetResponse - Reset response of form submission.
 *
 */
const redirectToHome = (isModalFlow, closeModal, resetResponse) => {
  if (isModalFlow && closeModal) {
    closeModal();
  }
  // reseting the plcc form submission response.
  resetResponse({ status: null });
  routerPush(window.location.href, '/home');
};

/**
 * @const getPageViewGridColumnSize - returning grid columns for plcc forms
 *
 */
const getPageViewGridColumnSize = isPLCCModalFlow => {
  return isPLCCModalFlow ? 6 : 5;
};

/**
 * @const getPageViewGridRowSize - returning grid rows for plcc forms
 *
 */
const getPageViewGridRowSize = isPLCCModalFlow => {
  return isPLCCModalFlow ? 12 : 10;
};

/**
 * @const getFooterButtonSize - returning grid rows for plcc forms.
 * @param isPLCCModalFlow - flag to check for a modal flow.
 *
 */
const getFooterButtonSize = isPLCCModalFlow => {
  return isPLCCModalFlow ? 3 : 4;
};

export {
  refFields,
  userAddressData,
  fetchBillingOrShippingAddress,
  redirectToBag,
  redirectToHome,
  getPageViewGridColumnSize,
  getPageViewGridRowSize,
  getModalSizeForApprovedPLCC,
  fetchPLCCFormErrors,
  getFooterButtonSize,
};
