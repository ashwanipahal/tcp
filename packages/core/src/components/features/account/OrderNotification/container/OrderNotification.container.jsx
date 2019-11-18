import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { validateDiffInDaysNotification } from '@tcp/core/src/utils/utils';
import {
  getLastBopis,
  getLastSTHOrder,
  getLastBoss,
  getLimitToDisplayBossOrder,
  getLimitToDisplayLastOrderNotification,
  getTransactionNotificationsInMyAccountEnabled,
  getLabels,
} from './OrderNotification.selectors';
import { getLabels as getOrderLabels } from '../../Account/container/Account.selectors';
import { getOrdersListState } from '../../Orders/container/Orders.selectors';
import { getSiteId, isCanada } from '../../../../../utils';
import { getOrdersList } from '../../Orders/container/Orders.actions';
import OrderNotificationComponent from '../views';

/**
 * This component will render OrderNotification container component
 */
export class OrderNotification extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { STHEnabled: false, BOSSEnabled: false, BOPISEnabled: false };
  }

  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders(getSiteId());
  }

  componentDidUpdate() {
    const {
      orderSTH,
      orderBOPIS,
      orderBOSS,
      limitOfDaysToDisplayNotification,
      limitOfDaysToDisplayBossNotification,
    } = this.props;

    if (
      orderBOPIS &&
      validateDiffInDaysNotification(orderBOPIS.orderDate, limitOfDaysToDisplayNotification)
    ) {
      this.updateState('BOPISEnabled');
    }

    if (
      !isCanada() &&
      orderBOSS &&
      validateDiffInDaysNotification(orderBOSS.orderDate, limitOfDaysToDisplayBossNotification)
    ) {
      this.updateState('BOSSEnabled');
    }

    if (
      orderSTH &&
      validateDiffInDaysNotification(orderSTH.orderDate, limitOfDaysToDisplayNotification)
    ) {
      this.updateState('STHEnabled');
    }
  }

  updateState = key => {
    this.setState({
      [key]: true,
    });
  };

  render() {
    const {
      labels,
      orderLabels,
      isTransactionNotificationsInMyAccountEnabled,
      orderSTH,
      orderBOPIS,
      orderBOSS,
    } = this.props;

    const { STHEnabled, BOSSEnabled, BOPISEnabled } = this.state;
    return (
      <>
        {isTransactionNotificationsInMyAccountEnabled && (
          <>
            {BOPISEnabled && (
              <OrderNotificationComponent
                order={orderBOPIS}
                labels={labels}
                orderLabels={orderLabels}
                separator={BOSSEnabled || STHEnabled}
              />
            )}

            {BOSSEnabled && (
              <OrderNotificationComponent
                order={orderBOSS}
                labels={labels}
                orderLabels={orderLabels}
                separator={STHEnabled}
              />
            )}
            {STHEnabled && (
              <OrderNotificationComponent
                order={orderSTH}
                orderLabels={orderLabels}
                labels={labels}
                separator={false}
              />
            )}
          </>
        )}
      </>
    );
  }
}

export const mapStateToProps = state => ({
  labels: getLabels(state),
  orderLabels: getOrderLabels(state),
  ordersListItems: getOrdersListState(state),
  orderSTH: getLastSTHOrder(state),
  orderBOSS: getLastBoss(state),
  orderBOPIS: getLastBopis(state),
  limitOfDaysToDisplayNotification: getLimitToDisplayLastOrderNotification(state),
  limitOfDaysToDisplayBossNotification: getLimitToDisplayBossOrder(state),
  isTransactionNotificationsInMyAccountEnabled: getTransactionNotificationsInMyAccountEnabled(
    state
  ),
});

export const mapDispatchToProps = dispatch => ({
  fetchOrders: payload => {
    dispatch(getOrdersList(payload));
  },
});

OrderNotification.propTypes = {
  fetchOrders: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
  orderLabels: PropTypes.shape({}).isRequired,
  orderSTH: PropTypes.shape({}),
  orderBOSS: PropTypes.shape({}),
  orderBOPIS: PropTypes.shape({}),
  limitOfDaysToDisplayNotification: PropTypes.number.isRequired,
  limitOfDaysToDisplayBossNotification: PropTypes.number.isRequired,
  isTransactionNotificationsInMyAccountEnabled: PropTypes.bool.isRequired,
};

OrderNotification.defaultProps = {
  fetchOrders: () => {},
  orderSTH: {},
  orderBOSS: {},
  orderBOPIS: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderNotification);
