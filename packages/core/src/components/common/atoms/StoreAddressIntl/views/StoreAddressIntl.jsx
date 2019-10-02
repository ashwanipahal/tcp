import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import style, { StoreName, StoreLocation, ShopInShop } from '../styles/StoreAddressIntl.style';

const StoreAddressIntl = ({
  className,
  children,
  storeName,
  storeLocation,
  isShopInShop,
  labels,
}) => (
  <div className={className}>
    <StoreName>{storeName}</StoreName>
    {isShopInShop && <ShopInShop>{labels.lbl_storelist_shop_in_shop}</ShopInShop>}
    <StoreLocation>{storeLocation}</StoreLocation>
    {children}
  </div>
);

StoreAddressIntl.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  storeName: PropTypes.string.isRequired,
  storeLocation: PropTypes.string.isRequired,
  isShopInShop: PropTypes.bool,
  labels: PropTypes.shape({
    lbl_storelist_shop_in_shop: PropTypes.string,
  }).isRequired,
};

StoreAddressIntl.defaultProps = {
  children: null,
  isShopInShop: false,
};

export default withStyles(StoreAddressIntl, style);
