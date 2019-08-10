import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCartOrderList, getLabelsCartItemTile } from '../../../container/CartItemTile.selectors';
import BAG_PAGE_ACTIONS from '../../../../BagPage/container/BagPage.actions';
import CartItemTileWrapper from '../views/CartItemTileWrapper.view';

export class CartItemTileWrapperContainer extends React.Component {
  componentDidMount = () => {
    const { initialActions } = this.props;
    initialActions();
  };

  render() {
    const { orderItems } = this.props;
    if (orderItems && orderItems.size > 0) {
      return <CartItemTileWrapper {...this.props} />;
    }
    return null;
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
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
    },
  };
};

CartItemTileWrapperContainer.defaultProps = {
  orderItems: [],
};

CartItemTileWrapperContainer.propTypes = {
  orderItems: PropTypes.shape({}),
  initialActions: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartItemTileWrapperContainer);
