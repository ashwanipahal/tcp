import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import OrderSummarySkeleton from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/skeleton/OrderSummarySkeleton.view.native';
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
import LoyaltyBanner from '../../../../LoyaltyBanner';
import FreeShippingBanner from '../../../../FreeShippingBanner';
import { renderCouponsAndSavingsTotal, orderHasShipping } from './orderLedger.util.native';

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

const renderFreeShippingBanner = pageCategory => {
  return pageCategory === 'bagPage' && <FreeShippingBanner />;
};

const getLoyaltybanner = (isConfirmationPage, pageCategory, navigation) => {
  return (
    <LoyaltyBanner
      isConfirmationPage={isConfirmationPage}
      pageCategory={pageCategory}
      navigation={navigation}
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

const getBody = (ledgerSummaryData, labels, isConfirmationPage, pageCategory, navigation) => {
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
    bagLoading,
  } = ledgerSummaryData;
  let fontSize = 'fs13';
  let totalFontSize = 'fs16';
  let totalLabel = `${labels.totalLabel}:`;
  if (isConfirmationPage) {
    fontSize = 'fs16';
    totalFontSize = 'fs18';
    totalLabel = `${labels.totalLabelConfirmation}:`;
  }
  return (
    <StyledOrderLedger>
      {!bagLoading ? (
        <>
          <StyledRowDataContainer>
            <Text>
              <BodyCopy
                fontFamily="secondary"
                textAlign="left"
                fontWeight="regular"
                fontSize={fontSize}
                text={`${labels.itemsLabel} (${itemsCount}):`}
              />
            </Text>
            <Text>
              <BodyCopy
                fontFamily="secondary"
                fontWeight="regular"
                fontSize={fontSize}
                textAlign="right"
                text={`${currencySymbol}${subTotal.toFixed(2)}`}
              />
            </Text>
          </StyledRowDataContainer>
          {renderCouponsAndSavingsTotal(
            couponsTotal,
            fontSize,
            labels,
            currencySymbol,
            savingsTotal
          )}
          {createRowForGiftServiceTotal(currencySymbol, giftServiceTotal, labels)}
          {orderHasShipping(isOrderHasShipping, fontSize, labels, shippingTotal, currencySymbol)}
          <StyledRowDataContainer>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                textAlign="left"
                fontWeight="regular"
                fontSize={fontSize}
                text={`${labels.taxLabel}:`}
              />
            </Text>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                fontWeight="regular"
                fontSize={fontSize}
                textAlign="right"
                text={`${currencySymbol}${taxesTotal.toFixed(2)}`}
              />
            </Text>
          </StyledRowDataContainer>
          <LineComp borderColor="gray.600" borderWidth={1} marginTop={10} marginBottom={10} />
          {giftCardsTotal > 0 ? (
            <React.Fragment>
              <StyledRowDataContainer>
                <Text>
                  <BodyCopy
                    bodySize="one"
                    fontFamily="secondary"
                    textAlign="left"
                    fontWeight="regular"
                    fontSize={fontSize}
                    text={`${labels.totalLabel}:`}
                  />
                </Text>
                <Text>
                  <BodyCopy
                    bodySize="one"
                    fontFamily="secondary"
                    fontWeight="regular"
                    fontSize={fontSize}
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
                    fontSize={fontSize}
                    text={`${labels.giftcardsLabel}:`}
                  />
                </Text>
                <Text>
                  <BodyCopy
                    bodySize="one"
                    fontFamily="secondary"
                    fontWeight="regular"
                    fontSize={fontSize}
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
                fontSize={totalFontSize}
                text={giftCardsTotal ? `${labels.balanceLabel}:` : totalLabel}
              />
            </Text>
            <Text>
              <BodyCopy
                bodySize="one"
                fontFamily="secondary"
                fontWeight="extrabold"
                fontSize={totalFontSize}
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
                  fontSize={fontSize}
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
                  fontSize={fontSize}
                  textAlign="right"
                  text={`${currencySymbol}${totalOrderSavings.toFixed(2)}`}
                />
              </Text>
            </StyledRowDataContainer>
          ) : null}
        </>
      ) : (
        <OrderSummarySkeleton />
      )}
      {renderFreeShippingBanner(pageCategory)}
      {getLoyaltybanner(isConfirmationPage, pageCategory, navigation)}
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
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="semibold"
        component="span"
        text={headerText}
      />
    </StyledHeader>
  );
};

const OrderLedger = ({
  ledgerSummaryData,
  labels,
  showAccordian,
  confirmationPageLedgerSummaryData,
  isConfirmationPage,
  pageCategory,
  navigation,
}) => {
  let summaryData = ledgerSummaryData;
  if (isConfirmationPage) {
    summaryData = confirmationPageLedgerSummaryData;
  }
  const header = getHeader(labels, summaryData);
  const body = getBody(summaryData, labels, isConfirmationPage, pageCategory, navigation);
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
  confirmationPageLedgerSummaryData: PropTypes.shape({
    itemsCount: PropTypes.number.isRequired,

    /** Total estimation, before applying taxes */
    grandTotal: PropTypes.number,

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

    /** This is used to display the correct currency symbol */
    currencySymbol: PropTypes.string.isRequired,

    /** This is used to display the balance total */
    orderBalanceTotal: PropTypes.number,

    navigation: PropTypes.shape({}),
  }),

  /** Flag to identify if the current page is confirmation page */
  isConfirmationPage: PropTypes.bool,
  pageCategory: PropTypes.shape({}),
  navigation: PropTypes.shape({}).isRequired,
};

OrderLedger.defaultProps = {
  ledgerSummaryData: {},
  labels: {},
  confirmationPageLedgerSummaryData: {},
  isConfirmationPage: false,
  pageCategory: {},
};

export default OrderLedger;
