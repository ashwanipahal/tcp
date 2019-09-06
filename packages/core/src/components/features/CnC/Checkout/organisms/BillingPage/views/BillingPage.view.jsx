import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import CheckoutFooter from '../../../molecules/CheckoutFooter';
import CheckoutOrderInfo from '../../../molecules/CheckoutOrderInfoMobile';

import styles from '../styles/BillingPage.style';
import GiftCardsContainer from '../../GiftCardsSection';

class BillingPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    labels: PropTypes.shape({}).isRequired,
    orderHasShipping: PropTypes.bool.isRequired,
    submitBilling: PropTypes.func.isRequired,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className, labels, orderHasShipping, submitBilling } = this.props;
    const { header, backLinkPickup, backLinkShipping, nextSubmitText } = labels;
    return (
      <div className={className}>
        <CheckoutSectionTitleDisplay title={header} dataLocator="billing-title" />
        <GiftCardsContainer />
        <CheckoutOrderInfo />
        <CheckoutFooter
          hideBackLink
          // backLinkHandler={routeToPickupPage}
          nextHandler={submitBilling}
          nextButtonText={nextSubmitText}
          backLinkText={orderHasShipping ? backLinkShipping : backLinkPickup}
        />
      </div>
    );
  }
}

export default withStyles(BillingPage, styles);
export { BillingPage as BillingPageVanilla };
