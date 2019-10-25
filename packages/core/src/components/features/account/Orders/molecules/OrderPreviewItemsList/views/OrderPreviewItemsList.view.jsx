import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import OrderPreviewItem from '../../OrderPreviewItem';
import internalEndpoints from '../../../../common/internalEndpoints';
/**
 * This function component use for return the Order item list based on group
 * can be passed in the component.
 * @param otherProps - otherProps object used for showing Order Item list
 */
const OrderPreviewItemsList = ({ className, ...otherProps }) => {
  const { items, orderNumber, trackingUrl, labels } = otherProps;
  const { orderPage } = internalEndpoints;
  return (
    <BodyCopy component="div" className={className}>
      <Row fullBleed className="elem-mb-SM">
        <Col colSize={{ large: 5, medium: 3, small: 6 }}>
          <Anchor
            to={trackingUrl}
            anchorVariation="button"
            buttonVariation="fixed-width"
            fill="BLUE"
            centered
            dataLocator={items.trackingNumber}
            target="_blank"
          >
            {getLabelValue(labels, 'lbl_orders_trackit', 'orders')}
          </Anchor>
        </Col>
      </Row>
      {items && (
        <Row fullBleed>
          {items.map((item, index) => (
            <Col className="order-Item" colSize={{ large: 6, medium: 4, small: 6 }}>
              <OrderPreviewItem
                labels={labels}
                key={index.toString()}
                {...{ item }}
                {...otherProps}
              />
            </Col>
          ))}
        </Row>
      )}
      <Row fullBleed className="elem-mt-SM">
        <Col colSize={{ large: 5, medium: 3, small: 6 }}>
          <Anchor
            to={orderPage.link}
            asPath={`${orderPage.path}/${orderNumber}`}
            anchorVariation="button"
            buttonVariation="fixed-width"
            fill="BLUE"
            centered
            target="_blank"
          >
            VIEW FULL ORDER DETAILS
          </Anchor>
        </Col>
      </Row>
    </BodyCopy>
  );
};
OrderPreviewItemsList.propTypes = {
  trackingNumber: PropTypes.string,
  trackingUrl: PropTypes.string,
  className: PropTypes.string,
  items: PropTypes.shape({}).isRequired,
  isCanceledList: PropTypes.arrayOf(PropTypes.shape({})),
  ordersLabels: PropTypes.shape({}).isRequired,
  orderDetailsData: PropTypes.shape({}).isRequired,
};

OrderPreviewItemsList.defaultProps = {
  trackingNumber: '',
  trackingUrl: '',
  className: '',
  isCanceledList: false,
};

export default OrderPreviewItemsList;
