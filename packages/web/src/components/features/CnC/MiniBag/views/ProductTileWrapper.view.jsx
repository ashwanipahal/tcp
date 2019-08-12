import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss from '../styles/ProductTileWrapper.style';

class ProductTileWrapper extends React.PureComponent<props> {
  // eslint-disable-next-line flowtype/no-types-missing-file-annotation
  constructor(props: Props) {
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
    const { orderItems, bagLabels, labels, pageView, isUserLoggedIn } = this.props;

    const { isEditAllowed } = this.state;
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
                toggleEditAllowance={this.toggleEditAllowance}
                isEditAllowed={isEditAllowed}
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
  pageView: PropTypes.string,
  bagLabels: PropTypes.shape(),
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
