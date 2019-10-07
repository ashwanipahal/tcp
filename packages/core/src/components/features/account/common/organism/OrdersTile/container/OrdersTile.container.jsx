import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrdersTileComponent from '../views';
import getOrdersListState from '../../../../Orders/container/Orders.selectors';
import { getOrdersList } from '../../../../Orders/container/Orders.actions';
import { getSiteId } from '../../../../../../../utils';
import { getLabels } from '../../../../Account/container/Account.selectors';

class OrdersTile extends PureComponent {

  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders(getSiteId());
  }

  render() {
    const { labels, ordersListItems } = this.props;

    return (
      <OrdersTileComponent
        labels={labels}
        ordersList={ordersListItems}
      />
    )
  }
}

OrdersTile.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  fetchOrders: PropTypes.func,
  ordersListItems: PropTypes.shape({}).isRequired,
};

OrdersTile.defaultProps = {
  fetchOrders: () => {},
};
export const mapStateToProps = state => ({
  labels: getLabels(state),
  ordersListItems: getOrdersListState(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchOrders: payload => {
    dispatch(getOrdersList(payload));
  },
});

export { OrdersTile as OrdersTileVanilla };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersTile);
