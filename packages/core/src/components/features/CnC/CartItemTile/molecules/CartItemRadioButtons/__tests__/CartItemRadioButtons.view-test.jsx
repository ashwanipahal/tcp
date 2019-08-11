import React from 'react';
import { shallow } from 'enzyme';
import { CartItemRadioButtonsVanilla } from '../views/CartItemRadioButtons';

describe('CartItemRadioButtons Component', () => {
  let component;
  const props = {
    productDetail: {
      miscInfo: {
        orderItemType: 'BOSS',
      },
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

  it('CartItemRadioButtons should call handle toggle', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);

    component.instance().handleToggle('e', 'BOSS');
    expect(component.state('selectedOrder')).toBe('BOSS');
  });

  it('CartItemRadioButtons should call default state', () => {
    component = shallow(<CartItemRadioButtonsVanilla {...props} />);
    expect(component.state('selectedOrder')).toBe('BOSS');
  });
});
