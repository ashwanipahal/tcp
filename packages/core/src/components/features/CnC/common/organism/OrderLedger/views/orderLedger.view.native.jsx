import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LineComp from '../../../../../../common/atoms/Line';
import ImageComp from '../../../../../../common/atoms/Image';
import IconInfoLogo from '../../../../../../../assets/info-icon.png';
import {
  StyledOrderLedger,
  StyledRowDataContainer,
  LabelContainer,
  IconContainer,
  StyledHeader,
  OrderSummaryWrapper,
} from '../styles/orderLedger.style.native';
import ReactTooltip from '../../../../../../common/atoms/ReactToolTip';
import CollapsibleContainer from '../../../../../../common/molecules/CollapsibleContainer';

const popover = message => {
  return (
    <BodyCopy
      fontSize="fs13"
      fontFamily="secondary"
      fontWeight="semibold"
      color="gray.900"
      text={message}
    />
  );
};

export const createRowForGiftServiceTotal = (currencySymbol, giftServiceTotal, labels) => {
  return giftServiceTotal > 0 ? (
    <StyledRowDataContainer>
      <Text>
        <BodyCopy
          bodySize="one"
          fontFamily="secondary"
          textAlign="left"
          fontWeight="regular"
          fontSize="fs13"
          text={`${labels.giftServiceLabel}:`}
        />
      </Text>
      <Text>
        <BodyCopy
          bodySize="one"
          fontFamily="secondary"
          fontWeight="regular"
          fontSize="fs13"
          textAlign="right"
          text={`${currencySymbol}${giftServiceTotal.toFixed(2)}`}
        />
      </Text>
    </StyledRowDataContainer>
  ) : null;
};

const getBody = (ledgerSummaryData, labels) => {
  const {
    itemsCount,
    currencySymbol,
    subTotal,
    couponsTotal,
    savingsTotal,
    giftServiceTotal,
    shippingTotal,
    taxesTotal,
    grandTotal,
    giftCardsTotal,
    orderBalanceTotal,
    totalOrderSavings,
    isOrderHasShipping,
  } = ledgerSummaryData;
  return (
    <StyledOrderLedger>
      <StyledRowDataContainer>
        <Text>
          <BodyCopy
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={`${labels.itemsLabel} (${itemsCount}):`}
          />
        </Text>
        <Text>
          <BodyCopy
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={`${currencySymbol}${subTotal.toFixed(2)}`}
          />
        </Text>
      </StyledRowDataContainer>
      {couponsTotal ? (
        <StyledRowDataContainer>
          <Text>
            <BodyCopy
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize="fs13"
              text={`${labels.couponsLabel}:`}
            />
          </Text>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs13"
              textAlign="right"
              text={`-${currencySymbol}${couponsTotal.toFixed(2)}`}
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
      {savingsTotal ? (
        <StyledRowDataContainer>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize="fs13"
              text={`${labels.promotionsLabel}:`}
            />
          </Text>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs13"
              textAlign="right"
              text={`-${currencySymbol}${savingsTotal.toFixed(2)}`}
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
      {createRowForGiftServiceTotal(currencySymbol, giftServiceTotal, labels)}
      {isOrderHasShipping ? (
        <StyledRowDataContainer>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize="fs13"
              text={`${labels.shippingLabel}:`}
            />
          </Text>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs13"
              textAlign="right"
              text={
                // eslint-disable-next-line no-nested-ternary
                shippingTotal !== undefined
                  ? shippingTotal > 0
                    ? `${currencySymbol}${shippingTotal.toFixed(2)}`
                    : labels.free
                  : '-'
              }
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
      <StyledRowDataContainer>
        <Text>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="regular"
            fontSize="fs13"
            text={`${labels.taxLabel}:`}
          />
        </Text>
        <Text>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="regular"
            fontSize="fs13"
            textAlign="right"
            text={`${currencySymbol}${taxesTotal.toFixed(2)}`}
          />
        </Text>
      </StyledRowDataContainer>
      <LineComp borderColor="black" marginTop={10} marginBottom={10} />
      {giftCardsTotal > 0 ? (
        <React.Fragment>
          <StyledRowDataContainer>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                textAlign="left"
                fontWeight="regular"
                fontSize="fs13"
                text={`${labels.totalLabel}:`}
              />
            </Text>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs13"
                textAlign="right"
                text={`${currencySymbol}${grandTotal.toFixed(2)}`}
              />
            </Text>
          </StyledRowDataContainer>
          <StyledRowDataContainer>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                textAlign="left"
                fontWeight="regular"
                fontSize="fs13"
                text={`${labels.giftcardsLabel}:`}
              />
            </Text>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize="fs13"
                textAlign="right"
                text={`-${currencySymbol}${giftCardsTotal.toFixed(2)}`}
              />
            </Text>
          </StyledRowDataContainer>
        </React.Fragment>
      ) : null}
      <StyledRowDataContainer>
        <Text>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            textAlign="left"
            fontWeight="extrabold"
            fontSize="fs16"
            text={giftCardsTotal ? `${labels.balanceLabel}:` : `${labels.totalLabel}:`}
          />
        </Text>
        <Text>
          <BodyCopy
            bodySize="one"
            fontFamily="secondary"
            fontWeight="extrabold"
            fontSize="fs16"
            textAlign="right"
            text={`${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
          />
        </Text>
      </StyledRowDataContainer>
      {totalOrderSavings ? (
        <StyledRowDataContainer>
          <LabelContainer>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              textAlign="left"
              fontWeight="regular"
              fontSize="fs13"
              text={`${labels.totalSavingsLabel}`}
            />
            <IconContainer>
              <ReactTooltip withOverlay={false} popover={popover(labels.tooltipText)}>
                <ImageComp source={IconInfoLogo} height={15} width={15} />
              </ReactTooltip>
            </IconContainer>
          </LabelContainer>
          <Text>
            <BodyCopy
              bodySize="one"
              fontFamily="secondary"
              fontWeight="regular"
              fontSize="fs13"
              textAlign="right"
              text={`${currencySymbol}${totalOrderSavings.toFixed(2)}`}
            />
          </Text>
        </StyledRowDataContainer>
      ) : null}
    </StyledOrderLedger>
  );
};

const getHeader = (labels, ledgerSummaryData) => {
  const { currencySymbol, orderBalanceTotal } = ledgerSummaryData;
  const headerText = `${labels.orderLedgerTitle} (${currencySymbol}${orderBalanceTotal.toFixed(
    2
  )})`;
  return (
    <StyledHeader>
      <BodyCopy
        mobileFontFamily="secondary"
        fontSize="fs16"
        fontWeight="semibold"
        component="span"
        text={headerText}
      />
    </StyledHeader>
  );
};

const OrderLedger = ({ ledgerSummaryData, labels, showAccordian }) => {
  const header = getHeader(labels, ledgerSummaryData);
  const body = getBody(ledgerSummaryData, labels);
  return (
    <View>
      {showAccordian ? (
        <OrderSummaryWrapper>
          <CollapsibleContainer
            header={header}
            body={body}
            defaultOpen={false}
            iconLocator="arrowicon"
          />
        </OrderSummaryWrapper>
      ) : (
        body
      )}
    </View>
  );
};

OrderLedger.propTypes = {
  ledgerSummaryData: PropTypes.shape({
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
  }),
  labels: PropTypes.shape({}),
  showAccordian: PropTypes.bool.isRequired,
  /** Flag indicates whether cart savings section will display */
  // isDisplayCartSavings: PropTypes.bool,
};

OrderLedger.defaultProps = {
  ledgerSummaryData: {},
  labels: {},
};

export default OrderLedger;
