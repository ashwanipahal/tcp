/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import ReactToolTip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import { getIconPath } from '../../../../../../../utils';
import { Image } from '../../../../../../common/atoms';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import withStyles from '../../../../../../common/hoc/withStyles';
import styles from '../styles/OrderLedger.style';

const OrderLedger = ({
  className,
  itemsCount,
  currencySymbol,
  subTotal,
  couponsTotal,
  savingsTotal,
  shippingTotal,
  taxesTotal,
  grandTotal,
  giftCardsTotal,
  orderBalanceTotal,
  totalOrderSavings,
  labels,
}) => {
  return (
    <React.Fragment>
      <Grid className={className}>
        <Row className="items-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontSemilBoldFamily"
              textAlign="left"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`${labels.itemsLabel} (${itemsCount}):`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontSemilBoldFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${subTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        {couponsTotal ? (
          <Row className="coupons-total rowMargin">
            <Col colSize={{ large: 6, medium: 4, small: 3 }}>
              <BodyCopy
                bodySize="one"
                color="primary"
                fontFamily="secondaryFontFamily"
                fontWeight="bold"
                fontSize="fs16"
              >
                {`${labels.couponsLabel}:`}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 6, medium: 4, small: 3 }}>
              <BodyCopy
                bodySize="one"
                color="primary"
                fontFamily="secondaryFontFamily"
                fontWeight="bold"
                fontSize="fs16"
                textAlign="right"
              >
                {`-${currencySymbol}${couponsTotal.toFixed(2)}`}
              </BodyCopy>
            </Col>
          </Row>
        ) : null}
        {savingsTotal ? (
          <Row className="promotions-total rowMargin">
            <Col colSize={{ large: 6, medium: 4, small: 3 }}>
              <BodyCopy
                bodySize="one"
                color="primary"
                fontFamily="secondaryFontFamily"
                fontWeight="bold"
                fontSize="fs16"
              >
                {`${labels.promotionsLabel}`}
              </BodyCopy>
            </Col>
            <Col colSize={{ large: 6, medium: 4, small: 3 }}>
              <BodyCopy
                bodySize="one"
                color="primary"
                fontFamily="secondaryFontFamily"
                fontWeight="bold"
                fontSize="fs16"
                textAlign="right"
              >
                {`-${currencySymbol}${savingsTotal.toFixed(2)}`}
              </BodyCopy>
            </Col>
          </Row>
        ) : null}
        <Row className="shipping-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`${labels.shippingLabel}:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {/* eslint-disable-next-line no-nested-ternary */}
              {shippingTotal !== undefined
                ? { shippingTotal } > 0
                  ? `${currencySymbol}${shippingTotal.toFixed(2)}`
                  : 'Free'
                : '-'}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="tax-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`${labels.taxLabel}:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${taxesTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        {giftCardsTotal > 0
          ? <Row className="estimated-total rowMargin">
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <BodyCopy
                  bodySize="one"
                  color="primary"
                  fontFamily="secondaryFontFamily"
                  fontWeight="bold"
                  fontSize="fs16"
                >
                  {`${labels.totalLabel}:`}
                </BodyCopy>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <BodyCopy
                  bodySize="one"
                  color="primary"
                  fontFamily="secondaryFontFamily"
                  fontWeight="bold"
                  fontSize="fs16"
                  textAlign="right"
                >
                  {`${currencySymbol}${grandTotal.toFixed(2)}`}
                </BodyCopy>
              </Col>
            </Row>(
              <Row className="giftCard-total rowMargin">
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondaryFontFamily"
                    fontWeight="bold"
                    fontSize="fs16"
                  >
                    {`${labels.giftcardsLabel}:`}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondaryFontFamily"
                    fontWeight="bold"
                    fontSize="fs16"
                    textAlign="right"
                  >
                    {`-${currencySymbol}${giftCardsTotal.toFixed(2)}`}
                  </BodyCopy>
                </Col>
              </Row>
            )
          : null}
        <Row className="balance-total rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="black"
              fontSize="fs18"
            >
              {giftCardsTotal ? `${labels.balanceLabel}:` : `${labels.totalLabel}:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="black"
              fontSize="fs18"
              textAlign="right"
            >
              {`${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
        <Row className="total-order-savings rowMargin">
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
            >
              {`${labels.totalSavingsLabel}`}
              <ReactToolTip id="tool" direction="top" message={labels.tooltipText}>
                <Image alt="info" className="circle-info-image" src={getIconPath(`info-icon`)} />
              </ReactToolTip>
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 4, small: 3 }}>
            <BodyCopy
              bodySize="one"
              color="primary"
              fontFamily="secondaryFontFamily"
              fontWeight="bold"
              fontSize="fs16"
              textAlign="right"
            >
              {`${currencySymbol}${totalOrderSavings.toFixed(2)}`}
            </BodyCopy>
          </Col>
        </Row>
      </Grid>
    </React.Fragment>
  );
};

OrderLedger.propTypes = {
  className: PropTypes.string.isRequired,
  /** Number of items in the cart. */
  itemsCount: PropTypes.number.isRequired,

  /** Total estimation, before applying taxes */
  grandTotal: PropTypes.number,
  /** Flag if the total prop will be receiving an estimated total or a final total */
  // FIXME: we should have a single "Estimated" flag and reuse it accordanly across all estimated values
  // isTotalEstimated: PropTypes.bool.isRequired,

  /** Total savings applied in the cart */
  savingsTotal: PropTypes.number,

  /** Subtotal price of the items, before taxes, shipping, etc. */
  subTotal: PropTypes.number,
  /**
   * Total cost of taxes. If it's value is undefined, corresponding line will
   * only be shown if the isShowUndefinedTax prop is true.
   */
  taxesTotal: PropTypes.number,

  /** Total discount coming from coupons. */
  couponsTotal: PropTypes.number,
  /**
   * Total cost of shipping. If it's value is 0, the 'Free' copy will be
   * shown. If it's undefined, corresponding line won't be rendered.
   */
  shippingTotal: PropTypes.number,
  /**
   * Total discount of gift cards applied. If it's value is falsy,
   * corresponding line won't be rendered.
   */
  giftCardsTotal: PropTypes.number,

  /** Flags if the tax line should be rendered even when the taxesTotal prop value is undefined */
  // isShowUndefinedTax: PropTypes.bool,
  /** Flag if shipping should be shown in the ledger */
  // isShowShipping: PropTypes.bool,
  /** Flags if the order has items for shipping */
  // isOrderHasShipping: PropTypes.bool.isRequired,
  /** This is used to display the correct currency symbol */
  currencySymbol: PropTypes.string.isRequired,

  orderBalanceTotal: PropTypes.number,
  totalOrderSavings: PropTypes.number,
  labels: PropTypes.shape({}),
  /** Flag indicates whether cart savings section will display */
  // isDisplayCartSavings: PropTypes.bool,
  /** Flag indicates whether the current page is Cart */
  // eslint-disable-next-line extra-rules/no-commented-out-code
  /* isCartPage: PropTypes.bool */
};

OrderLedger.defaultProps = {
  couponsTotal: 0,
  savingsTotal: 0,
  shippingTotal: 0,
  taxesTotal: 0,
  grandTotal: 0,
  giftCardsTotal: 0,
  orderBalanceTotal: 0,
  totalOrderSavings: 0,
  subTotal: 0,
  labels: {},
};
export default withStyles(OrderLedger, styles);
export { OrderLedger as OrderLedgerVanilla };
