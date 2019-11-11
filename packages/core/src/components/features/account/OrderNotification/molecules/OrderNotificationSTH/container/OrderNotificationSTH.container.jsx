import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderNotification from '../../../views';
import {
  getLastSTHOrder,
  getLimitToDisplayLastOrderNotification,
  getTransactionNotificationsInMyAccountEnabled,
} from '../../../container/OrderNotification.selectors';

/**
 * This component will render OrderNotification component
 * @param { object, Array }
 */
export class OrderNotificationSTH extends PureComponent {
  render() {
    const {
      labels,
      order,
      limitOfDaysToDisplayNotification,
      isTransactionNotificationsInMyAccountEnabled,
    } = this.props;

    return (
      <OrderNotification
        order={order}
        limitOfDaysToDisplayNotification={limitOfDaysToDisplayNotification}
        isTransactionNotificationsInMyAccountEnabled={isTransactionNotificationsInMyAccountEnabled}
        labels={labels}
      />
    );
  }
}

export const mapStateToProps = state => ({
  order: getLastSTHOrder(state),
  limitOfDaysToDisplayNotification: getLimitToDisplayLastOrderNotification(state),
  isTransactionNotificationsInMyAccountEnabled: getTransactionNotificationsInMyAccountEnabled(
    state
  ),
});

OrderNotificationSTH.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  order: PropTypes.shape({}),
  limitOfDaysToDisplayNotification: PropTypes.number.isRequired,
  isTransactionNotificationsInMyAccountEnabled: PropTypes.bool.isRequired,
};

OrderNotificationSTH.defaultProps = {
  order: {},
};

export default connect(mapStateToProps)(OrderNotificationSTH);
