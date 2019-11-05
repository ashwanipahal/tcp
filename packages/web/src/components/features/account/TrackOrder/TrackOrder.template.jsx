import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Account from '@tcp/core/src/components/features/account/Account';

const TrackOrder = ({ router, ...props }) => {
  const { orderId, emailAddress } = (router && router.query) || {};

  const routerProp = {
    ...router,
    ...{
      query: {
        id: 'orders',
        subSection: 'order-details',
        orderId,
        emailAddress,
      },
    },
  };

  return <Account router={routerProp} {...props} />;
};

TrackOrder.propTypes = {
  router: PropTypes.shape({}).isRequired,
};

export default withRouter(TrackOrder);
