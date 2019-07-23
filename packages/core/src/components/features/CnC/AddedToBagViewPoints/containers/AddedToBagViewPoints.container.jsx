import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../../AddedToBag/container/AddedToBag.actions';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import { getCartOrderList } from '../../AddedToBag/container/AddedToBag.selectors';

class AddedToBagViewPointsContainer extends React.Component {
  componentDidMount = () => {
    const { getOrderDetailsAction } = this.props;
    getOrderDetailsAction();
  };

  render() {
    const { getOrderPointsSummary } = this.props;
    let pointsSummary = {};
    if (getOrderPointsSummary.orderDetails) {
      const {
        orderItems,
        pointsToNextReward,
        userPoints,
        subTotal,
      } = getOrderPointsSummary.orderDetails;
      pointsSummary = {
        itemPrice: (orderItems[0] && orderItems[0].itemPrice) || 0,
        itemPoints: (orderItems && orderItems[0] && orderItems[0].itemPoints) || 0,
        pointsToNextReward,
        userPoints: userPoints || 0,
        subTotal,
        totalItems: (orderItems && orderItems.length) || 0,
      };
    }
    return <AddedToBagViewPoints pointsSummary={pointsSummary} />;
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getOrderDetailsAction: () => {
      dispatch(getOrderDetails());
    },
  };
}

function mapStateToProps(state) {
  return {
    getOrderPointsSummary: getCartOrderList(state),
  };
}

AddedToBagViewPointsContainer.propTypes = {
  getOrderDetailsAction: PropTypes.func.isRequired,
  getOrderPointsSummary: PropTypes.shape,
};

AddedToBagViewPointsContainer.defaultProps = {
  getOrderPointsSummary: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagViewPointsContainer);
