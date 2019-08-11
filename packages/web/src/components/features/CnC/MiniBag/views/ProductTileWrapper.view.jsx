import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss from '../styles/ProductTileWrapper.style';

const ProductTileWrapper = props => {
  const { orderItems, labels, pageView, isUserLoggedIn } = props;
  if (orderItems && orderItems.size > 0) {
    return (
      <div className="miniBagWrapper">
        {orderItems.map(tile => {
          const productDetail = getProductDetails(tile);

          return (
            <CartItemTile
              inheritedStyles={pageView === 'myBag' && productTileCss}
              labels={labels}
              productDetail={productDetail}
              key={`${getProductName(tile)}`}
              pageView={pageView}
            />
          );
        })}
      </div>
    );
  }
  return <EmptyBag isUserLoggedIn={isUserLoggedIn} />;
};

ProductTileWrapper.defaultProps = {
  pageView: '',
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  pageView: PropTypes.string,
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
