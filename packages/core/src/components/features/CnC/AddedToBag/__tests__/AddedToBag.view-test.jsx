import React from 'react';
import { shallow } from 'enzyme';
import { AddedToBagVanilla } from '../views/AddedToBag.view';

describe('Added to Bag View', () => {
  const props = {
    openState: false,
    onRequestClose: jest.fn(),
    addedToBagData: {},
    className: 'test',
    labels: {},
    quantity: 1,
    handleContinueShopping: jest.fn(),
    handleCartCheckout: jest.fn(),
  };
  it('should render Added to Bag view ', () => {
    const component = shallow(<AddedToBagVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
