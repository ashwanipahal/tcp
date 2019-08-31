import React from 'react';
import PropTypes from 'prop-types';
import CartItemTile from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.container';
import {
  getProductName,
  getProductDetails,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';

import { BodyCopy } from '@tcp/core/src/components/common/atoms';
import ErrorMessage from '@tcp/core/src/components/features/CnC/common/molecules/ErrorMessage';
import EmptyBag from '@tcp/core/src/components/features/CnC/EmptyBagPage/views/EmptyBagPage.view';
import productTileCss, { customStyles, miniBagCSS } from '../styles/ProductTileWrapper.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import RemoveSoldOut from '../../../../common/molecules/RemoveSoldOut';

class ProductTileWrapper extends React.PureComponent<props> {
  constructor(props) {
    super(props);
    this.state = {
      isEditAllowed: true,
    };
  }

  toggleEditAllowance = () => {
    const { isEditAllowed } = this.state;
    const { onItemEdit } = this.props;
    if (onItemEdit) {
      onItemEdit(isEditAllowed);
    }
    this.setState({
      isEditAllowed: !isEditAllowed,
    });
  };

  getHeaderError = (labels, orderItems) => {
    if (orderItems && orderItems.size > 0) {
      const showError = orderItems.find(tile => {
        const productDetail = getProductDetails(tile);
        return (
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT ||
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE
        );
      });
      return (
        showError && <ErrorMessage customClass={customStyles} error={labels.problemWithOrder} />
      );
    }
    return false;
  };

  getRemoveString = (labels, removeCartItem, getUnavailableOOSItems) => {
    const remove = labels.updateUnavailable.split('#remove#');
    const newRemove = (
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs12"
        component="span"
        className="removeErrorMessage"
        fontWeight="normal"
        onClick={() => removeCartItem(getUnavailableOOSItems)}
      >
        <u>remove</u>
      </BodyCopy>
    );
    remove.splice(1, 0, newRemove);
    return remove;
  };

  render() {
    const {
      orderItems,
      bagLabels,
      labels,
      pageView,
      removeCartItem,
      isUserLoggedIn,
      isPlcc,
    } = this.props;
    let isUnavailable;
    let isSoldOut;
    const inheritedStyles = pageView === 'myBag' ? productTileCss : miniBagCSS;
    const getUnavailableOOSItems = [];
    const { isEditAllowed } = this.state;
    if (orderItems && orderItems.size > 0) {
      const orderItemsView = orderItems.map(tile => {
        const productDetail = getProductDetails(tile);
        if (productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT) {
          getUnavailableOOSItems.push(productDetail.itemInfo.itemId);
          isSoldOut = true;
        }
        if (productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE) {
          getUnavailableOOSItems.push(productDetail.itemInfo.itemId);
          isUnavailable = true;
        }
        return (
          <CartItemTile
            inheritedStyles={inheritedStyles}
            labels={labels}
            productDetail={productDetail}
            key={`${getProductName(tile)}`}
            pageView={pageView}
            toggleEditAllowance={this.toggleEditAllowance}
            isEditAllowed={
              productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE ||
              productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT
                ? false
                : isEditAllowed
            }
            isPlcc={isPlcc}
          />
        );
      });
      return (
        <>
          {this.getHeaderError(labels, orderItems)}
          {isSoldOut && (
            <RemoveSoldOut
              labelForRemove={this.getRemoveString(labels, removeCartItem, getUnavailableOOSItems)}
            />
          )}
          {isUnavailable && <RemoveSoldOut labels={labels} />}

          {orderItemsView}
        </>
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
  removeCartItem: PropTypes.func.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  isPlcc: PropTypes.bool.isRequired,
  pageView: PropTypes.string,
  bagLabels: PropTypes.shape(),
};

export default ProductTileWrapper;
export { ProductTileWrapper as ProductTileWrapperVanilla };
