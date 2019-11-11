import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderNotification from '../../../views';
import {
  getLastBoss,
  getLimitToDisplayBossOrder,
  getTransactionNotificationsInMyAccountEnabled,
} from '../../../container/OrderNotification.selectors';

/**
 * This component will render OrderNotificationBOSS component
 */
const OrderNotificationBOSS = ({
  labels,
  order,
  limitOfDaysToDisplayNotification,
  isTransactionNotificationsInMyAccountEnabled,
}) => {
  return (
    <OrderNotification
      order={order}
      limitOfDaysToDisplayNotification={limitOfDaysToDisplayNotification}
      isTransactionNotificationsInMyAccountEnabled={isTransactionNotificationsInMyAccountEnabled}
      labels={labels}
    />
  );
};

export const mapStateToProps = state => ({
  order: getLastBoss(state),
  limitOfDaysToDisplayNotification: getLimitToDisplayBossOrder(state),
  isTransactionNotificationsInMyAccountEnabled: getTransactionNotificationsInMyAccountEnabled(
    state
  ),
});

OrderNotificationBOSS.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  order: PropTypes.shape({}),
  limitOfDaysToDisplayNotification: PropTypes.number.isRequired,
  isTransactionNotificationsInMyAccountEnabled: PropTypes.bool.isRequired,
};

OrderNotificationBOSS.defaultProps = {
  order: {},
};

export default connect(mapStateToProps)(OrderNotificationBOSS);
export { OrderNotificationBOSS as OrderNotificationVanilla };
