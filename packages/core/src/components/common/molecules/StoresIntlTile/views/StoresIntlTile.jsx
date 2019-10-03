import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import StoreAddressIntl from '@tcp/core/src/components/common/atoms/StoreAddressIntl';
import { Row, Col } from '@tcp/core/src/components/common/atoms';
import style, { CountryName } from '../styles/StoresIntlTile.style';

const StoresIntlTile = ({ className, children, title, stores, labels }) =>
  !!stores.length && (
    <div className={className}>
      <CountryName>{title}</CountryName>
      <Row fullBleed>
        {stores.map(store => (
          <Col
            className="store-intl-item"
            colSize={{ small: 3, medium: 2, large: 2 }}
            key={store.storeName}
          >
            <StoreAddressIntl {...store} labels={labels} />
          </Col>
        ))}
      </Row>
      {children}
    </div>
  );

StoresIntlTile.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string.isRequired,
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      storeName: PropTypes.string,
      storeLocation: PropTypes.string,
      isShopInShop: PropTypes.bool,
    })
  ),
  labels: PropTypes.shape({
    lbl_storelist_shop_in_shop: PropTypes.string,
  }).isRequired,
};

StoresIntlTile.defaultProps = {
  children: null,
  stores: [],
};
export default withStyles(StoresIntlTile, style);
