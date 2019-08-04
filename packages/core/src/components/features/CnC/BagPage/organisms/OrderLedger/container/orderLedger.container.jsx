// TODO: Need fix unused/proptypes eslint error
/* eslint-disable */
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
  getOrderDetails: void,
  removeCartItem: void,
  cartItems: any,
  updateCartItem: any,
  getProductSKUInfo: any,
  editableProductInfo: any,
};

export const orderLedgerContainer = ({
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
}) => (
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
  };
}

export default connect(mapStateToProps)(orderLedgerContainer);
