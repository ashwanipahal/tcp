import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutCartItemList } from '../container/CheckoutCartItemsList.container';

describe('CheckoutCartItemListContainer', () => {
  const props = {
    itemsCount: 2,
    items: {},
    currencySymbol: '$',
    labels: {},
    bagPageLabels: {},
  };
  it('should render CheckoutCartItemListContainer', () => {
    const component = shallow(<CheckoutCartItemList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
