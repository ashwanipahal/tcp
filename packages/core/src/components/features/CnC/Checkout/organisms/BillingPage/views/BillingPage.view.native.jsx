import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { getScreenHeight } from '@tcp/core/src/utils';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import GiftCardsContainer from '../../GiftCardsSection';
import style, { BillingPageContainer } from '../styles/BillingPage.style.native';
import GuestBillingForm from '../../GuestBillingForm';
import BillingPaymentForm from '../../BillingPaymentForm';

const { Container } = style;

/**
 * @class BillingPage
 * @extends {PureComponent}
 * @description view component to render billing page .
 */
class BillingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    navigation: PropTypes.shape({}).isRequired,
    submitBilling: PropTypes.func.isRequired,
    billingDidMount: PropTypes.func.isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    labels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    shippingAddress: PropTypes.shape({}),
    cvvCodeRichText: PropTypes.shape({}),
    billingData: PropTypes.shape({}),
    userAddresses: PropTypes.shape({}),
    creditFieldLabels: PropTypes.shape({}),
    setCheckoutStage: PropTypes.func.isRequired,
    isVenmoPaymentInProgress: PropTypes.bool,
    isVenmoEnabled: PropTypes.bool,
    isPayPalWebViewEnable: PropTypes.bool,
    isFetching: PropTypes.bool.isRequired,
    onVenmoError: PropTypes.shape({}),
  };

  static defaultProps = {
    address: null,
    isGuest: true,
    shippingAddress: null,
    cvvCodeRichText: null,
    billingData: null,
    userAddresses: null,
    creditFieldLabels: {},
    isVenmoPaymentInProgress: false,
    isVenmoEnabled: false,
    isPayPalWebViewEnable: false,
    onVenmoError: {},
  };

  componentDidMount() {
    const { billingDidMount } = this.props;
    billingDidMount(true);
  }

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const {
      navigation,
      availableStages,
      labels,
      submitBilling,
      orderHasShipping,
      isGuest,
      shippingAddress,
      cvvCodeRichText,
      addressLabels,
      billingData,
      userAddresses,
      creditFieldLabels,
      setCheckoutStage,
      isVenmoPaymentInProgress,
      isVenmoEnabled, // Venmo Kill Switch, if Venmo enabled then true, else false.
      isPayPalWebViewEnable,
      isFetching,
      onVenmoError,
    } = this.props;

    const { header, backLinkShipping, backLinkPickup, nextSubmitText } = labels;
    // Below Style is Only for handling PayPal FullScreen View
    const isIOS = Platform.OS === 'ios';
    const screenHeight = getScreenHeight();
    const scrollStyle = {
      position: 'absolute',
      zIndex: 992,
      height: isIOS ? screenHeight - 40 : screenHeight,
      width: '100%',
    };
    const defualtScrollStyle = { flexGrow: 1 };
    return (
      <BillingPageContainer isPayPalWebViewEnable={isPayPalWebViewEnable}>
        {!isPayPalWebViewEnable && (
          <CheckoutProgressIndicator
            activeStage="billing"
            navigation={navigation}
            availableStages={availableStages}
            setCheckoutStage={setCheckoutStage}
          />
        )}
        <ScrollView
          style={isPayPalWebViewEnable ? scrollStyle : defualtScrollStyle}
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
          scrollEnabled={!isPayPalWebViewEnable}
          contentContainerStyle={isPayPalWebViewEnable ? scrollStyle : defualtScrollStyle}
        >
          <Container isPayPalWebViewEnable={isPayPalWebViewEnable}>
            <CheckoutSectionTitleDisplay title={header} />
            <GiftCardsContainer isFetching={isFetching} />
            {isGuest ? (
              <GuestBillingForm
                shippingAddress={shippingAddress}
                cvvCodeRichText={cvvCodeRichText}
                labels={labels}
                isGuest={isGuest}
                addressLabels={addressLabels}
                backLinkPickup={backLinkPickup}
                backLinkShipping={backLinkShipping}
                nextSubmitText={nextSubmitText}
                orderHasShipping={orderHasShipping}
                billingData={billingData}
                navigation={navigation}
                btnText={nextSubmitText}
                creditFieldLabels={creditFieldLabels}
                setCheckoutStage={setCheckoutStage}
                isVenmoPaymentInProgress={isVenmoPaymentInProgress}
                isVenmoEnabled={isVenmoEnabled}
                isPayPalWebViewEnable={isPayPalWebViewEnable}
                onVenmoError={onVenmoError}
              />
            ) : (
              <BillingPaymentForm
                handleSubmit={submitBilling}
                orderHasShipping={orderHasShipping}
                isGuest={isGuest}
                backLinkPickup={backLinkPickup}
                backLinkShipping={backLinkShipping}
                nextSubmitText={nextSubmitText}
                cvvCodeRichText={cvvCodeRichText}
                labels={labels}
                billingData={billingData}
                addressLabels={addressLabels}
                shippingAddress={shippingAddress}
                userAddresses={userAddresses}
                navigation={navigation}
                creditFieldLabels={creditFieldLabels}
                scrollView={this.scrollView}
                setCheckoutStage={setCheckoutStage}
                isVenmoPaymentInProgress={isVenmoPaymentInProgress}
                isVenmoEnabled={isVenmoEnabled}
                isPayPalWebViewEnable={isPayPalWebViewEnable}
                onVenmoError={onVenmoError}
              />
            )}
          </Container>
        </ScrollView>
      </BillingPageContainer>
    );
  }
}

export default BillingPage;

export { BillingPage as BillingPageVanilla };
