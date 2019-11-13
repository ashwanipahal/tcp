/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import PropTypes from 'prop-types';
import ShippingForm from '../organisms/ShippingForm';
import { getSiteId } from '../../../../../../../utils/utils.web';
import checkoutUtil from '../../../util/utility';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import setPickupInitialValues, { setShippingAddress } from './ShippingPage.view.utils';

const { hasPOBox } = checkoutUtil;

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
    checkoutRoutingDone: PropTypes.bool.isRequired,
    formatPayload: PropTypes.func.isRequired,
    submitVerifiedShippingAddressData: PropTypes.func.isRequired,
    verifyAddressAction: PropTypes.func.isRequired,
    updateShippingMethodSelection: PropTypes.func.isRequired,
    saveToAddressBook: PropTypes.bool,
    updateShippingAddressData: PropTypes.func.isRequired,
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
    setVenmoPickupState: () => {},
    shippingPhoneAndEmail: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isAddNewAddress: false,
      defaultAddressId: null,
    };
  }

  componentDidMount() {
    const { shippingDidMount } = this.props;
    shippingDidMount();
  }

  componentDidUpdate(prevProps) {
    const { shippingDidMount, isRegisteredUserCallDone } = this.props;
    const { isRegisteredUserCallDone: prevIsRegisteredUserCallDone } = prevProps;

    if (prevIsRegisteredUserCallDone !== isRegisteredUserCallDone && isRegisteredUserCallDone) {
      shippingDidMount();
    }
    this.extendedComponentDidUpdate(prevProps);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
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
  }

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

    // const addAddressData = {
    //   applyToOrder: true,
    // };

    // const addEmailSignUp = {
    //   URL: 'email-confirmation',
    //   catalogId: '10552',
    //   emailaddr: address.email,
    //   langId: '-1',
    //   response: 'invalid::false:false',
    //   storeId: '10152',
    // };
    const { handleSubmit, setVenmoPickupState, formatPayload } = this.props;
    const submitData = {
      method: {
        shippingMethodId: shipmentMethods.shippingMethodId,
      },
      shipTo: {
        address: shipAddress,
        addressId: shipAddress.addressId,
        emailAddress: shipAddress.emailAddress,
        emailSignup: true,
        onFileAddressKey,
        phoneNumber: shipAddress.phoneNumber,
        saveToAccount: saveToAddressBook,
        setAsDefault: defaultShipping || shipAddress.primary === 'true',
      },
      smsInfo: {
        smsUpdateNumber: smsSignUp.phoneNumber,
        wantsSmsOrderUpdates: smsSignUp.sendOrderUpdate,
      },
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
      return selectedAddress && selectedAddress.addressId;
    }
    return null;
  };

  getAddressInitialValues = () => {
    const {
      shippingAddress,
      shippingPhoneAndEmail,
      userAddresses,
      isGuest,
      pickUpContactPerson,
      orderHasPickUp,
    } = this.props;
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

  submitVerifiedShippingAddressData = shippingAddress => {
    const { submitVerifiedShippingAddressData, updateShippingAddressData } = this.props;
    if (this.isAddressUpdating) {
      this.isAddressUpdating = false;
      this.submitShippingAddressData.shipTo.address = {
        ...this.submitShippingAddressData.shipTo.address,
        ...shippingAddress,
        addressLine1: shippingAddress.address1,
        addressLine2: shippingAddress.address2,
        zipCode: shippingAddress.zip,
      };
      return updateShippingAddressData(this.submitShippingAddressData, this.afterAddressUpdate);
    }
    return submitVerifiedShippingAddressData({ shippingAddress, submitData: this.submitData });
  };

  extendedComponentDidUpdate = prevProps => {
    const { onFileAddressKey, address } = this.props;
    const { selectedShipmentId, updateShippingMethodSelection, shippingAddressId } = this.props;

    const {
      address: prevAddress,
      onFileAddressKey: prevFileAddressKey,
      selectedShipmentId: prevSelectedShipmentId,
    } = prevProps;
    if (address && prevAddress) {
      const {
        address: { addressLine1, addressLine2 },
        loadShipmentMethods,
      } = this.props;
      const {
        address: { addressLine1: prevAddressLine1, addressLine2: prevAddressLine2 },
      } = prevProps;
      if (
        (addressLine1 !== prevAddressLine1 || addressLine2 !== prevAddressLine2) &&
        hasPOBox(addressLine1, addressLine2)
      ) {
        loadShipmentMethods({ formName: 'checkoutShipping' });
      }
    }
    if (onFileAddressKey !== prevFileAddressKey) {
      this.getShipmentMethods(prevProps);
    }
    if (
      shippingAddressId &&
      prevSelectedShipmentId &&
      selectedShipmentId !== prevSelectedShipmentId
    ) {
      updateShippingMethodSelection({ id: selectedShipmentId });
    }
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
    } = this.props;
    const { isMobile, newUserPhoneNo, shippingAddressId } = this.props;
    const { setAsDefaultShipping, labels, address, syncErrors } = this.props;
    const { isSubmitting, formatPayload, ServerErrors, checkoutServerError } = this.props;
    const { shippingAddress, isVenmoPaymentInProgress, isVenmoShippingDisplayed } = this.props;
    const { addressLabels, isOrderUpdateChecked, isGiftServicesChecked } = this.props;
    const { toggleCountrySelector, pageCategory, checkoutRoutingDone } = this.props;
    const primaryAddressId = this.getPrimaryAddress();
    const { isAddNewAddress, isEditing, defaultAddressId } = this.state;
    let { submitData } = this;
    if (this.isAddressUpdating) {
      submitData = this.submitShippingAddressData;
    }
    const shippingAddressData = (submitData && submitData.shipTo.address) || {};
    if (!checkoutRoutingDone) {
      return <div>Loading....</div>;
    }
    return (
      <>
        {shipmentMethods && shipmentMethods.length > 0 && (
          <>
            <ShippingForm
              toggleCountrySelector={toggleCountrySelector}
              checkoutServerError={checkoutServerError}
              isSubmitting={isSubmitting}
              routeToPickupPage={routeToPickupPage}
              addressLabels={addressLabels}
              isOrderUpdateChecked={isOrderUpdateChecked}
              isGiftServicesChecked={isGiftServicesChecked}
              smsSignUpLabels={smsSignUpLabels}
              initialValues={{
                address: this.getAddressInitialValues(),
                shipmentMethods: { shippingMethodId: defaultShipmentId },
                saveToAddressBook: !isGuest,
                onFileAddressKey: shippingAddressId || primaryAddressId,
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
            />
            <AddressVerification
              onSuccess={this.submitVerifiedShippingAddressData}
              heading={addressLabels.addAddressHeading}
              onError={this.submitVerifiedShippingAddressData}
              shippingAddress={formatPayload(shippingAddressData)}
            />
          </>
        )}
      </>
    );
  }
}
