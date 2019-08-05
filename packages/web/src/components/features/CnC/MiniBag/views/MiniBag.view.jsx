import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@tcp/core/src/components/common/molecules/Modal';
import ProductTile from '@tcp/core/src/components/features/CnC/CartItemTile/molecules/CartItemTile/views/CartItemTile.view';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import {
  getProductName,
  checkForGiftItem,
  getProductFit,
  getProductColor,
  getProductSize,
  getProductOfferPrice,
  getProductQty,
  getProductPoints,
  getProductBrand,
} from '@tcp/core/src/components/features/CnC/CartItemTile/container/CartItemTile.selectors';
import styles from '../styles/MiniBag.style';

const MiniBag = props => {
  const { onRequestClose, className, orderItems, labels } = props;
  return (
    <Modal
      isOpen
      onRequestClose={onRequestClose}
      heading="Mini BAG"
      overlayClassName="TCPModal__Overlay"
      className={`TCPModal__Content, ${className}`}
      closeIconDataLocator="mini-bg-close"
      aria={{
        labelledby: 'Mini Bag',
        describedby: 'Mini Bag Modal',
      }}
    >
      <div className="miniBagWrapper">
        {orderItems &&
          orderItems.size > 0 &&
          orderItems.map(tile => {
            const productDetail = {
              name: getProductName(tile),
              isGiftItem: checkForGiftItem(tile),
              fit: getProductFit(tile),
              color: getProductColor(tile),
              size: getProductSize(tile),
              price: getProductOfferPrice(tile),
              qty: getProductQty(tile),
              myPlacePoints: getProductPoints(tile),
              itemBrand: getProductBrand(tile),
            };
            return (
              <ProductTile
                labels={labels}
                productDetail={productDetail}
                key={`${getProductName(tile)}`}
              />
            );
          })}
      </div>
    </Modal>
  );
};

MiniBag.propTypes = {
  className: PropTypes.string.isRequired,
  orderItems: PropTypes.shape([]).isRequired,
  onRequestClose: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
};

export default withStyles(MiniBag, styles);
export { MiniBag as MiniBagVanilla };
