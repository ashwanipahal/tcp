import React from 'react';
import PropTypes from 'prop-types';
//import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss from '../styles/ProductTileWrapper.style';

const ProductTileWrapper = props => {
  const { orderItems, bagLabels, labels, pageView, isUserLoggedIn } = props;

  return <EmptyBag bagLabels={bagLabels} isUserLoggedIn={isUserLoggedIn} />;
};

ProductTileWrapper.defaultProps = {
  pageView: '',
  bagLabels: {},
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  pageView: PropTypes.string,
  bagLabels: PropTypes.shape(),
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
