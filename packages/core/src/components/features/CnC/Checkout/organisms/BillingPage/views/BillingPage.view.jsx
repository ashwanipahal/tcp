import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';
import BillingPaymentForm from '../../BillingPaymentForm';
import styles from '../styles/BillingPage.style';
import GiftCardsContainer from '../../GiftCardsSection';
import utility from '../../../util/utility';
import { CHECKOUT_ROUTES } from '../../../Checkout.constants';

class BillingPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}).isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    submitBilling: PropTypes.func.isRequired,
    isGuest: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className, labels, orderHasShipping, isGuest, submitBilling } = this.props;
    const { header, backLinkPickup, backLinkShipping, nextSubmitText } = labels;
    return (
      <div className={className}>
        <CheckoutSectionTitleDisplay title={header} dataLocator="billing-title" />
        <GiftCardsContainer />
        <div className="payment-container" />
        <CheckoutOrderInfo isGuest={isGuest} />
        <CheckoutFooter
          hideBackLink
          backLinkHandler={() => utility.routeToPage(CHECKOUT_ROUTES.shippingPage)}
          nextHandler={submitBilling}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
        />
        <BillingPaymentForm />
      </div>
    );
  }
}

export default withStyles(BillingPage, styles);
export { BillingPage as BillingPageVanilla };
