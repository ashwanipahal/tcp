import React from 'react';
import { shallow } from 'enzyme';
import OrderLedger from '../views/orderLedger.view';

describe('OrderLedger Component', () => {
  let component;
  const Props = {
    className: '',
    ledgerSummaryData: {
      itemsCount: 1,
      currencySymbol: '',
      subTotal: 0,
      couponsTotal: 0,
      savingsTotal: 0,
      giftServiceTotal: 0,
      shippingTotal: 0,
      taxesTotal: 0,
      grandTotal: 0,
      giftCardsTotal: 0,
      orderBalanceTotal: 0,
      totalOrderSavings: 0,
      isOrderHasShipping: false,
    },
    labels: {},
  };

  beforeEach(() => {
    component = shallow(<OrderLedger {...Props} />);
  });

  it('OrderLedger should be defined', () => {
    expect(component).toBeDefined();
  });

  it('OrderLedger should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
describe('OrderLedger Component', () => {
  let component;
  const Props = {
    className: '',
    ledgerSummaryData: {
      itemsCount: 1,
      currencySymbol: '',
      subTotal: 1,
      couponsTotal: 1,
      savingsTotal: 1,
      giftServiceTotal: 1,
      shippingTotal: 1,
      taxesTotal: 1,
      grandTotal: 1,
      giftCardsTotal: 1,
      orderBalanceTotal: 1,
      totalOrderSavings: 1,
      isOrderHasShipping: true,
    },
    labels: {},
  };

  beforeEach(() => {
    component = shallow(<OrderLedger {...Props} />);
  });

  it('OrderLedger should be defined', () => {
    expect(component).toBeDefined();
  });

  it('OrderLedger should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
