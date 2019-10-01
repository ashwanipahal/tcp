import React from 'react';
import { shallow } from 'enzyme';
import CardImage from '../views/CardImage.view';

describe('CardImageVanilla component', () => {
  const props = {
    card: '',
    cardNumber: 1234,
  };

  const component = shallow(<CardImage {...props} />);
  it('renders correctly without props', () => {
    expect(component).toMatchSnapshot();
  });
  it('renders correctly with props', () => {
    component.setProps({ card: { ccBrand: 'DISC' } });
    expect(component).toBeDefined();
  });
  it('renders correctly with props type ', () => {
    component.setProps({ card: { ccType: 'VENMO' } });
    expect(component).toBeDefined();
  });
});
