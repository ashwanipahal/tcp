import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import OrdersTileComponent from '../views';
import {
  getOrdersListState,
  getOrderListFetchingState,
} from '../../../../Orders/container/Orders.selectors';
import { getOrdersList } from '../../../../Orders/container/Orders.actions';
import { getSiteId } from '../../../../../../../utils';
import { getLabels } from '../../../../Account/container/Account.selectors';
import OrdersTileSkelton from '../skelton/OrdersTileSkelton.view';

class OrdersTile extends PureComponent {
  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders(getSiteId());
  }

  render() {
    const { labels, ordersListItems, navigation, handleComponentChange, isFetching } = this.props;
    return !isFetching ? (
      <OrdersTileComponent
        labels={labels}
        ordersList={ordersListItems}
        navigation={navigation}
        handleComponentChange={handleComponentChange}
      />
    ) : (
      <OrdersTileSkelton />
    );
  }
}

OrdersTile.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  fetchOrders: PropTypes.func,
  ordersListItems: PropTypes.shape({}).isRequired,
  navigation: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

OrdersTile.defaultProps = {
  fetchOrders: () => {},
  isFetching: false,
};
export const mapStateToProps = state => ({
  labels: getLabels(state),
  ordersListItems: getOrdersListState(state),
  isFetching: getOrderListFetchingState(state),
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
