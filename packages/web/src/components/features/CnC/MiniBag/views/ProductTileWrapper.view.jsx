import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import RemoveSoldOut from '@tcp/core/src/components/features/CnC/common/molecules/RemoveSoldOut/views/RemoveSoldOut.view';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss from '../styles/ProductTileWrapper.style';

const ProductTileWrapper = props => {
  const { orderItems, bagLabels, labels, pageView, isUserLoggedIn } = props;
  if (orderItems && orderItems.size > 0) {
    return (
      <div className="miniBagWrapper">
        <ErrorMessage error="There’s a problem with your order." />
        <RemoveSoldOut />
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
