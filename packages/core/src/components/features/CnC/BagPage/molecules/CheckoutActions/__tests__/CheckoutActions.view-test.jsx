import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutActionsVanilla } from '../views/CheckoutActions.view';

describe('Checkout actions Container', () => {
  const labels = {};

  it('should render Checkout actions view section', () => {
    const component = shallow(<CheckoutActionsVanilla labels={labels} />);
    expect(component).toMatchSnapshot();
  });
});
