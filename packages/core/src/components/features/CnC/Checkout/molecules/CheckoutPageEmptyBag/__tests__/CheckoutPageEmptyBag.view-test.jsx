import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutPageEmptyBagVanilla } from '../views/CheckoutPageEmptyBag.view';

describe.only('CheckoutPageEmptyBag Component', () => {
  let component;
  const props = {
    className: 'container',
  };

  beforeEach(() => {
    component = shallow(<CheckoutPageEmptyBagVanilla {...props} />);
  });

  it('CheckoutPageEmptyBag should be defined', () => {
    expect(component).toBeDefined();
  });

  it('CheckoutPageEmptyBag should render correctly', () => {
    expect(component).toMatchSnapshot();
  });
});
