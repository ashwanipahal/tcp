import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import AccountOverviewTile from '../../../../../../common/molecules/AccountOverviewTile';
// import EmptyOrdersTile from '../../../molecule/EmptyOrdersTile';
import internalEndpoints from '../../../internalEndpoints';

export const MyPreferencesTile = ({ labels }) => {

  return (
    <AccountOverviewTile
      title={getLabelValue(labels, 'lbl_ordersTile_heading', 'orders')}
      ctaTitle={getLabelValue(labels, 'lbl_ordersTile_viewAllOrders', 'orders')}
      dataLocatorPrefix="orders"
      ctaLink={internalEndpoints.myOrderPage.link}
      ctaPath={internalEndpoints.myOrderPage.path}
    >
      MyPreferencesTile
    </AccountOverviewTile>
  );
};

MyPreferencesTile.propTypes = {
  labels: PropTypes.shape({}),
  ordersList: PropTypes.shape({}).isRequired,
};

MyPreferencesTile.defaultProps = {
  labels: {
    lbl_ordersTile_heading: '',
    lbl_ordersTile_viewAllOrders: '',
  },
};

export default MyPreferencesTile;
