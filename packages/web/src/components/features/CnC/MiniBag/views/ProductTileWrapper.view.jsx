import React from 'react';
import PropTypes from 'prop-types';
import ProductTile from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import RemoveSoldOut from '@tcp/core/src/components/features/CnC/common/molecules/RemoveSoldOut/views/RemoveSoldOut.view';

const ProductTileWrapper = props => {
  const { orderItems, labels } = props;
  return (
    <div className="miniBagWrapper">
      <ErrorMessage error="There’s a problem with your order." />
      <RemoveSoldOut />
      {orderItems &&
        orderItems.size > 0 &&
        orderItems.map(tile => {
          const productDetail = getProductDetails(tile);

          return (
            <ProductTile
              labels={labels}
              productDetail={productDetail}
              key={`${getProductName(tile)}`}
            />
          );
        })}
    </div>
  );
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
