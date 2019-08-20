import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import RemoveSoldOut from '@tcp/core/src/components/features/CnC/common/molecules/RemoveSoldOut/views/RemoveSoldOut.view';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss, { customStyles } from '../styles/ProductTileWrapper.style';

class ProductTileWrapper extends React.PureComponent<props> {
  constructor(props) {
    super(props);
    this.state = {
      isEditAllowed: true,
    };
  }

  toggleEditAllowance = () => {
    const { isEditAllowed } = this.state;
    this.setState({
      isEditAllowed: !isEditAllowed,
    });
  };

  render() {
    const { orderItems, bagLabels, labels, pageView, isUserLoggedIn, isPlcc } = this.props;
    let isAvailable = false;
    const { isEditAllowed } = this.state;
    if (orderItems && orderItems.size > 0) {
      return (
        <div className="miniBagWrapper">
          {(isAvailable === 'SOLDOUT' || isAvailable === 'UNAVAILABLE') && (
            <>
              <ErrorMessage customClass={customStyles} error={labels.problemWithOrder} />
              <RemoveSoldOut labels={labels} />
            </>
          )}
          {orderItems.map(tile => {
            const productDetail = getProductDetails(tile);
            isAvailable = productDetail.miscInfo.store;
            return (
              <CartItemTile
                inheritedStyles={pageView === 'myBag' && productTileCss}
                labels={labels}
                productDetail={productDetail}
                key={`${getProductName(tile)}`}
                pageView={pageView}
                toggleEditAllowance={this.toggleEditAllowance}
                isEditAllowed={isEditAllowed}
                isPlcc={isPlcc}
              />
            );
          })}
        </div>
      );
    }
    return <EmptyBag bagLabels={bagLabels} isUserLoggedIn={isUserLoggedIn} />;
  }
}

ProductTileWrapper.defaultProps = {
  pageView: '',
  bagLabels: {},
};

ProductTileWrapper.propTypes = {
  orderItems: PropTypes.shape([]).isRequired,
  labels: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  pageView: PropTypes.string,
  bagLabels: PropTypes.shape(),
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
