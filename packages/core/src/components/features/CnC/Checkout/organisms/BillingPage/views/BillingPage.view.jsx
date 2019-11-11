import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import BillingPaymentForm from '../../BillingPaymentForm';
import styles from '../styles/BillingPage.style';
import GiftCardsContainer from '../../GiftCardsSection';
import GuestBillingForm from '../../GuestBillingForm';

class BillingPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}).isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    submitBilling: PropTypes.func.isRequired,
    billingDidMount: PropTypes.func.isRequired,
    isRegisteredUserCallDone: PropTypes.bool.isRequired,
    checkoutRoutingDone: PropTypes.bool.isRequired,
    isGuest: PropTypes.bool.isRequired,
    shippingAddress: PropTypes.shape({}),
    cvvCodeRichText: PropTypes.string,
    addressLabels: PropTypes.shape({}),
    billingData: PropTypes.shape({}),
    userAddresses: PropTypes.shape({}),
    creditFieldLabels: PropTypes.shape({}),
    isVenmoPaymentInProgress: PropTypes.bool,
    isVenmoEnabled: PropTypes.bool,
    pageCategory: PropTypes.string,
    ServerErrors: PropTypes.node.isRequired,
  };

  static defaultProps = {
    className: '',
    shippingAddress: null,
    cvvCodeRichText: null,
    addressLabels: null,
    billingData: {},
    userAddresses: null,
    creditFieldLabels: {},
    pageCategory: '',
    isVenmoPaymentInProgress: false,
    isVenmoEnabled: false,
  };

  componentDidMount() {
    const { billingDidMount } = this.props;
    billingDidMount();
  }

  componentDidUpdate(prevProps) {
    const { isRegisteredUserCallDone: prevIsRegisteredUserCallDone } = prevProps;
    const { billingDidMount, isRegisteredUserCallDone } = this.props;
    if (prevIsRegisteredUserCallDone !== isRegisteredUserCallDone && isRegisteredUserCallDone) {
      billingDidMount();
    }
  }

  render() {
    const {
      className,
      labels,
      orderHasShipping,
      isGuest,
      submitBilling,
      shippingAddress,
      cvvCodeRichText,
      addressLabels,
      billingData,
      userAddresses,
      creditFieldLabels,
      isVenmoPaymentInProgress,
      isVenmoEnabled, // Venmo Kill Switch, if Venmo enabled then true, else false.
      ServerErrors,
      pageCategory,
      checkoutRoutingDone,
    } = this.props;
    const { header, backLinkPickup, backLinkShipping, nextSubmitText } = labels;
    if (!checkoutRoutingDone) {
      return <div />;
    }
    return (
      <div className={className}>
        <CheckoutSectionTitleDisplay title={header} dataLocator="billing-title" />
        {ServerErrors && <ServerErrors />}
        <GiftCardsContainer />
        {!isGuest ? (
          <div className="payment-container">
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
              creditFieldLabels={creditFieldLabels}
              isVenmoPaymentInProgress={isVenmoPaymentInProgress}
              isVenmoEnabled={isVenmoEnabled}
              pageCategory={pageCategory}
            />
          </div>
        ) : (
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
            creditFieldLabels={creditFieldLabels}
            isVenmoPaymentInProgress={isVenmoPaymentInProgress}
            isVenmoEnabled={isVenmoEnabled}
            pageCategory={pageCategory}
          />
        )}
      </div>
    );
  }
}

export default withStyles(BillingPage, styles);
export { BillingPage as BillingPageVanilla };
