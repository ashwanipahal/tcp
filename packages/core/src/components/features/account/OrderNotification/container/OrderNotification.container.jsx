import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import styles from '../styles/OrderNotification.style';
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
    const { labels, className } = this.props;
    return (
      <Row fullBleed className={className}>
        <Col colSize={{ small: 6, medium: 8, large: 12 }} className="parent-container">
          <OrderNotificationSTH labels={labels} />
          <OrderNotificationBOPIS labels={labels} />
          {!isCanada() && <OrderNotificationBOSS labels={labels} />}
        </Col>
      </Row>
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
  className: PropTypes.string,
  fetchOrders: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]),
};

OrderNotification.defaultProps = {
  className: '',
  fetchOrders: () => {},
  ordersListItems: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(OrderNotification, styles));
export { OrderNotification as OrderNotificationVanilla };
