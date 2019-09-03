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
      shippingTotal: 0,
      taxesTotal: 0,
      grandTotal: 0,
      giftCardsTotal: 0,
      orderBalanceTotal: 0,
      totalOrderSavings: 0,
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
