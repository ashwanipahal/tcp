import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import OrderDetailsView from '../views';
import { getOrderDetailsList } from './OrderDetails.actions';
import { getOrderDetailsDataState, getOrdersLabels } from './OrderDetails.selectors';

/**
 * This Class component use for return the Order Details data
 * can be passed in the component.
 * @param state - initial state of selectedActivity set to be null
 */
export class OrderDetailsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { getOrderDetailsListAction, orderId } = this.props;
    const payload = {
      orderId,
    };
    getOrderDetailsListAction(payload);
  }

  /**
   * @function render  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  render() {
    const { orderId, OrderDetailsData, OrdersLabels } = this.props;
    return (
      <OrderDetailsView
        OrderDetailsData={OrderDetailsData}
        OrdersLabels={OrdersLabels}
        orderId={orderId}
      />
    );
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    getOrderDetailsListAction: payload => {
      dispatch(getOrderDetailsList(payload));
    },
  };
};

export const mapStateToProps = (state, ownProps) => {
  return {
    orderId: ownProps.router.query.orderId,
    OrderDetailsData: getOrderDetailsDataState(state),
    OrdersLabels: getOrdersLabels(state),
  };
};

OrderDetailsContainer.propTypes = {
  orderId: PropTypes.string,
  OrderDetailsData: PropTypes.shape([]),
  OrdersLabels: PropTypes.shape([]),
  getOrderDetailsListAction: PropTypes.func.isRequired,
};

OrderDetailsContainer.defaultProps = {
  orderId: '',
  OrdersLabels: [],
  OrderDetailsData: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderDetailsContainer);
