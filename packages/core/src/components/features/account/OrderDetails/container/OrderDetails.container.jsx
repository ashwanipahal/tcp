import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OrderDetailsView from '../views';
import { getOrderDetails } from './OrderDetails.actions';
import { getOrderDetailsDataState, getOrdersLabels, getOrderId } from './OrderDetails.selectors';
import { isMobileApp } from '../../../../../utils';

/**
 * This Class component use for return the Order Details data
 * can be passed in the component.
 * @param state - initial state of selectedActivity set to be null
 */
export class OrderDetailsContainer extends PureComponent {
  componentDidMount() {
    const {
      getOrderDetailsAction,
      router: { query },
      navigation,
    } = this.props;

    if (isMobileApp()) {
      const orderId = navigation.getParam('orderId');
      getOrderDetailsAction({ orderId });
    } else {
      const { orderId } = query;
      getOrderDetailsAction({ orderId });
    }
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { orderId, orderDetailsData, ordersLabels } = this.props;
    return (
      <OrderDetailsView
        orderDetailsData={orderDetailsData}
        ordersLabels={ordersLabels}
        orderId={orderId}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getOrderDetailsAction: payload => {
      dispatch(getOrderDetails(payload));
    },
  };
};

export const mapStateToProps = state => {
  return {
    orderId: getOrderId(state),
    orderDetailsData: getOrderDetailsDataState(state),
    ordersLabels: getOrdersLabels(state),
  };
};

OrderDetailsContainer.propTypes = {
  orderId: PropTypes.string,
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
  getOrderDetailsAction: PropTypes.func.isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({}),
  }),
  navigation: PropTypes.shape({}),
};

OrderDetailsContainer.defaultProps = {
  orderId: '',
  router: {
    query: {},
  },
  ordersLabels: {},
  orderDetailsData: {},
  navigation: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsContainer);
