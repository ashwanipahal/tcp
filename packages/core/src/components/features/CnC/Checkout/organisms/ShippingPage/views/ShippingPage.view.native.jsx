import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingForm from '../organisms/ShippingForm';
import CheckoutPageEmptyBag from '../../../molecules/CheckoutPageEmptyBag';
import { StyledHeader, HeaderContainer } from '../styles/ShippingPage.style.native';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import ModalNative from '../../../../../../common/molecules/Modal';

export default class ShippingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    isOrderUpdateChecked: PropTypes.bool,
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
    addNewShippingAddressData: PropTypes.func,
    shippingDidUpdate: PropTypes.func.isRequired,
    syncErrors: PropTypes.shape({}),
    newUserPhoneNo: PropTypes.string,
    setCheckoutStage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOrderUpdateChecked: false,
    addressPhoneNumber: null,
    address: null,
    selectedShipmentId: null,
    isGuest: true,
    isUsSite: true,
    orderHasPickUp: false,
    shipmentMethods: null,
    defaultShipmentId: null,
    isGiftServicesChecked: false,
    userAddresses: null,
    onFileAddressKey: null,
    isSaveToAddressBookChecked: false,
    setAsDefaultShipping: false,
    saveToAddressBook: false,
    addNewShippingAddressData: () => {},
    syncErrors: {},
    newUserPhoneNo: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultAddressId: null,
      showAddressVerification: false,
    };
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
        defaultAddressId: defaultAddress
          ? defaultAddress.addressId
          : userAddresses.get(0).addressId,
      };
    }
    if (addEditResponseAddressId && prevDefaultAddress !== addEditResponseAddressId) {
      return { defaultAddressId: addEditResponseAddressId };
    }
    return null;
  }

  componentDidUpdate(prevProps) {
    const { shippingDidUpdate } = this.props;
    shippingDidUpdate(prevProps);
  }

  submitShippingForm = data => {
    const {
      address,
      shipmentMethods,
      onFileAddressKey,
      defaultShipping,
      saveToAddressBook,
      smsSignUp = {},
    } = data;
    const { isGuest, userAddresses, formatPayload } = this.props;
    let shipAddress = address;
    if (!isGuest && userAddresses && userAddresses.size > 0 && onFileAddressKey) {
      shipAddress = userAddresses.find(item => item.addressId === onFileAddressKey);
      if (shipAddress) {
        const { addressLine } = shipAddress;
        const [addressLine1, addressLine2] = addressLine;
        shipAddress.addressLine1 = addressLine1;
        shipAddress.addressLine2 = addressLine2;
      }
    }
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
    const { handleSubmit, verifyAddressAction } = this.props;
    if (!onFileAddressKey) {
      const formattedPayload = formatPayload(shipAddress);
      this.submitData = submitData;
      this.setState({ showAddressVerification: true });
      return verifyAddressAction(formattedPayload);
    }

    return handleSubmit(submitData);
  };

  updateShippingAddress = () => {
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
    this.setState({ showAddressVerification: true });
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

  closeAddAddressVerificationModal = () => {
    this.setState({ showAddressVerification: false });
  };

  render() {
    const {
      shipmentMethods,
      defaultShipmentId,
      selectedShipmentId,
      isGuest,
      isUsSite,
      orderHasPickUp,
      smsSignUpLabels,
      isOrderUpdateChecked,
      addressPhoneNumber,
      addressLabels,
      emailSignUpLabels,
      loadShipmentMethods,
      navigation,
      availableStages,
      labels,
      isGiftServicesChecked,
      userAddresses,
      onFileAddressKey,
      isSaveToAddressBookChecked,
      address,
      setAsDefaultShipping,
      syncErrors,
      newUserPhoneNo,
      setCheckoutStage,
      formatPayload,
      cartOrderItemsCount,
      checkoutPageEmptyBagLabels,
      submitVerifiedShippingAddressData,
    } = this.props;

    const { defaultAddressId, showAddressVerification } = this.state;
    let { submitData } = this;
    if (this.isAddressUpdating) {
      submitData = this.submitShippingAddressData;
    }
    const shippingAddressData = (submitData && submitData.shipTo.address) || {};
    return (
      <>
        {cartOrderItemsCount > 0 ? (
          <>
            {showAddressVerification && (
              <ModalNative
                isOpen={showAddressVerification}
                onRequestClose={this.closeAddAddressVerificationModal}
                heading={getLabelValue(
                  labels,
                  'lbl_shipping_addNewAddress',
                  'shipping',
                  'checkout'
                )}
              >
                <SafeAreaView>
                  <ScrollView>
                    <AddressVerification
                      onSuccess={submitVerifiedShippingAddressData(this)}
                      heading={addressLabels.addAddressHeading}
                      onError={submitVerifiedShippingAddressData(this)}
                      shippingAddress={formatPayload(shippingAddressData)}
                      toggleAddressModal={this.closeAddAddressVerificationModal}
                    />
                  </ScrollView>
                </SafeAreaView>
              </ModalNative>
            )}
            <>
              <CheckoutProgressIndicator
                activeStage="shipping"
                navigation={navigation}
                setCheckoutStage={setCheckoutStage}
                availableStages={availableStages}
              />
              <ScrollView
                keyboardShouldPersistTaps="handled"
                ref={scrollView => {
                  this.scrollView = scrollView;
                }}
              >
                <HeaderContainer>
                  <CheckoutSectionTitleDisplay
                    title={getLabelValue(labels, 'lbl_shipping_header', 'shipping', 'checkout')}
                  />
                </HeaderContainer>
                <StyledHeader>
                  <BodyCopy
                    color="black"
                    fontWeight="regular"
                    fontFamily="primary"
                    fontSize="fs28"
                    text={getLabelValue(
                      labels,
                      'lbl_shipping_sectionHeader',
                      'shipping',
                      'checkout'
                    )}
                    textAlign="left"
                  />
                </StyledHeader>
                {shipmentMethods && shipmentMethods.length > 0 && (
                  <ShippingForm
                    shipmentMethods={shipmentMethods}
                    initialValues={{
                      address: { country: 'US' },
                      shipmentMethods: { shippingMethodId: defaultShipmentId },
                      onFileAddressKey: defaultAddressId,
                    }}
                    selectedShipmentId={selectedShipmentId}
                    scrollView={this.scrollView}
                    isGuest={isGuest}
                    isUsSite={isUsSite}
                    orderHasPickUp={orderHasPickUp}
                    smsSignUpLabels={smsSignUpLabels}
                    isOrderUpdateChecked={isOrderUpdateChecked}
                    emailSignUpLabels={emailSignUpLabels}
                    addressPhoneNo={addressPhoneNumber}
                    addressLabels={addressLabels}
                    loadShipmentMethods={loadShipmentMethods}
                    navigation={navigation}
                    submitShippingForm={this.submitShippingForm}
                    labels={labels}
                    isGiftServicesChecked={isGiftServicesChecked}
                    userAddresses={userAddresses}
                    onFileAddressKey={onFileAddressKey}
                    isSaveToAddressBookChecked={isSaveToAddressBookChecked}
                    updateShippingAddress={this.updateShippingAddress}
                    addNewShippingAddress={this.addNewShippingAddress}
                    address={address}
                    setAsDefaultShipping={setAsDefaultShipping}
                    defaultAddressId={defaultAddressId}
                    syncErrorsObject={syncErrors}
                    newUserPhoneNo={newUserPhoneNo}
                    setCheckoutStage={setCheckoutStage}
                  />
                )}
              </ScrollView>
            </>
          </>
        ) : (
          <CheckoutPageEmptyBag labels={checkoutPageEmptyBagLabels} />
        )}
      </>
    );
  }
}
