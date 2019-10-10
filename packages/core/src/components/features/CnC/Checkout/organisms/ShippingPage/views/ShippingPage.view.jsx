/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import ShippingForm from '../organisms/ShippingForm';
import { getSiteId } from '../../../../../../../utils/utils.web';
import checkoutUtil from '../../../util/utility';

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
    updateShippingMethodSelection: PropTypes.func.isRequired,
    saveToAddressBook: PropTypes.bool,
    updateShippingAddressData: PropTypes.func.isRequired,
    labels: PropTypes.shape({}).isRequired,
    syncErrors: PropTypes.shape({}),
    shippingAddress: PropTypes.shape({}),
    isVenmoPaymentInProgress: PropTypes.bool,
    isVenmoShippingDisplayed: PropTypes.bool,
    setVenmoPickupState: PropTypes.func,
    shippingPhoneAndEmail: PropTypes.shape({}),
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

  componentDidUpdate(prevProps) {
    const {
      address,
      selectedShipmentId,
      updateShippingMethodSelection,
      shippingAddressId,
    } = this.props;
    const { address: prevAddress, selectedShipmentId: prevSelectedShipmentId } = prevProps;
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
    if (
      shippingAddressId &&
      prevSelectedShipmentId &&
      selectedShipmentId !== prevSelectedShipmentId
    ) {
      updateShippingMethodSelection({ id: selectedShipmentId });
    }
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
    const { isGuest, userAddresses } = this.props;
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
    const { handleSubmit, setVenmoPickupState } = this.props;
    return new Promise((resolve, reject) => {
      handleSubmit({
        resolve,
        reject,
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
      });
    }).then(() => {
      setVenmoPickupState(true);
    });
  };

  updateShippingAddress = () => {
    const {
      address,
      onFileAddressKey,
      setAsDefaultShipping,
      saveToAddressBook,
      updateShippingAddressData,
    } = this.props;
    updateShippingAddressData({
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
    const { shippingAddress, shippingPhoneAndEmail } = this.props;
    if (!isEmpty(shippingAddress)) {
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
    }
    return {
      country: getSiteId() && getSiteId().toUpperCase(),
    };
  };

  render() {
    const {
      addressLabels,
      isOrderUpdateChecked,
      isGiftServicesChecked,
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
      isMobile,
      newUserPhoneNo,
      shippingAddressId,
      setAsDefaultShipping,
      labels,
      address,
      syncErrors,
      shippingAddress,
      isVenmoPaymentInProgress,
      isVenmoShippingDisplayed,
    } = this.props;
    const primaryAddressId = this.getPrimaryAddress();
    const { isAddNewAddress, isEditing, defaultAddressId } = this.state;
    return (
      <>
        {shipmentMethods.length > 0 && (
          <ShippingForm
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
          />
        )}
        {/* <AddressVerification
          onSuccess={() => {}}
          heading={isEdit ? addressFormLabels.editAddress : addressFormLabels.addAddressHeading}
          onError={() => {}}
        /> */}
      </>
    );
  }
}
