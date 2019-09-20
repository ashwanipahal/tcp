import React from 'react';
import { ScrollView } from 'react-native';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutProgressIndicator from '../../../molecules/CheckoutProgressIndicator';
import GiftCardsContainer from '../../GiftCardsSection';
import CnCTemplate from '../../../../common/organism/CnCTemplate';
import style from '../styles/BillingPage.style.native';
import CONSTANTS from '../../../Checkout.constants';
import GuestBillingForm from '../../GuestBillingForm';

const { Container } = style;

class BillingPage extends React.PureComponent {
  static propTypes = {
    addressLabels: PropTypes.shape({}).isRequired,
    shippingLabels: PropTypes.shape({}).isRequired,
    smsSignUpLabels: PropTypes.shape({}).isRequired,
    address: PropTypes.shape({}),
    emailSignUpLabels: PropTypes.shape({}).isRequired,
    navigation: PropTypes.shape({}).isRequired,
    handleSubmit: PropTypes.func.isRequired,
    submitBilling: PropTypes.func.isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    availableStages: PropTypes.shape([]).isRequired,
    labels: PropTypes.shape({}).isRequired,
  };

  static defaultProps = {
    address: null,
  };

  render() {
    const {
      navigation,
      availableStages,
      labels,
      handleSubmit,
      submitBilling,
      orderHasShipping,
      isGuest,
      shippingAddress,
      cvvCodeRichText,
      addressLabels,
      billingData,
    } = this.props;

    const { header, backLinkShipping, backLinkPickup, nextSubmitText } = labels;

    return (
      <>
        <CheckoutProgressIndicator
          activeStage="billing"
          navigation={navigation}
          availableStages={availableStages}
        />
        <ScrollView>
          <Container>
            <CheckoutSectionTitleDisplay title={header} />
            <GiftCardsContainer />
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
            />
          </Container>
          <CnCTemplate
            navigation={navigation}
            btnText={nextSubmitText}
            routeToPage=""
            onPress={handleSubmit(() => submitBilling({ navigation }))}
            backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
            onBackLinkPress={() =>
              navigation.navigate(
                orderHasShipping
                  ? CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_SHIPPING
                  : CONSTANTS.CHECKOUT_ROUTES_NAMES.CHECKOUT_PICKUP
              )
            }
          />
        </ScrollView>
      </>
    );
  }
}

export default reduxForm({
  form: 'checkoutBilling',
  destroyOnUnmount: false,
})(BillingPage);

export { BillingPage as BillingPageVanilla };
