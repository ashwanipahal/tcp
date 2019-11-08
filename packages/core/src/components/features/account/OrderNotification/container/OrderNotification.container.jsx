import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrdersListState } from '../../Orders/container/Orders.selectors';
import { getSiteId, isCanada } from '../../../../../utils';
import { getOrdersList } from '../../Orders/container/Orders.actions';
import { getLabels } from './OrderNotification.selectors';
import OrderNotificationSTH from '../molecules/OrderNotificationSTH';
import OrderNotificationBOSS from '../molecules/OrderNotificationBOSS';
import OrderNotificationBOPIS from '../molecules/OrderNotificationBOPIS';

/**
 * This component will render OrderNotification component
 * @param { object, Array }
 */
export class OrderNotification extends PureComponent {
  componentDidMount() {
    const { fetchOrders, ordersListItems } = this.props;
    if (!ordersListItems || (ordersListItems && !ordersListItems.orders)) {
      fetchOrders(getSiteId());
    }
  }

  render() {
    const { labels } = this.props;
    return (
      <>
        <OrderNotificationSTH labels={labels} />
        <OrderNotificationBOPIS labels={labels} />
        {!isCanada() && <OrderNotificationBOSS labels={labels} />}
      </>
    );
  }
}

export const mapStateToProps = state => ({
  labels: getLabels(state),
  ordersListItems: getOrdersListState(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchOrders: payload => {
    dispatch(getOrdersList(payload));
  },
});

OrderNotification.propTypes = {
  fetchOrders: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]),
};

OrderNotification.defaultProps = {
  fetchOrders: () => {},
  ordersListItems: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderNotification);
