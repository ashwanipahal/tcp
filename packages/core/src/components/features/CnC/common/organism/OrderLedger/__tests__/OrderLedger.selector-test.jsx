import { fromJS } from 'immutable';
import {
  getItemsTotalCount,
  getCouponsTotal,
  getSavingsTotal,
  getShippingTotal,
  getTotalTax,
  getGrandTotal,
  getGiftCardsTotal,
  getTotalOrderSavings,
} from '../container/orderLedger.selector';

describe('#OrderLedger Selectors', () => {
  const CartPageState = fromJS({
    orderDetails: {
      totalItems: 0,
      couponsTotal: 0,
      shippingTotal: 0,
      savingsTotal: 0,
      totaltax: 0,
      grandTotal: 0,
      giftCardsTotal: 0,
      totalOrderSavings: 0,
      getSubTotal: 0,
    },
  });
  const state = {
    CartPageReducer: CartPageState,
  };
  it('#getItemsTotalCount should return totalItems', () => {
    expect(getItemsTotalCount(state)).toEqual(CartPageState.getIn(['orderDetails', 'totalItems']));
  });
  it('#getCouponsTotal should return couponsTotal', () => {
    expect(getCouponsTotal(state)).toEqual(CartPageState.getIn(['orderDetails', 'couponsTotal']));
  });
  it('#getSavingsTotal should return savingsTotal', () => {
    expect(getSavingsTotal(state)).toEqual(CartPageState.getIn(['orderDetails', 'savingsTotal']));
  });
  it('#getShippingTotal should return shippingTotal', () => {
    expect(getShippingTotal(state)).toEqual(CartPageState.getIn(['orderDetails', 'shippingTotal']));
  });
  it('#getTotalTax should return totaltax', () => {
    expect(getTotalTax(state)).toEqual(CartPageState.getIn(['orderDetails', 'totaltax']));
  });
  it('#getGrandTotal should return grandTotal', () => {
    expect(getGrandTotal(state)).toEqual(CartPageState.getIn(['orderDetails', 'grandTotal']));
  });
  it('#getGiftCardsTotal should return giftCardsTotal', () => {
    expect(getGiftCardsTotal(state)).toEqual(
      CartPageState.getIn(['orderDetails', 'giftCardsTotal'])
    );
  });
  it('#getTotalOrderSavings should return totalOrderSavings', () => {
    expect(getTotalOrderSavings(state)).toEqual(
      CartPageState.getIn(['orderDetails', 'totalOrderSavings'])
    );
  });
});
