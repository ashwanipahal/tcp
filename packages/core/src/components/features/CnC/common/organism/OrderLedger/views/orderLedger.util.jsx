import React from 'react';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import ReactToolTip from '@tcp/core/src/components/common/atoms/ReactToolTip';
import RenderPerf from '@tcp/web/src/components/common/molecules/RenderPerf';
import { PRICING_VISIBLE } from '@tcp/core/src/constants/rum.constants';
import { getLocator, isCanada } from '@tcp/core/src/utils';
import { getIconPath } from '../../../../../../../utils';
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
            {`${currencySymbol}${giftServiceTotal.toFixed(2)}`}
          </BodyCopy>
        </Col>
      </Row>
    )
  );
};

const renderLoyaltyBanner = pageCategory => {
  return (
    !isCanada() && pageCategory !== 'confirmation' && <LoyaltyBanner pageCategory={pageCategory} />
  );
};

const getBody = (className, ledgerSummaryData, labels, pageCategory) => {
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
        <Row className="items-total rowMargin" data-locator={getLocator('order_ledger_item_label')}>
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
              {`${currencySymbol}${subTotal.toFixed(2)}`}
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
                {`-${currencySymbol}${couponsTotal.toFixed(2)}`}
              </BodyCopy>
            </Col>
          </Row>
        ) : null}
        {savingsTotal ? (
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
                {`-${currencySymbol}${savingsTotal.toFixed(2)}`}
              </BodyCopy>
            </Col>
          </Row>
        ) : null}
        {createRowForGiftServiceTotal(className, currencySymbol, giftServiceTotal, labels)}
        {isOrderHasShipping && (
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
                {shippingTotal !== undefined
                  ? // eslint-disable-next-line no-constant-condition
                    shippingTotal > 0
                    ? `${currencySymbol}${shippingTotal.toFixed(2)}`
                    : labels.free
                  : '-'}
              </BodyCopy>
            </Col>
          </Row>
        )}
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
              {`${currencySymbol}${taxesTotal.toFixed(2)}`}
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
                  {`${currencySymbol}${grandTotal.toFixed(2)}`}
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
                  {`-${currencySymbol}${giftCardsTotal.toFixed(2)}`}
                </BodyCopy>
              </Col>
            </Row>
          </React.Fragment>
        ) : null}
        <Row
          className="balance-total rowMargin"
          data-locator={getLocator('order_ledger_balance_total_label')}
        >
          <Col colSize={{ large: 6, medium: 5, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondary"
              fontWeight="extrabold"
              fontSize="fs18"
            >
              {giftCardsTotal ? `${labels.balanceLabel}:` : `${labels.totalLabel}:`}
            </BodyCopy>
          </Col>
          <Col colSize={{ large: 6, medium: 3, small: 3 }}>
            <BodyCopy
              bodySize="one"
              tag="span"
              color="primary"
              fontFamily="secondary"
              fontWeight="extrabold"
              fontSize="fs18"
              textAlign="right"
            >
              {`${currencySymbol}${orderBalanceTotal.toFixed(2)}`}
            </BodyCopy>
          </Col>
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
                  <Image alt="info" className="circle-info-image" src={getIconPath(`info-icon`)} />
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
                {`${currencySymbol}${totalOrderSavings.toFixed(2)}`}
              </BodyCopy>
            </Col>
          </Row>
        ) : null}
        {pageCategory === 'bagPage' && <FreeShippingBanner />}
        {renderLoyaltyBanner(pageCategory)}
      </Grid>
      <RenderPerf.Measure name={PRICING_VISIBLE} />
    </React.Fragment>
  );
};

export default { getBody, createRowForGiftServiceTotal };
