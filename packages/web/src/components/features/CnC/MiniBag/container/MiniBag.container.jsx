import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCartOrderList,
  getLabelsCartItemTile,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { getOrderDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.actions';
import MiniBagView from '../views/MiniBag.view';

export class MiniBagContainer extends React.Component {
  componentDidMount = () => {
    const { getOrderDetailsApi } = this.props;
    getOrderDetailsApi();
  };

  render() {
    const { orderItems } = this.props;
    if (orderItems && orderItems.size > 0) {
      return <MiniBagView {...this.props} />;
    }
    return <div />;
  }
}

const mapStateToProps = state => {
  return {
    orderItems: getCartOrderList(state),
    labels: getLabelsCartItemTile(state),
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    getOrderDetailsApi: () => {
      dispatch(getOrderDetails());
    },
  };
};

MiniBagContainer.defaultProps = {
  orderItems: [],
};

MiniBagContainer.propTypes = {
  orderItems: PropTypes.shape({}),
  getOrderDetailsApi: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiniBagContainer);
