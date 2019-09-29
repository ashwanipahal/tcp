import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getOrdersListState from './Orders.selectors';
import { getSiteId } from '../../../../../utils';
import OrderListComponent from '../views';
import { getOrdersList } from './Orders.actions';
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
    const { labels, ordersListItems } = this.props;
    const siteId = getSiteId();
    const ordersListItemData = ordersListItems && ordersListItems.orders;

    return (
      siteId !== API_CONFIG.siteIds.ca && (
        <OrderListComponent
          labels={labels}
          onFilterLink={this.filterLinkHandler}
          ordersListItems={ordersListItemData}
        />
      )
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

OrdersContainer.propTypes = {
  fetchOrders: PropTypes.func,
  labels: PropTypes.shape({}).isRequired,
  ordersListItems: PropTypes.shape([]),
};

OrdersContainer.defaultProps = {
  fetchOrders: () => {},
  ordersListItems: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainer);
