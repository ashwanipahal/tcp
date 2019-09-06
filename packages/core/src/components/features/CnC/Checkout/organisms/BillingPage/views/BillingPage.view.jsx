import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../../../../../../common/hoc/withStyles';
import CheckoutSectionTitleDisplay from '../../../../../../common/molecules/CheckoutSectionTitleDisplay';
import BillingPaymentForm from '../../BillingPaymentForm';

import styles from '../styles/BillingPage.style';

class BillingPage extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render() {
    const { className } = this.props;
    return (
      <div className={className}>
        <CheckoutSectionTitleDisplay title="Billing" dataLocator="billing-title" />
        <BillingPaymentForm />
      </div>
    );
  }
}

export default withStyles(BillingPage, styles);
export { BillingPage as BillingPageVanilla };
