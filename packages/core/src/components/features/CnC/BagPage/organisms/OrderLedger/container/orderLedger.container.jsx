import React from 'react';
import { connect } from 'react-redux';
import OrderLedger from '../views/orderLedger.view';
import {
  getItemsTotalCount,
  getCouponsTotal,
  getSubTotal,
  getSavingsTotal,
  getShippingTotal,
  getTotalTax,
  getGrandTotal,
  getGiftCardsTotal,
  getTotalOrderSavings,
} from './orderLedger.selector';

// @flow

type Props = {
  className: string,
  itemsCount: number,
  currencySymbol: any,
  subTotal: number,
  couponsTotal: number,
  savingsTotal: number,
  shippingTotal: number,
  taxesTotal: number,
  grandTotal: number,
  giftCardsTotal: number,
  orderBalanceTotal: number,
  totalOrderSavings: number,
  labels: any,
};

export const OrderLedgerContainer = ({
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
}: Props) => (
  <OrderLedger
    className={className}
    itemsCount={itemsCount}
    currencySymbol={currencySymbol}
    subTotal={subTotal}
    couponsTotal={couponsTotal}
    savingsTotal={savingsTotal}
    shippingTotal={shippingTotal}
    taxesTotal={taxesTotal}
    grandTotal={grandTotal}
    giftCardsTotal={giftCardsTotal}
    orderBalanceTotal={orderBalanceTotal}
    totalOrderSavings={totalOrderSavings}
    labels={labels}
  />
);

function mapStateToProps(state) {
  const {
    bag: {
      bagOverview: {
        lbl_orderledger_items: itemsLabel,
        lbl_orderledger_coupons: couponsLabel,
        lbl_orderledger_promotions: promotionsLabel,
        lbl_orderledger_shipping: shippingLabel,
        lbl_orderledger_tax: taxLabel,
        lbl_orderledger_total: totalLabel,
        lbl_orderledger_giftcards: giftcardsLabel,
        lbl_orderledger_balance: balanceLabel,
        lbl_orderledger_totalsavings: totalSavingsLabel,
        lbl_orderledger_tooltiptext: tooltipText,
      },
    },
  } = state.Labels;
  return {
    className: 'order-summary',
    itemsCount: getItemsTotalCount(state),
    subTotal: getSubTotal(state),
    couponsTotal: getCouponsTotal(state),
    savingsTotal: getSavingsTotal(state),
    shippingTotal: getShippingTotal(state),
    totalTax: getTotalTax(state),
    grandTotal: getGrandTotal(state),
    giftCardsTotal: getGiftCardsTotal(state),
    orderBalanceTotal: getGrandTotal(state) - getGiftCardsTotal(state),
    totalOrderSavings: getTotalOrderSavings(state),
    currencySymbol: '$',
    labels: {
      itemsLabel,
      couponsLabel,
      promotionsLabel,
      shippingLabel,
      taxLabel,
      totalLabel,
      giftcardsLabel,
      balanceLabel,
      totalSavingsLabel,
      tooltipText,
    },
  };
}

export default connect(mapStateToProps)(OrderLedgerContainer);
