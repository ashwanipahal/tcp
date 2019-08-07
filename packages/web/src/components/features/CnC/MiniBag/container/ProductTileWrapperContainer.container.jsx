import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCartOrderList,
  getLabelsCartItemTile,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import { getOrderDetails } from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.actions';
import ProductTileWrapper from '../views/ProductTileWrapper.view';

export class ProductTileWrapperContainer extends React.Component {
  componentDidMount = () => {
    const { initialActions } = this.props;
    initialActions();
  };

  render() {
    const { orderItems } = this.props;
    if (orderItems && orderItems.size > 0) {
      return <ProductTileWrapper {...this.props} />;
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
    initialActions: () => {
      dispatch(getOrderDetails());
    },
  };
};

ProductTileWrapperContainer.defaultProps = {
  orderItems: [],
};

ProductTileWrapperContainer.propTypes = {
  orderItems: PropTypes.shape({}),
  initialActions: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductTileWrapperContainer);
