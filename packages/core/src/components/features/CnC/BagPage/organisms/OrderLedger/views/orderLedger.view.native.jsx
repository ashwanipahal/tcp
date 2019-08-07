import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  StyledOrderLedger,
  StyledRowDataContainer,
  StyledText,
} from '../styles/orderLedger.style.native';

const OrderLedger = ({
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
    <StyledOrderLedger>
      <StyledRowDataContainer>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={`${labels.itemsLabel} (${itemsCount}):`}
          />
        </StyledText>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={`${currencySymbol}${subTotal.toFixed(2)}`}
          />
        </StyledText>
      </StyledRowDataContainer>
      {couponsTotal ? (
        <StyledRowDataContainer>
          <StyledText>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize="fs13"
              text={labels.couponsLabel}
            />
          </StyledText>
          <StyledText>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs13"
              textAlign="right"
              text={`-${currencySymbol}${couponsTotal.toFixed(2)}`}
            />
          </StyledText>
        </StyledRowDataContainer>
      ) : null}
      {savingsTotal ? (
        <StyledRowDataContainer>
          <StyledText>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize="fs13"
              text={labels.promotionsLabel}
            />
          </StyledText>
          <StyledText>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs13"
              textAlign="right"
              text={`-${currencySymbol}${savingsTotal.toFixed(2)}`}
            />
          </StyledText>
        </StyledRowDataContainer>
      ) : null}
      <StyledRowDataContainer>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={labels.shippingLabel}
          />
        </StyledText>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={
              shippingTotal !== undefined
                ? { shippingTotal } > 0
                  ? `${currencySymbol}${shippingTotal.toFixed(2)}`
                  : 'Free'
                : '-'
            }
          />
        </StyledText>
      </StyledRowDataContainer>
      <StyledRowDataContainer>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={labels.taxLabel}
          />
        </StyledText>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={`${currencySymbol}${taxesTotal.toFixed(2)}`}
          />
        </StyledText>
      </StyledRowDataContainer>
      {giftCardsTotal > 0 ? (
        <React.Fragment>
          <StyledRowDataContainer>
            <StyledText>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                textAlign="left"
                fontWeight="regular"
                fontSize="fs13"
                text={labels.totalLabel}
              />
            </StyledText>
            <StyledText>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs13"
                textAlign="right"
                text={`${currencySymbol}${grandTotal.toFixed(2)}`}
              />
            </StyledText>
          </StyledRowDataContainer>
          <StyledRowDataContainer>
            <StyledText>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                textAlign="left"
                fontWeight="regular"
                fontSize="fs13"
                text={labels.giftcardsLabel}
              />
            </StyledText>
            <StyledText>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs13"
                textAlign="right"
                text={`-${currencySymbol}${giftCardsTotal.toFixed(2)}`}
              />
            </StyledText>
          </StyledRowDataContainer>
        </React.Fragment>
      ) : null}
      <StyledRowDataContainer>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={giftCardsTotal ? `${labels.balanceLabel}:` : `${labels.totalLabel}:`}
          />
        </StyledText>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={`${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
          />
        </StyledText>
      </StyledRowDataContainer>
      <StyledRowDataContainer>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={`${labels.totalSavingsLabel}`}
          />
        </StyledText>
        <StyledText>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={`${currencySymbol}${totalOrderSavings.toFixed(2)}`}
          />
        </StyledText>
      </StyledRowDataContainer>
    </StyledOrderLedger>
  );
};

OrderLedger.propTypes = {
  /** Number of items in the cart. */
  itemsCount: PropTypes.number,

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
  currencySymbol: PropTypes.string,

  orderBalanceTotal: PropTypes.number,
  totalOrderSavings: PropTypes.number,
  labels: PropTypes.shape({}),
  /** Flag indicates whether cart savings section will display */
  // isDisplayCartSavings: PropTypes.bool,
};

OrderLedger.defaultProps = {
  itemsCount: 8,
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
  currencySymbol: '$',
};

export default OrderLedger;
