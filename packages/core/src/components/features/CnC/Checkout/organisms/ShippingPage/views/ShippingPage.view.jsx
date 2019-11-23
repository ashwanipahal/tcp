/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import ShippingForm from '../organisms/ShippingForm';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import {
  shippingPageGetDerivedStateFromProps,
  getAddressInitialValues,
} from './ShippingPage.view.utils';

export default class ShippingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
    isGiftServicesChecked: PropTypes.bool,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    selectedShipmentId: PropTypes.string,
    addressPhoneNumber: PropTypes.number,
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    isUsSite: PropTypes.bool,
    isSubmitting: PropTypes.bool.isRequired,
    checkoutPageEmptyBagLabels: PropTypes.shape({}).isRequired,
    orderHasPickUp: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    emailSignUpFlags: PropTypes.shape({}).isRequired,
    shipmentMethods: PropTypes.shape([]),
    defaultShipmentId: PropTypes.number,
    loadShipmentMethods: PropTypes.func.isRequired,
    routeToPickupPage: PropTypes.func.isRequired,
    isSaveToAddressBookChecked: PropTypes.bool,
    userAddresses: PropTypes.shape([]),
    onFileAddressKey: PropTypes.string,
    isMobile: PropTypes.bool,
    newUserPhoneNo: PropTypes.number,
    shippingAddressId: PropTypes.string,
    setAsDefaultShipping: PropTypes.bool,
    addNewShippingAddressData: PropTypes.func.isRequired,
    checkoutRoutingDone: PropTypes.bool,
    formatPayload: PropTypes.func.isRequired,
    submitVerifiedShippingAddressData: PropTypes.func.isRequired,
    verifyAddressAction: PropTypes.func.isRequired,
    shippingDidUpdate: PropTypes.func.isRequired,
    saveToAddressBook: PropTypes.bool,
    toggleCountrySelector: PropTypes.func.isRequired,
    shippingDidMount: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    syncErrors: PropTypes.shape({}),
    shippingAddress: PropTypes.shape({}),
    isVenmoPaymentInProgress: PropTypes.bool,
    isVenmoShippingDisplayed: PropTypes.bool,
    setVenmoPickupState: PropTypes.func,
    shippingPhoneAndEmail: PropTypes.shape({}),
    ServerErrors: PropTypes.node.isRequired,
    isRegisteredUserCallDone: PropTypes.bool.isRequired,
    pageCategory: PropTypes.string,
    clearCheckoutServerError: PropTypes.func.isRequired,
    checkoutServerError: PropTypes.shape({}).isRequired,
    pickUpContactPerson: PropTypes.shape({}).isRequired,
    hasSetGiftOptions: PropTypes.bool,
    isLoadingShippingMethods: PropTypes.bool,
    bagLoading: PropTypes.bool,
  };

  static defaultProps = {
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
    userAddresses: [],
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
  };

  constructor(props) {
    super(props);
    this.state = {
      isAddNewAddress: false,
      defaultAddressId: null,
    };
  }

  componentDidUpdate(prevProps) {
    const {
      shippingDidMount,
      isRegisteredUserCallDone,
      onFileAddressKey,
      shippingDidUpdate,
    } = this.props;
    const {
      isRegisteredUserCallDone: prevIsRegisteredUserCallDone,
      onFileAddressKey: prevFileAddressKey,
    } = prevProps;

    if (prevIsRegisteredUserCallDone !== isRegisteredUserCallDone && isRegisteredUserCallDone) {
      shippingDidMount();
    }
    if (onFileAddressKey !== prevFileAddressKey) {
      this.getShipmentMethods(prevProps);
    }
    shippingDidUpdate(prevProps);
  }

  static getDerivedStateFromProps = shippingPageGetDerivedStateFromProps;

  componentWillUnmount() {
    const { clearCheckoutServerError, checkoutServerError } = this.props;
    if (checkoutServerError) {
      clearCheckoutServerError({});
    }
  }

  /**
   * @description - get shipment methods with the updated address state
   */
  getShipmentMethods = () => {
    const { loadShipmentMethods, onFileAddressKey, userAddresses } = this.props;
    if (userAddresses && userAddresses.size > 0) {
      const address = userAddresses.find(add => add.addressId === onFileAddressKey);
      if (address && address.state) {
        loadShipmentMethods({ state: address.state, formName: 'checkoutShipping' });
      }
    }
  };

  setDefaultAddressId = id => {
    this.setState({ defaultAddressId: id });
  };

  toggleAddNewAddress = () => {
    const { isAddNewAddress } = this.state;
    this.setState({ isAddNewAddress: !isAddNewAddress });
  };

  submitShippingData = data => {
    const {
      address,
      shipmentMethods,
      onFileAddressKey,
      defaultShipping,
      saveToAddressBook,
      smsSignUp = {},
      emailSignUp,
    } = data;
    const { isGuest, userAddresses, verifyAddressAction } = this.props;
    const { isAddNewAddress } = this.state;
    let shipAddress = address;
    if (!isGuest && userAddresses && userAddresses.size > 0 && !isAddNewAddress) {
      shipAddress = userAddresses.find(item => item.addressId === onFileAddressKey);
      if (shipAddress) {
        const { addressLine } = shipAddress;
        const [addressLine1, addressLine2] = addressLine;
        shipAddress.addressLine1 = addressLine1;
        shipAddress.addressLine2 = addressLine2;
      }
    }

    const { handleSubmit, setVenmoPickupState, formatPayload, hasSetGiftOptions } = this.props;
    const submitData = {
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: shipAddress,
        addressId: shipAddress.addressId,
        emailAddress: shipAddress.emailAddress,
        onFileAddressKey,
        phoneNumber: shipAddress.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: defaultShipping || shipAddress.primary === 'true',
      },
      smsInfo: {
        smsUpdateNumber: smsSignUp.phoneNumber,
        wantsSmsOrderUpdates: smsSignUp.sendOrderUpdate,
      },
      emailSignUp,
      hasSetGiftOptions,
    };

    if (!onFileAddressKey) {
      const formattedPayload = formatPayload(shipAddress);
      this.submitData = submitData;
      return verifyAddressAction(formattedPayload);
    }

    handleSubmit(submitData);
    return setVenmoPickupState(true);
  };

  updateShippingAddress = afterUpdate => {
    this.afterAddressUpdate = afterUpdate;
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      formatPayload,
      verifyAddressAction,
    } = this.props;
    this.isAddressUpdating = true;
    this.submitShippingAddressData = {
      shipTo: {
        address,
        addressId: address.addressId,
        emailAddress: address.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: setAsDefaultShipping,
      },
    };
    const formattedPayload = formatPayload(address);
    return verifyAddressAction(formattedPayload);
  };

  addNewShippingAddress = () => {
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      addNewShippingAddressData,
    } = this.props;
    addNewShippingAddressData({
      shipTo: {
        address,
        addressId: address.addressId,
        emailAddress: address.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: address.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: setAsDefaultShipping,
      },
    });
  };

  getPrimaryAddress = () => {
    const { userAddresses } = this.props;
    if (userAddresses && userAddresses.size > 0) {
      const selectedAddress = userAddresses.find(address => address.primary === 'true');
      return (selectedAddress && selectedAddress.addressId) || userAddresses.get(0).addressId;
    }
    return null;
  };

  render() {
    const {
      smsSignUpLabels,
      addressPhoneNumber,
      selectedShipmentId,
      emailSignUpLabels,
      isGuest,
      isUsSite,
      orderHasPickUp,
      shipmentMethods,
      defaultShipmentId,
      loadShipmentMethods,
      routeToPickupPage,
      isSaveToAddressBookChecked,
      userAddresses,
      onFileAddressKey,
      isLoadingShippingMethods,
      emailSignUpFlags,
    } = this.props;
    const { isMobile, newUserPhoneNo, shippingAddressId } = this.props;
    const { setAsDefaultShipping, labels, address, syncErrors } = this.props;
    const { isSubmitting, formatPayload, ServerErrors, checkoutServerError } = this.props;
    const { shippingAddress, isVenmoPaymentInProgress, isVenmoShippingDisplayed } = this.props;
    const { addressLabels, isOrderUpdateChecked, isGiftServicesChecked } = this.props;
    const {
      toggleCountrySelector,
      pageCategory,
      submitVerifiedShippingAddressData,
      checkoutRoutingDone,
      bagLoading,
    } = this.props;
    const primaryAddressId = this.getPrimaryAddress();
    const { isAddNewAddress, isEditing, defaultAddressId } = this.state;
    let { submitData } = this;
    if (this.isAddressUpdating) {
      submitData = this.submitShippingAddressData;
    }
    const shippingAddressData = (submitData && submitData.shipTo.address) || {};
    // if (!checkoutRoutingDone) {
    //   return <div>Loading....</div>;
    // }
    return (
      <>
        {((shipmentMethods && shipmentMethods.length > 0) || !checkoutRoutingDone) && (
          <>
            <ShippingForm
              checkoutRoutingDone={checkoutRoutingDone}
              bagLoading={bagLoading}
              toggleCountrySelector={toggleCountrySelector}
              emailSignUpFlags={emailSignUpFlags}
              checkoutServerError={checkoutServerError}
              isSubmitting={isSubmitting}
              routeToPickupPage={routeToPickupPage}
              addressLabels={addressLabels}
              isOrderUpdateChecked={isOrderUpdateChecked}
              isGiftServicesChecked={isGiftServicesChecked}
              smsSignUpLabels={smsSignUpLabels}
              initialValues={{
                address: getAddressInitialValues(this),
                shipmentMethods: { shippingMethodId: defaultShipmentId },
                saveToAddressBook: !isGuest,
                onFileAddressKey: shippingAddressId || primaryAddressId,
                emailSignUp: {
                  emailSignUp: emailSignUpFlags.emailSignUpTCP,
                  emailSignUpGYM: emailSignUpFlags.emailSignUpGYM,
                },
              }}
              selectedShipmentId={selectedShipmentId}
              checkPOBoxAddress={this.checkPOBoxAddress}
              addressPhoneNo={addressPhoneNumber}
              onSubmit={this.submitShippingData}
              emailSignUpLabels={emailSignUpLabels}
              isGuest={isGuest}
              isUsSite={isUsSite}
              orderHasPickUp={orderHasPickUp}
              shipmentMethods={shipmentMethods}
              loadShipmentMethods={loadShipmentMethods}
              defaultShipmentId={defaultShipmentId}
              isSaveToAddressBookChecked={isSaveToAddressBookChecked}
              userAddresses={userAddresses}
              onFileAddressKey={onFileAddressKey}
              isMobile={isMobile}
              newUserPhoneNo={newUserPhoneNo}
              defaultAddressId={defaultAddressId}
              shippingAddressId={shippingAddressId}
              isAddNewAddress={isAddNewAddress}
              isEditing={isEditing}
              toggleAddNewAddress={this.toggleAddNewAddress}
              updateShippingAddress={this.updateShippingAddress}
              setAsDefaultShipping={setAsDefaultShipping}
              addNewShippingAddress={this.addNewShippingAddress}
              labels={labels}
              address={address}
              setDefaultAddressId={this.setDefaultAddressId}
              syncErrorsObject={syncErrors}
              shippingAddress={shippingAddress}
              isVenmoPaymentInProgress={isVenmoPaymentInProgress}
              isVenmoShippingDisplayed={isVenmoShippingDisplayed}
              ServerErrors={ServerErrors}
              pageCategory={pageCategory}
              isLoadingShippingMethods={isLoadingShippingMethods}
            />
            <AddressVerification
              onSuccess={submitVerifiedShippingAddressData(this)}
              heading={addressLabels.addAddressHeading}
              onError={submitVerifiedShippingAddressData(this)}
              shippingAddress={formatPayload(shippingAddressData)}
            />
          </>
        )}
      </>
    );
  }
}
