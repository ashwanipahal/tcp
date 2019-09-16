import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import BillingPaymentForm from '../../BillingPaymentForm';
import styles from '../styles/BillingPage.style';
import GiftCardsContainer from '../../GiftCardsSection';

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
        <BillingPaymentForm
          handleSubmit={submitBilling}
          orderHasShipping={orderHasShipping}
          isGuest={isGuest}
          backLinkPickup={backLinkPickup}
          backLinkShipping={backLinkShipping}
          nextSubmitText={nextSubmitText}
        />
      </div>
    );
  }
}

export default withStyles(BillingPage, styles);
export { BillingPage as BillingPageVanilla };
