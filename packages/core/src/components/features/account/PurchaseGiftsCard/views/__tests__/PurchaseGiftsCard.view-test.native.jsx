import React from 'react';
import { shallow } from 'enzyme';
import { PurchaseGiftsCard } from '../PurchaseGiftsCard.view.native';

describe('PurchaseGiftsCard View component', () => {
  it('should renders correctly', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<PurchaseGiftsCard {...props} />);
    expect(component).toMatchSnapshot();
  });
});
