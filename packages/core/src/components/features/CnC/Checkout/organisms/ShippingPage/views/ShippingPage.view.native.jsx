import React from 'react';
import { ScrollView, SafeAreaView } from 'react-native';
import { change } from 'redux-form';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import ShippingForm from '../organisms/ShippingForm';
import CheckoutPageEmptyBag from '../../../molecules/CheckoutPageEmptyBag';
import { StyledHeader, HeaderContainer } from '../styles/ShippingPage.style.native';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import AddressVerification from '../../../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import ModalNative from '../../../../../../common/molecules/Modal';
import VenmoBanner from '../../../../../../common/molecules/VenmoBanner';
import CONSTANTS from '../../../Checkout.constants';
import {
  getAddressInitialValues,
  isShowVenmoBanner,
  shippingPropsTypes,
  shippingDefaultProps,
  shippingPageGetDerivedStateFromProps,
} from './ShippingPage.view.utils';

export default class ShippingPage extends React.PureComponent {
  static propTypes = shippingPropsTypes;

  static defaultProps = shippingDefaultProps;

  static getDerivedStateFromProps = shippingPageGetDerivedStateFromProps;

  constructor(props) {
    super(props);
    this.state = {
      defaultAddressId: null,
      showAddressVerification: false,
    };
  }

  componentDidUpdate(prevProps) {
    const { shippingDidUpdate } = this.props;
    shippingDidUpdate(prevProps);
  }

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
      submitVerifiedShippingAddressData,
      bagLoading,
      addNewShippingAddress,
      updateShippingAddress,
      submitShippingForm,
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
                  submitShippingForm={submitShippingForm(this)}
                  labels={labels}
                  isGiftServicesChecked={isGiftServicesChecked}
                  userAddresses={userAddresses}
                  onFileAddressKey={onFileAddressKey}
                  isSaveToAddressBookChecked={isSaveToAddressBookChecked}
                  updateShippingAddress={updateShippingAddress(this)}
                  addNewShippingAddress={addNewShippingAddress}
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
