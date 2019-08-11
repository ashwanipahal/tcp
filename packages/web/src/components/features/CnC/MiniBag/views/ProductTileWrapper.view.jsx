import React from 'react';
import PropTypes from 'prop-types';
import ProductTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';

const ProductTileWrapper = props => {
  const { orderItems, labels } = props;
  return (
    <div className="miniBagWrapper">
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
