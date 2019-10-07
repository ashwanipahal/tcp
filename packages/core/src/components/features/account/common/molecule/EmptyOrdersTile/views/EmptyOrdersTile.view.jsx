import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import utils from '@tcp/core/src/utils';
// import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
// import styles from '../styles/EmptyOrdersTile.styles';
import internalEndpoints from '../../../internalEndpoints';

const goToHomePage = () => {
  utils.routerPush(internalEndpoints.shopNowPage.link, internalEndpoints.shopNowPage.path);
  return null;
};

export const EmptyOrderTile = ({ labels }) => {
  return (
    <BodyCopy className="elem-mb-XXL">
      <Col
        colSize={{
          small: 6,
          large: 12,
          medium: 8,
        }}
      >
        <BodyCopy fontFamily="secondary" fontSize="fs14" fontWeight="regular">
          {getLabelValue(labels, 'lbl_ordersTile_noOrderYet', 'orders')}
        </BodyCopy>
      </Col>
      <BodyCopy component="div" className="elem-mt-LRG">
        <Button
          buttonVariation="fixed-width"
          fill="WHITE"
          color="GRAY"
          className="shop-now-btn"
          onClick={goToHomePage}
          data-locator="orders-shop-now-btn"
        >
          {getLabelValue(labels, 'lbl_orders_shopNow', 'orders')}
        </Button>
      </BodyCopy>
    </BodyCopy>
  );
};

EmptyOrderTile.propTypes = {
  labels: PropTypes.shape({}),
};

EmptyOrderTile.defaultProps = {
  labels: {},
};

export default EmptyOrderTile;
