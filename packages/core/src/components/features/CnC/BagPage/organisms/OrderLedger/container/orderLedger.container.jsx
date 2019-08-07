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
  getOrderLedgerLabels,
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
    labels: {}, //getOrderLedgerLabels(state),
  };
}

export default connect(mapStateToProps)(OrderLedgerContainer);
