import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import GiftCardsContainer from '../../GiftCardsSection';
import style from '../styles/BillingPage.style.native';
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
    orderHasShipping: PropTypes.bool.isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    labels: PropTypes.shape({}).isRequired,
    isGuest: PropTypes.bool,
    shippingAddress: PropTypes.shape({}),
    cvvCodeRichText: PropTypes.shape({}),
    billingData: PropTypes.shape({}),
    userAddresses: PropTypes.shape({}),
    creditFieldLabels: PropTypes.shape({}),
  };

  static defaultProps = {
    address: null,
    isGuest: true,
    shippingAddress: null,
    cvvCodeRichText: null,
    billingData: null,
    userAddresses: null,
    creditFieldLabels: {},
  };

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
    } = this.props;

    const { header, backLinkShipping, backLinkPickup, nextSubmitText } = labels;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="billing"
          navigation={navigation}
          availableStages={availableStages}
        />
        <ScrollView
          ref={scrollView => {
            this.scrollView = scrollView;
          }}
        >
          <Container>
            <CheckoutSectionTitleDisplay title={header} />
            <GiftCardsContainer />
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
              />
            )}
          </Container>
        </ScrollView>
      </>
    );
  }
}

export default BillingPage;

export { BillingPage as BillingPageVanilla };
