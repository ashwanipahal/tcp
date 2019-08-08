import React from 'react';
import PropTypes from 'prop-types';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';

export const PaymentOverviewTile = ({ labels }) => {
  return (
    <AccountOverviewTile
      title={labels.lbl_overview_paymentHeading}
      ctaTitle={labels.lbl_overview_paymentCTA}
    >
      <p>Dummy Credit card content will here...</p>
    </AccountOverviewTile>
  );
};

PaymentOverviewTile.propTypes = {
  labels: PropTypes.shape({
    lbl_overview_paymentHeading: PropTypes.string,
    lbl_overview_paymentCTA: PropTypes.string,
  }),
};

PaymentOverviewTile.defaultProps = {
  labels: {
    lbl_overview_paymentHeading: '',
    lbl_overview_paymentCTA: '',
  },
};

export default PaymentOverviewTile;
