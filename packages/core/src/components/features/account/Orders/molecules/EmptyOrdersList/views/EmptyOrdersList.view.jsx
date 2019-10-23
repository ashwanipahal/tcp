import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import { routerPush } from '@tcp/core/src/utils';
import internalEndpoints from '../../../../common/internalEndpoints';

/**
 * This function will handle click to go to homepage
 * @param {} -
 */
const goToHomePage = () => {
  routerPush(internalEndpoints.shopNowPage.link, internalEndpoints.shopNowPage.path);
  return null;
};

/**
 * This component will render EmptyOrdersList component
 * @param { string, object }
 */
export const EmptyOrdersList = ({ className, labels }) => {
  return (
    <BodyCopy className={className}>
      <BodyCopy
        dataLocator="orders-no-order-info"
        fontFamily="secondary"
        fontSize="fs14"
        component="p"
        fontWeight="semibold"
        className="elem-mt-LRG elem-mb-LRG"
      >
        {getLabelValue(labels, 'lbl_orders_emptySupportingText', 'orders')}
      </BodyCopy>
      <Col
        colSize={{
          small: 6,
          large: 3,
          medium: 3,
        }}
      >
        <Button
          buttonVariation="fixed-width"
          fill="BLUE"
          color="white"
          onClick={goToHomePage}
          data-locator="orders-shop-now-btn"
        >
          {getLabelValue(labels, 'lbl_orders_shopNow', 'orders')}
        </Button>
      </Col>
    </BodyCopy>
  );
};

EmptyOrdersList.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

EmptyOrdersList.defaultProps = {
  className: '',
};

export default EmptyOrdersList;
