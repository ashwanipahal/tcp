import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { isMobileApp } from '@tcp/core/src/utils';
import OrderDetailsView from '../views';
import { getOrderDetails } from './OrderDetails.actions';
import {
  getOrderDetailsDataState,
  getOrdersLabels,
  getOrderDetailsDataFetchingState,
} from './OrderDetails.selectors';
import { getUserLoggedInState } from '../../User/container/User.selectors';
/**
 * This Class component use for return the Order Details data
 * can be passed in the component.
 * @param state - initial state of selectedActivity set to be null
 */
export class OrderDetailsContainer extends PureComponent {
  componentDidMount() {
    const { getOrderDetailsAction, orderId, emailAddress, orderDetailsData } = this.props;
    const payload = {
      orderId,
      emailAddress,
    };

    if (
      orderId &&
      !isMobileApp() &&
      (!orderDetailsData || (orderDetailsData && orderDetailsData.orderNumber !== orderId))
    ) {
      getOrderDetailsAction(payload);
    }
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const {
      orderId,
      orderDetailsData,
      ordersLabels,
      navigation,
      isFetching,
      isLoggedIn,
    } = this.props;
    return (
      <OrderDetailsView
        orderDetailsData={orderDetailsData}
        ordersLabels={ordersLabels}
        orderId={orderId}
        navigation={navigation}
        isFetching={isFetching}
        isLoggedIn={isLoggedIn}
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

export const mapStateToProps = (state, ownProps) => {
  return {
    orderId: ownProps.router.query.orderId,
    emailAddress: ownProps.router.query.emailAddress,
    orderDetailsData: getOrderDetailsDataState(state),
    ordersLabels: getOrdersLabels(state),
    isFetching: getOrderDetailsDataFetchingState(state),
    isLoggedIn: getUserLoggedInState(state),
  };
};

OrderDetailsContainer.propTypes = {
  emailAddress: PropTypes.string,
  orderId: PropTypes.string,
  orderDetailsData: PropTypes.shape({}),
  ordersLabels: PropTypes.shape({}),
  getOrderDetailsAction: PropTypes.func.isRequired,
  navigation: PropTypes.shape({}),
  isFetching: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

OrderDetailsContainer.defaultProps = {
  emailAddress: '',
  orderId: '',
  ordersLabels: {},
  orderDetailsData: {},
  navigation: {},
  isFetching: false,
  isLoggedIn: false,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsContainer);
