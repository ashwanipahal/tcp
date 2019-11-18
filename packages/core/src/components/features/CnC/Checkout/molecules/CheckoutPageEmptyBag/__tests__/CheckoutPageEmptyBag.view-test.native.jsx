import React from 'react';
import { shallow } from 'enzyme';
import ErrorMessage from '../views/CheckoutPageEmptyBag.view.native';

describe('CheckoutPageEmptyBag Component', () => {
  let component;
  let props;

  beforeEach(() => {
    props = {
      labels: {
        emptyBagSubText: 'abc',
        emptyBagText: 'abc',
      },
    };
  });

  it('CheckoutPageEmptyBag should be defined', () => {
    component = shallow(<ErrorMessage {...props} />);
    expect(component).toBeDefined();
  });

  it('CheckoutPageEmptyBag should render correctly', () => {
    component = shallow(<ErrorMessage {...props} />);
    expect(component).toMatchSnapshot();
  });
});
