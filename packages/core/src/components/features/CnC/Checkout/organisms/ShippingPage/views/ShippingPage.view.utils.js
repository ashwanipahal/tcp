import PropTypes from 'prop-types';
import CONSTANTS from '../../../Checkout.constants';
import { getSiteId } from '../../../../../../../utils';

export const setPickupInitialValues = pickUpContactPerson => {
  return {
    firstName: pickUpContactPerson.firstName,
    lastName: pickUpContactPerson.lastName,
    phoneNumber: pickUpContactPerson.phoneNumber,
    emailAddress: pickUpContactPerson.emailAddress,
    country: getSiteId() && getSiteId().toUpperCase(),
  };
};

/**
 * This function is to validate if we need to show venmo banner or not.
 * Only if user comes on pickup or shipping page, but not on coming back from navigation
 * @params {string} currentSection - current checkout section name
 */
export const isShowVenmoBanner = (currentSection, props) => {
  const { isVenmoPaymentInProgress, isVenmoPickupDisplayed, isVenmoShippingDisplayed } = props;
  const { CHECKOUT_STAGES } = CONSTANTS;
  return (
    isVenmoPaymentInProgress &&
    ((currentSection.toLowerCase() === CHECKOUT_STAGES.PICKUP && !isVenmoPickupDisplayed) ||
      (currentSection.toLowerCase() === CHECKOUT_STAGES.SHIPPING && !isVenmoShippingDisplayed))
  );
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
  if (!shippingAddressLine1 && orderHasPickUp) {
    return setPickupInitialValues(pickUpContactPerson);
  }
  return {
    country: getSiteId() && getSiteId().toUpperCase(),
  };
};

export const shippingPropsTypes = {
  addressLabels: PropTypes.shape({}).isRequired,
  isOrderUpdateChecked: PropTypes.bool,
  isSubmitting: PropTypes.bool.isRequired,
  labels: PropTypes.shape({}).isRequired,
  smsSignUpLabels: PropTypes.shape({}).isRequired,
  address: PropTypes.shape({}),
  selectedShipmentId: PropTypes.string,
  addressPhoneNumber: PropTypes.number,
  emailSignUpLabels: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool,
  isUsSite: PropTypes.bool,
  orderHasPickUp: PropTypes.bool,
  shipmentMethods: PropTypes.shape([]),
  defaultShipmentId: PropTypes.number,
  cartOrderItemsCount: PropTypes.number.isRequired,
  loadShipmentMethods: PropTypes.func.isRequired,
  shippingDidMount: PropTypes.func.isRequired,
  formatPayload: PropTypes.func.isRequired,
  verifyAddressAction: PropTypes.func.isRequired,
  submitVerifiedShippingAddressData: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  checkoutPageEmptyBagLabels: PropTypes.shape({}).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  availableStages: PropTypes.shape([]).isRequired,
  isGiftServicesChecked: PropTypes.bool,
  userAddresses: PropTypes.shape([]),
  onFileAddressKey: PropTypes.string,
  isSaveToAddressBookChecked: PropTypes.bool,
  setAsDefaultShipping: PropTypes.bool,
  saveToAddressBook: PropTypes.bool,
  updateShippingAddressData: PropTypes.func,
  addNewShippingAddressData: PropTypes.func,
  updateShippingMethodSelection: PropTypes.func.isRequired,
  syncErrors: PropTypes.shape({}),
  newUserPhoneNo: PropTypes.string,
  hasSetGiftOptions: PropTypes.bool,
  setCheckoutStage: PropTypes.func.isRequired,
  isVenmoPaymentInProgress: PropTypes.bool,
  isVenmoShippingDisplayed: PropTypes.bool,
  setVenmoPickupState: PropTypes.func,
  venmoBannerLabel: PropTypes.shape({
    venmoBannerText: PropTypes.string,
  }),
  initShippingPage: PropTypes.shape({}),
};

export const shippingDefaultProps = {
  isOrderUpdateChecked: false,
  isGiftServicesChecked: false,
  addressPhoneNumber: null,
  address: null,
  selectedShipmentId: null,
  isGuest: true,
  isUsSite: true,
  orderHasPickUp: false,
  shipmentMethods: null,
  defaultShipmentId: null,
  isSaveToAddressBookChecked: false,
  onFileAddressKey: null,
  isMobile: false,
  newUserPhoneNo: null,
  shippingAddressId: null,
  setAsDefaultShipping: false,
  saveToAddressBook: false,
  syncErrors: {},
  shippingAddress: null,
  pageCategory: '',
  isVenmoPaymentInProgress: false,
  isVenmoShippingDisplayed: true,
  hasSetGiftOptions: false,
  setVenmoPickupState: () => {},
  shippingPhoneAndEmail: null,
  isLoadingShippingMethods: false,
  checkoutRoutingDone: false,
  bagLoading: false,

  userAddresses: null,
  updateShippingAddressData: () => {},
  addNewShippingAddressData: () => {},
  venmoBannerLabel: {
    venmoBannerText: '',
  },
  initShippingPage: null,
};
