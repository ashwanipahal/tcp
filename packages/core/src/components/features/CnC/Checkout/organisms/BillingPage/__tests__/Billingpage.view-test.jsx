import React from 'react';
import { shallow } from 'enzyme';
import { BillingPageVanilla } from '../views/BillingPage.view';

describe('CheckoutProgressIndicator component', () => {
  it('should renders correctly props not present', () => {
    const props = { labels: {} };
    const component = shallow(<BillingPageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
