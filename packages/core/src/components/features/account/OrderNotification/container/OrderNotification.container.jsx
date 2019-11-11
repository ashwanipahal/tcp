import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import styles from '../styles/OrderNotification.style';
import { getOrdersListState } from '../../Orders/container/Orders.selectors';
import { getSiteId, isCanada } from '../../../../../utils';
import { getOrdersList } from '../../Orders/container/Orders.actions';
import { getLabels } from './OrderNotification.selectors';
import OrderNotificationSTH from '../molecules/OrderNotificationSTH';
import OrderNotificationBOSS from '../molecules/OrderNotificationBOSS';
import OrderNotificationBOPIS from '../molecules/OrderNotificationBOPIS';

/**
 * This component will render OrderNotification container component
 */
export class OrderNotification extends PureComponent {
  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders(getSiteId());
  }

  render() {
    const { labels, className } = this.props;
    return (
      <BodyCopy className={className}>
        <OrderNotificationSTH labels={labels} />
        <OrderNotificationBOPIS labels={labels} />
        {!isCanada() && <OrderNotificationBOSS labels={labels} />}
      </BodyCopy>
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
};

OrderNotification.defaultProps = {
  className: '',
  fetchOrders: () => {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(OrderNotification, styles));
export { OrderNotification as OrderNotificationVanilla };
