import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrdersListState, getOrderListFetchingState } from './Orders.selectors';
import {
  getAllItems,
  getOrderDetailsDataFetchingState,
} from '../../OrderDetails/container/OrderDetails.selectors';
import { getSiteId } from '../../../../../utils';
import OrderListComponent from '../views';
import { getOrdersList } from './Orders.actions';
import { getOrderDetails } from '../../OrderDetails/container/OrderDetails.actions';
import { getLabels } from '../../Account/container/Account.selectors';

/**
 * This component will render OrdersContainer component
 * @param { object, Array }
 */
export class OrdersContainer extends PureComponent {
  componentDidMount() {
    const { fetchOrders, ordersListItems, getOrderDetailsAction } = this.props;
    fetchOrders(getSiteId());
    if (ordersListItems && ordersListItems.orders && ordersListItems.orders.length > 0) {
      const payload = {
        orderId: ordersListItems.orders[0].orderNumber,
      };
      getOrderDetailsAction(payload);
    }
  }

  componentDidUpdate(prevProps) {
    const { ordersListItems, getOrderDetailsAction } = this.props;
    if (
      !prevProps.ordersListItems &&
      ordersListItems &&
      ordersListItems.orders &&
      ordersListItems.orders.length > 0
    ) {
      const payload = {
        orderId: ordersListItems.orders[0].orderNumber,
      };
      getOrderDetailsAction(payload);
    }
  }

  /**
   * This function will trigger the to get country specific orders
   * @param {string, string} - siteId companyId
   */
  filterLinkHandler = (siteId, companyId) => {
    const { fetchOrders } = this.props;
    const payload = { siteId, currentSiteId: companyId };
    fetchOrders(payload);
  };

  render() {
    const {
      labels,
      ordersListItems,
      navigation,
      handleComponentChange,
      componentProps,
      orderItems,
      isMostRecentOrderFetching,
      isMostRecentOrderDetailFetching,
    } = this.props;
    const ordersListItemData = ordersListItems && ordersListItems.orders;

    return (
      <OrderListComponent
        labels={labels}
        onFilterLink={this.filterLinkHandler}
        ordersListItems={ordersListItemData}
        navigation={navigation}
        handleComponentChange={handleComponentChange}
        componentProps={componentProps}
        orderItems={orderItems}
        isMostRecentOrderFetching={isMostRecentOrderFetching}
        isMostRecentOrderDetailFetching={isMostRecentOrderDetailFetching}
      />
    );
  }
}

export const mapStateToProps = state => ({
  labels: getLabels(state),
  ordersListItems: getOrdersListState(state),
  orderItems: getAllItems(state),
  isMostRecentOrderFetching: getOrderListFetchingState(state),
  isMostRecentOrderDetailFetching: getOrderDetailsDataFetchingState(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchOrders: payload => {
    dispatch(getOrdersList(payload));
  },
  getOrderDetailsAction: payload => {
    dispatch(getOrderDetails(payload));
  },
});

OrdersContainer.propTypes = {
  fetchOrders: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]),
  navigation: PropTypes.shape({}).isRequired,
  handleComponentChange: PropTypes.func,
  componentProps: PropTypes.shape({}),
  orderItems: PropTypes.shape([]),
  getOrderDetailsAction: PropTypes.func.isRequired,
  isMostRecentOrderFetching: PropTypes.bool,
  isMostRecentOrderDetailFetching: PropTypes.bool,
};

OrdersContainer.defaultProps = {
  fetchOrders: () => {},
  ordersListItems: [],
  handleComponentChange: () => {},
  componentProps: {},
  orderItems: [],
  isMostRecentOrderFetching: false,
  isMostRecentOrderDetailFetching: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainer);
