import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrderNotification from '../../../views';
import {
  getLastBopis,
  getLimitToDisplayLastOrderNotification,
  getTransactionNotificationsInMyAccountEnabled,
} from '../../../container/OrderNotification.selectors';

/**
 * This component will render OrderNotification component
 * @param { object, Array }
 */
export class OrderNotificationBOPIS extends PureComponent {
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
  order: getLastBopis(state),
  limitOfDaysToDisplayNotification: getLimitToDisplayLastOrderNotification(state),
  isTransactionNotificationsInMyAccountEnabled: getTransactionNotificationsInMyAccountEnabled(
    state
  ),
});

OrderNotificationBOPIS.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  order: PropTypes.shape({}),
  limitOfDaysToDisplayNotification: PropTypes.number.isRequired,
  isTransactionNotificationsInMyAccountEnabled: PropTypes.bool.isRequired,
};

OrderNotificationBOPIS.defaultProps = {
  order: {},
};

export default connect(mapStateToProps)(OrderNotificationBOPIS);
