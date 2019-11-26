import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { change } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingForm from '../organisms/ShippingForm';
import CheckoutPageEmptyBag from '../../../molecules/CheckoutPageEmptyBag';
import { StyledHeader, HeaderContainer } from '../styles/ShippingPage.style.native';
import checkoutUtil from '../../../util/utility';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import ModalNative from '../../../../../../common/molecules/Modal';
import VenmoBanner from '../../../../../../common/molecules/VenmoBanner';
import CONSTANTS from '../../../Checkout.constants';
import { getAddressInitialValues, isShowVenmoBanner, propsTypes } from './ShippingPage.view.utils';

const { hasPOBox } = checkoutUtil;
export default class ShippingPage extends React.Component {
  static propTypes = propsTypes;

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
    hasSetGiftOptions: false,
    updateShippingAddressData: () => {},
    addNewShippingAddressData: () => {},
    syncErrors: {},
    newUserPhoneNo: null,
    isVenmoPaymentInProgress: false,
    isVenmoShippingDisplayed: true,
    setVenmoPickupState: () => {},
    venmoBannerLabel: {
      venmoBannerText: '',
    },
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

  componentDidMount() {
    const { shippingDidMount } = this.props;
    shippingDidMount(true);
  }

  shouldComponentUpdate() {
    const { isSubmitting } = this.props;
    return !isSubmitting;
  }

  componentDidUpdate(prevProps) {
    const { address, selectedShipmentId, updateShippingMethodSelection } = this.props;
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
      if (selectedShipmentId !== prevSelectedShipmentId) {
        updateShippingMethodSelection({ id: selectedShipmentId });
      }
      const { shipmentMethods: prevShipmentMethods } = prevProps;
      const { shipmentMethods: nextShipmentMethods, dispatch, defaultShipmentId } = this.props;
      if (
        prevShipmentMethods &&
        nextShipmentMethods &&
        prevShipmentMethods !== nextShipmentMethods
      ) {
        dispatch(change('checkoutShipping', 'shipmentMethods.shippingMethodId', defaultShipmentId));
      }
    }
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
    const {
      isGuest,
      userAddresses,
      formatPayload,
      setVenmoPickupState,
      hasSetGiftOptions,
    } = this.props;
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
    setVenmoPickupState(true);
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
      hasSetGiftOptions,
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

  submitVerifiedShippingAddressData = shippingAddress => {
    const { submitVerifiedShippingAddressData, navigation, updateShippingAddressData } = this.props;
    this.setState({ showAddressVerification: false });
    if (this.isAddressUpdating) {
      this.isAddressUpdating = false;
      this.submitShippingAddressData.shipTo.address = {
        ...this.submitShippingAddressData.shipTo.address,
        ...shippingAddress,
        addressLine1: shippingAddress.address1,
        addressLine2: shippingAddress.address2,
        zipCode: shippingAddress.zip,
      };
      return updateShippingAddressData(this.submitShippingAddressData);
    }
    return submitVerifiedShippingAddressData({
      shippingAddress,
      submitData: this.submitData,
      navigation,
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
      venmoBannerLabel,
      isVenmoPaymentInProgress,
      isVenmoShippingDisplayed,
      cartOrderItemsCount,
      checkoutPageEmptyBagLabels,
      bagLoading,
    } = this.props;

    const { CHECKOUT_STAGES } = CONSTANTS;
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
                      onSuccess={this.submitVerifiedShippingAddressData}
                      heading={addressLabels.addAddressHeading}
                      onError={this.submitVerifiedShippingAddressData}
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
                isVenmoPaymentInProgress={isVenmoPaymentInProgress}
                isVenmoShippingDisplayed={isVenmoShippingDisplayed}
                scrollView={this.scrollView}
                availableStages={availableStages}
              />
              {isShowVenmoBanner(CHECKOUT_STAGES.SHIPPING, this.props) && (
                <VenmoBanner labels={venmoBannerLabel} />
              )}
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
                <ShippingForm
                  shipmentMethods={shipmentMethods}
                  initialValues={{
                    address: getAddressInitialValues(this),
                    shipmentMethods: { shippingMethodId: defaultShipmentId },
                    onFileAddressKey: defaultAddressId,
                  }}
                  selectedShipmentId={selectedShipmentId}
                  bagLoading={bagLoading}
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
                  isVenmoPaymentInProgress={isVenmoPaymentInProgress}
                  isVenmoShippingDisplayed={isVenmoShippingDisplayed}
                />
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
