import React from 'react';
import { shallow } from 'enzyme';
import { CardImageVanilla } from '../views/CardImage';

describe('CardImageVanilla component', () => {
  const props = {
    card: '',
    cardNumber: 1234,
  };

  it('renders correctly without props', () => {
    const component = shallow(<CardImageVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
