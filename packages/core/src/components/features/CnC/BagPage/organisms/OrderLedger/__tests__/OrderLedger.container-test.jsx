import React from 'react';
import { shallow } from 'enzyme';
import { OrderLedgerContainer } from '../container/OrderLedger.container';
import OrderLedger from '../views/OrderLedger.view';

describe('Order Ledger Container', () => {
  const className = '';
  const itemsCount = 1;
  const currencySymbol = '';
  const subTotal = 0;
  const couponsTotal = 0;
  const savingsTotal = 0;
  const shippingTotal = 0;
  const taxesTotal = 0;
  const grandTotal = 0;
  const giftCardsTotal = 0;
  const orderBalanceTotal = 0;
  const totalOrderSavings = 0;

  it('should render Order Ledger view section', () => {
    const tree = shallow(
      <OrderLedgerContainer
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
    expect(tree.is(OrderLedger)).toBeTruthy();
  });
});
