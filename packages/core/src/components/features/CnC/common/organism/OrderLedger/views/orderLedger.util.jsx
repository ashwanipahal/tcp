import React from 'react';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import ReactToolTip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { PRICING_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import { getLocator, getIconPath } from '@tcp/core/src/utils';
import { PriceCurrency } from '@tcp/core/src/components/common/molecules';
import OrderSummarySkeleton from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger/skeleton/OrderSummarySkeleton.view';
import { Image } from '../../../../../../common/atoms';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import LoyaltyBanner from '../../../../LoyaltyBanner';
import FreeShippingBanner from '../../../../FreeShippingBanner';

const createRowForGiftServiceTotal = (className, currencySymbol, giftServiceTotal, labels) => {
  return (
    giftServiceTotal > 0 && (
      <Row
        className="shipping-total rowMargin"
        data-locator={getLocator('order_ledger_giftService_label')}
      >
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy
            bodySize="one"
            color="primary"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize="fs16"
          >
            {`${labels.giftServiceLabel}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy
            bodySize="one"
            color="primary"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize="fs16"
            textAlign="right"
          >
            <PriceCurrency currencySymbol={currencySymbol} price={giftServiceTotal} />
          </BodyCopy>
        </Col>
      </Row>
    )
  );
};

const renderLoyaltyBanner = pageCategory => {
  return (
    <div className="orderLedgerLoyalty">
      <LoyaltyBanner pageCategory={pageCategory} />
    </div>
  );
};

const renderSavingsTotal = (savingsTotal, className, labels, currencySymbol) => {
  return savingsTotal ? (
    <Row
      className="promotions-total rowMargin"
      data-locator={getLocator('order_ledger_promotion_label')}
    >
      <Col colSize={{ large: 6, medium: 4, small: 3 }}>
        <BodyCopy
          bodySize="one"
          color="primary"
          fontFamily="secondary"
          fontWeight="semibold"
          fontSize="fs13"
        >
          {`${labels.promotionsLabel}:`}
        </BodyCopy>
      </Col>
      <Col colSize={{ large: 6, medium: 4, small: 3 }}>
        <BodyCopy
          bodySize="one"
          color="primary"
          fontFamily="secondary"
          fontWeight="semibold"
          fontSize="fs13"
          textAlign="right"
        >
          -
          <PriceCurrency currencySymbol={currencySymbol} price={savingsTotal} />
        </BodyCopy>
      </Col>
    </Row>
  ) : null;
};

const shippingTotalCurrencySymbol = (shippingTotal, currencySymbol, labels) => {
  return shippingTotal > 0 ? (
    <PriceCurrency currencySymbol={currencySymbol} price={shippingTotal} />
  ) : (
    labels.free
  );
};

const orderHasShipping = (currencySymbol, isOrderHasShipping, labels, shippingTotal) => {
  return (
    isOrderHasShipping && (
      <Row
        className="shipping-total rowMargin"
        data-locator={getLocator('order_ledger_shipping_label')}
      >
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy
            bodySize="one"
            color="primary"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize="fs16"
          >
            {`${labels.shippingLabel}:`}
          </BodyCopy>
        </Col>
        <Col colSize={{ large: 6, medium: 4, small: 3 }}>
          <BodyCopy
            bodySize="one"
            color="primary"
            fontFamily="secondary"
            fontWeight="semibold"
            fontSize="fs16"
            textAlign="right"
          >
            {shippingTotal !== undefined
              ? shippingTotalCurrencySymbol(shippingTotal, currencySymbol, labels)
              : '-'}
          </BodyCopy>
        </Col>
      </Row>
    )
  );
};

const getBody = (
  className,
  ledgerSummaryData,
  labels,
  pageCategory,
  orderLedgerAfterView,
  bagLoading
) => {
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
  const toolTipMinWidth = '205px';
  return (
    <React.Fragment>
      <Grid className={`${''} elem-mb-MED`} data-locator={getLocator('order_ledger_section_label')}>
        {!bagLoading && (ledgerSummaryData && ledgerSummaryData.itemsCount > 0) ? (
          <>
            <Row
              className="items-total rowMargin"
              data-locator={getLocator('order_ledger_item_label')}
            >
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <BodyCopy
                  bodySize="one"
                  color="primary"
                  fontFamily="secondary"
                  textAlign="left"
                  fontWeight="semibold"
                  fontSize="fs16"
                  dataLocator="orderLedgerCount"
                >
                  {`${labels.itemsLabel} (${itemsCount}):`}
                </BodyCopy>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <BodyCopy
                  bodySize="one"
                  color="primary"
                  fontFamily="secondary"
                  fontWeight="semibold"
                  fontSize="fs16"
                  textAlign="right"
                >
                  <PriceCurrency currencySymbol={currencySymbol} price={subTotal} />
                </BodyCopy>
              </Col>
            </Row>
            {couponsTotal ? (
              <Row
                className="coupons-total rowMargin"
                data-locator={getLocator('order_ledger_coupons_label')}
              >
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs13"
                  >
                    {`${labels.couponsLabel}:`}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs13"
                    textAlign="right"
                  >
                    -
                    <PriceCurrency currencySymbol={currencySymbol} price={couponsTotal} />
                  </BodyCopy>
                </Col>
              </Row>
            ) : null}
            {renderSavingsTotal(savingsTotal, className, labels, currencySymbol)}
            {/* {savingsTotal ? (
              <Row
                className="promotions-total rowMargin"
                data-locator={getLocator('order_ledger_promotion_label')}
              >
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs13"
                  >
                    {`${labels.promotionsLabel}:`}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs13"
                    textAlign="right"
                  >
                    -
                    <PriceCurrency currencySymbol={currencySymbol} price={savingsTotal} />
                  </BodyCopy>
                </Col>
              </Row>
            ) : null} */}
            {createRowForGiftServiceTotal(className, currencySymbol, giftServiceTotal, labels)}
            {/* {isOrderHasShipping && (
              <Row
                className="shipping-total rowMargin"
                data-locator={getLocator('order_ledger_shipping_label')}
              >
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs16"
                  >
                    {`${labels.shippingLabel}:`}
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs16"
                    textAlign="right"
                  >
                    {/* eslint-disable-next-line no-nested-ternary */}
            {/* {shippingTotal !== undefined
                      ? // eslint-disable-next-line no-constant-condition
                        shippingTotal > 0
                        ? <PriceCurrency currencySymbol={currencySymbol} price={shippingTotal} />
                        : labels.free
                      : '-'}
                  </BodyCopy>
                </Col>
              </Row>
            )} */}
            {orderHasShipping(currencySymbol, isOrderHasShipping, labels, shippingTotal)}
            <Row
              className="tax-total rowMargin"
              data-locator={getLocator('order_ledger_estimated_tax_label')}
            >
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <BodyCopy
                  bodySize="one"
                  tag="span"
                  color="primary"
                  fontFamily="secondary"
                  fontWeight="semibold"
                  fontSize="fs16"
                >
                  {`${labels.taxLabel}:`}
                </BodyCopy>
              </Col>
              <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                <BodyCopy
                  bodySize="one"
                  color="primary"
                  fontFamily="secondary"
                  fontWeight="semibold"
                  fontSize="fs16"
                  textAlign="right"
                >
                  <PriceCurrency currencySymbol={currencySymbol} price={taxesTotal} />
                </BodyCopy>
              </Col>
            </Row>
            {giftCardsTotal > 0 ? (
              <React.Fragment>
                <Row
                  className="estimated-total rowMargin"
                  data-locator={getLocator('order_ledger_estimated_total_label')}
                >
                  <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                    <BodyCopy
                      bodySize="one"
                      color="primary"
                      fontFamily="secondary"
                      fontWeight="semibold"
                      fontSize="fs13"
                    >
                      {`${labels.totalLabel}:`}
                    </BodyCopy>
                  </Col>
                  <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                    <BodyCopy
                      bodySize="one"
                      color="primary"
                      fontFamily="secondary"
                      fontWeight="semibold"
                      fontSize="fs13"
                      textAlign="right"
                    >
                      <PriceCurrency currencySymbol={currencySymbol} price={grandTotal} />
                    </BodyCopy>
                  </Col>
                </Row>
                <Row
                  className="giftCard-total rowMargin"
                  data-locator={getLocator('order_ledger_gift_card_label')}
                >
                  <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                    <BodyCopy
                      bodySize="one"
                      color="primary"
                      fontFamily="secondary"
                      fontWeight="semibold"
                      fontSize="fs13"
                    >
                      {`${labels.giftcardsLabel}:`}
                    </BodyCopy>
                  </Col>
                  <Col colSize={{ large: 6, medium: 4, small: 3 }}>
                    <BodyCopy
                      bodySize="one"
                      color="primary"
                      fontFamily="secondary"
                      fontWeight="semibold"
                      fontSize="fs13"
                      textAlign="right"
                    >
                      -
                      <PriceCurrency currencySymbol={currencySymbol} price={giftCardsTotal} />
                    </BodyCopy>
                  </Col>
                </Row>
              </React.Fragment>
            ) : null}
            <Row
              className="balance-total rowMargin"
              data-locator={getLocator('order_ledger_balance_total_label')}
            >
              <div className="balance-total-columns">
                <span>{giftCardsTotal ? `${labels.balanceLabel}:` : `${labels.totalLabel}:`}</span>
                <span>
                  <PriceCurrency currencySymbol={currencySymbol} price={orderBalanceTotal} />
                </span>
              </div>
            </Row>
            {totalOrderSavings ? (
              <Row
                className="total-order-savings rowMargin"
                data-locator={getLocator('order_ledger_total_order_savings_label')}
              >
                <Col colSize={{ large: 6, medium: 5, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs16"
                  >
                    {`${labels.totalSavingsLabel}`}
                    <ReactToolTip
                      id="tool"
                      direction="top"
                      message={labels.tooltipText}
                      minWidth={toolTipMinWidth}
                    >
                      <Image
                        alt="info"
                        className="circle-info-image"
                        src={getIconPath(`info-icon`)}
                      />
                    </ReactToolTip>
                  </BodyCopy>
                </Col>
                <Col colSize={{ large: 6, medium: 3, small: 3 }}>
                  <BodyCopy
                    bodySize="one"
                    color="primary"
                    fontFamily="secondary"
                    fontWeight="semibold"
                    fontSize="fs16"
                    textAlign="right"
                  >
                    <PriceCurrency currencySymbol={currencySymbol} price={totalOrderSavings} />
                  </BodyCopy>
                </Col>
              </Row>
            ) : null}
          </>
        ) : (
          <OrderSummarySkeleton />
        )}
        {orderLedgerAfterView}
        {pageCategory === 'bagPage' && <FreeShippingBanner />}
        {renderLoyaltyBanner(pageCategory)}
      </Grid>
      <RenderPerf.Measure name={PRICING_VISIBLE} />
    </React.Fragment>
  );
};

export default { getBody, createRowForGiftServiceTotal };
