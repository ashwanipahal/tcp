import React from 'react';
import PropTypes from 'prop-types';
import { Image, BodyCopy, Row, Col } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getIconPath } from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from '../styles/OrderPreviewItem.style';

/**
 * This function component use for return the OrderItems
 * can be passed in the component.
 * @param otherProps - otherProps object used pass params to other component
 */

const OrderPreviewItem = ({ ...otherProps }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  const {
    item: {
      productInfo: { name, imagePath },
      itemInfo: { itemBrand, quantity, quantityCanceled },
      trackingInfo,
    },
    isCanceledList,
    labels,
    className,
  } = otherProps;
  return (
    <>
      {!!otherProps && (
        <BodyCopy className={className} component="div">
          <Row className="row-stlyler">
            <Col colSize={{ large: 2, medium: 2, small: 2 }}>
              <BodyCopy component="div" className="image-sizing">
                <Image src={imagePath} className="image-sizing" data-locator="order_item_image" />
              </BodyCopy>
              <BodyCopy component="div">
                {itemBrand && (
                  <Image
                    alt={itemBrand}
                    className="brand-image"
                    src={
                      itemBrand === 'GYM'
                        ? getIconPath('header__brand-tab-gymboree')
                        : getIconPath(`header__brand-tab--tcp`)
                    }
                    data-locator="order_item_brand_logo"
                  />
                )}
              </BodyCopy>
            </Col>
            <Col
              colSize={{ large: 9, medium: 5, small: 4 }}
              ignoreGutter={{ small: true, medium: true, large: true }}
              offsetLeft={{ medium: 1, large: 1 }}
              className="elem-mr-MED"
            >
              <BodyCopy component="div" className="product-name">
                <BodyCopy
                  component="div"
                  fontSize="fs14"
                  fontWeight="extrabold"
                  fontFamily="secondary"
                  className="product-name"
                >
                  {name}
                </BodyCopy>
              </BodyCopy>

              <BodyCopy
                component="div"
                fontSize="fs14"
                fontFamily="secondary"
                fontWeight="regular"
                className="quantity-spacing"
              >
                {getLabelValue(labels, 'lbl_orderDetails_quantity', 'orders')}
                <span>
                  <BodyCopy
                    component="span"
                    fontSize="fs14"
                    className="itemInfo_details_items_leftMargin"
                    fontFamily="secondary"
                  >
                    {isCanceledList ? quantityCanceled : quantity}
                  </BodyCopy>
                </span>
              </BodyCopy>

              <BodyCopy
                component="div"
                fontSize="fs14"
                fontWeight="regular"
                fontFamily="secondary"
                className="status-spacing"
              >
                {getLabelValue(labels, 'lbl_orders_orderStatus', 'orders')}
                <span>:</span>
                <span>
                  <BodyCopy
                    component="span"
                    fontSize="fs14"
                    className="itemInfo_details_items_leftMargin"
                    fontFamily="secondary"
                  >
                    {trackingInfo[0].status}
                  </BodyCopy>
                </span>
              </BodyCopy>
            </Col>
          </Row>
        </BodyCopy>
      )}
    </>
  );
};
OrderPreviewItem.propTypes = {
  className: PropTypes.string,
  orderGroup: PropTypes.shape({}).isRequired,
};

OrderPreviewItem.defaultProps = {
  className: '',
};

export default withStyles(OrderPreviewItem, styles);
