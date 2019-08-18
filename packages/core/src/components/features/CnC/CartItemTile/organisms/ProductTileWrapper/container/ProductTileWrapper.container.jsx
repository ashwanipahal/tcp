import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getCartOrderList,
  getLabelsCartItemTile,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import {
  getUserLoggedInState,
  isPlccUser,
} from '@tcp/core/src/components/features/account/LoginPage/container/LoginPage.selectors';
import BAG_PAGE_ACTIONS from '@tcp/core/src/components/features/CnC/BagPage/container/BagPage.actions';
import ProductTileWrapper from '../views/ProductTileWrapper.view';

export class ProductTileWrapperContainer extends React.Component {
  componentDidMount = () => {
    const { initialActions } = this.props;
    initialActions();
  };

  render() {
    return <ProductTileWrapper {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    orderItems: getCartOrderList(state),
    labels: getLabelsCartItemTile(state),
    isUserLoggedIn: getUserLoggedInState(state),
    isPlcc: isPlccUser(state),
  };
};
export const mapDispatchToProps = dispatch => {
  return {
    initialActions: () => {
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
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
