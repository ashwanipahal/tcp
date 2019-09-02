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
import productTileCss, {
  customStyles,
  miniBagCSS,
  bagTileCSS,
} from '../styles/ProductTileWrapper.style';
import CARTPAGE_CONSTANTS from '../../../CartItemTile.constants';
import RemoveSoldOut from '../../../../common/molecules/RemoveSoldOut';

class ProductTileWrapper extends React.PureComponent<props> {
  constructor(props) {
    super(props);
    this.state = {
      isEditAllowed: true,
      openedTile: 0,
      swipedElement: null,
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

  setSwipedElement = elem => {
    this.setState({ swipedElement: elem });
  };

  getHeaderError = (labels, orderItems, pageView) => {
    const styles = pageView === 'myBag' ? bagTileCSS : customStyles;
    if (orderItems && orderItems.size > 0) {
      const showError = orderItems.find(tile => {
        const productDetail = getProductDetails(tile);
        return (
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_SOLDOUT ||
          productDetail.miscInfo.availability === CARTPAGE_CONSTANTS.AVAILABILITY_UNAVAILABLE
        );
      });
      return showError && <ErrorMessage customClass={styles} error={labels.problemWithOrder} />;
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
        onClick={() => removeCartItem(getUnavailableOOSItems)}
      >
        <u>remove</u>
      </BodyCopy>
    );

    remove.splice(1, 0, newRemove);
    return remove;
  };

  setSelectedProductTile = ({ index }) => {
    this.setState({ openedTile: index });
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
    const { isEditAllowed, openedTile, swipedElement } = this.state;
    if (orderItems && orderItems.size > 0) {
      const orderItemsView = orderItems.map((tile, index) => {
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
            itemIndex={index}
            openedTile={openedTile}
            setSelectedProductTile={this.setSelectedProductTile}
            setSwipedElement={this.setSwipedElement}
            swipedElement={swipedElement}
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
