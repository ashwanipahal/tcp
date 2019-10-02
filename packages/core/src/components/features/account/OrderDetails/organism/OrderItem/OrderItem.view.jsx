import React from 'react';
import PropTypes from 'prop-types';
import { Image, BodyCopy, Row, Col, Anchor } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getIconPath } from '@tcp/core/src/utils';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import styles from './styles/OrderItem.style';

/**
 * This function component use for return the EarnPoints
 * can be passed in the component.
 * @param waysToEarn - waysToEarn object used for showing extra points details
 */

const OrderItems = ({ className, ...otherProps }) => {
  /**
   * @function return  Used to render the JSX of the component
   * @param    {[Void]} function does not accept anything.
   * @return   {[Object]} JSX of the component
   */

  console.log('console testing---------------');
  console.log(otherProps);
  console.log('console testing---------------');

  const {
    item: {
      productInfo: { name, imagePath, color, fit, size, upc, pdpUrl },
      itemInfo: { linePrice, itemBrand, quantity, quantityCanceled, listPrice, offerPrice },
    },
    currencySymbol,
    isCanceledList,
    isShowWriteReview,
    OrdersLabels
  } = otherProps;

  // const idemListAndOfferPrice = listPrice === offerPrice;

  return (
    <BodyCopy component="div" className={className}>
      <Row fullBleed>
        <Col colSize={{ large: 2, medium: 2, small: 2 }}>
          <BodyCopy component="div">
            <Image src={imagePath} data-locator="order_item_image" />
          </BodyCopy>
          <BodyCopy component="div">
            <Image
              alt={itemBrand}
              className="brand-image"
              src={
                itemBrand === 'TCP'
                  ? getIconPath(`header__brand-tab--tcp`)
                  : getIconPath('header__brand-tab-gymboree')
              }
              data-locator="order_item_brand_logo"
            />
          </BodyCopy>
        </Col>

        <Col colSize={{ large: 10, medium: 6, small: 4 }} className="elem-ml-MED">
          <BodyCopy component="div" fontSize="fs14" fontWeight="black" fontFamily="secondary">
            {name}
          </BodyCopy>

          <BodyCopy component="div" fontSize="fs14" fontFamily="secondary" className="elem-mt-SM">
            {getLabelValue(OrdersLabels, 'lbl_orderDetails_upc')}
            {upc}
          </BodyCopy>
          <BodyCopy component="div" fontSize="fs14" fontFamily="secondary">
            {getLabelValue(OrdersLabels, 'lbl_orderDetails_color')}
            {color.name}
          </BodyCopy>

          <BodyCopy component="div" fontSize="fs14" fontFamily="secondary">
            <BodyCopy
              component="span"
              fontSize="fs14"
              fontFamily="secondary"
              className="elem-mr-XL"
            >
              {getLabelValue(OrdersLabels, 'lbl_orderDetails_fit')}
              {fit}
            </BodyCopy>
            {size && (
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_size')}
                {size}
              </BodyCopy>
            )}
          </BodyCopy>

          <BodyCopy component="div" className="elem-mt-SM itemInfo_details">
            <BodyCopy component="div" className="itemInfo_details_items">
              <BodyCopy component="span" fontSize="fs14" fontWeight="black" fontFamily="secondary">
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_price')}
              </BodyCopy>
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                {currencySymbol}
                {listPrice.toFixed(2)}
              </BodyCopy>
            </BodyCopy>

            <BodyCopy component="div" className="itemInfo_details_items">
              <BodyCopy component="span" fontSize="fs14" fontWeight="black" fontFamily="secondary">
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_youPaid')}
              </BodyCopy>
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                {currencySymbol}
                {offerPrice.toFixed(2)}
              </BodyCopy>
            </BodyCopy>

            <BodyCopy component="div" className="itemInfo_details_items">
              <BodyCopy component="span" fontSize="fs14" fontWeight="black" fontFamily="secondary">
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_quantity')}
              </BodyCopy>
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                {quantity}
              </BodyCopy>
            </BodyCopy>
            <BodyCopy component="div" className="itemInfo_details_items">
              <BodyCopy component="span" fontSize="fs14" fontWeight="black" fontFamily="secondary">
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_subTotal')}
              </BodyCopy>
              <BodyCopy component="span" fontSize="fs14" fontFamily="secondary">
                {currencySymbol}
                {(linePrice || 0).toFixed(2)}
              </BodyCopy>
            </BodyCopy>
            {/* {isShowWriteReview && ( */}
            <BodyCopy component="div" fontSize="fs14" fontWeight="black" fontFamily="secondary">
              <Anchor
                url={pdpUrl}
                target="_blank"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
              >
                {getLabelValue(OrdersLabels, 'lbl_orderDetails_writeReview')}

              </Anchor>
            </BodyCopy>
            {/* )} */}
          </BodyCopy>
        </Col>
      </Row>
    </BodyCopy>
  );
};
OrderItems.propTypes = {
  className: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  isBopisOrder: PropTypes.bool.isRequired,
  orderGroup: PropTypes.shape({}).isRequired,
};

OrderItems.defaultProps = {
  className: '',
};

export default withStyles(OrderItems, styles);
export { OrderItems as OrderItemsVanilla };
