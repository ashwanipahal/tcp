import React from 'react';
import { shallow } from 'enzyme';
import { CartItemRadioButtonsVanilla } from '../views/CartItemRadioButtons';

describe('CartItemRadioButtons Component', () => {
  let component;
  const props = {
    productDetail: {
      miscInfo: '',
      itemInfo: '',
    },
    className: '',
    labels: {},
  };

  it('CartItemRadioButtons should be defined', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toBeDefined();
  });

  it('CartItemRadioButtons should render correctly', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
