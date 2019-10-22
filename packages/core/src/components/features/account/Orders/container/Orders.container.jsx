import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getOrdersListState from './Orders.selectors';
import { getOrderDetailsDataState } from '../../OrderDetails/container/OrderDetails.selectors';
import { getSiteId } from '../../../../../utils';
import OrderListComponent from '../views';
import { getOrdersList } from './Orders.actions';
import { getOrderDetails } from '../../OrderDetails/container/OrderDetails.actions';
import { getLabels } from '../../Account/container/Account.selectors';
import { API_CONFIG } from '../../../../../services/config';

/**
 * This component will render OrdersContainer component
 * @param { object, Array }
 */
export class OrdersContainer extends PureComponent {
  componentDidMount() {
    const { fetchOrders } = this.props;
    fetchOrders(getSiteId());
  }

  componentDidUpdate() {
    const { orderDetailsData, ordersListItems, getOrderDetailsAction } = this.props;
    if (
      !orderDetailsData &&
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
      orderDetailsData,
    } = this.props;
    const siteId = getSiteId();
    const ordersListItemData = ordersListItems && ordersListItems.orders;

    return (
      siteId !== API_CONFIG.siteIds.ca && (
        <OrderListComponent
          labels={labels}
          onFilterLink={this.filterLinkHandler}
          ordersListItems={ordersListItemData}
          navigation={navigation}
          handleComponentChange={handleComponentChange}
          componentProps={componentProps}
          orderDetailsData={orderDetailsData}
        />
      )
    );
  }
}

export const mapStateToProps = state => ({
  labels: getLabels(state),
  ordersListItems: getOrdersListState(state),
  orderDetailsData: getOrderDetailsDataState(state),
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
  orderDetailsData: PropTypes.shape({}),
  getOrderDetailsAction: PropTypes.func.isRequired,
};

OrdersContainer.defaultProps = {
  fetchOrders: () => {},
  ordersListItems: [],
  handleComponentChange: () => {},
  componentProps: {},
  orderDetailsData: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainer);
