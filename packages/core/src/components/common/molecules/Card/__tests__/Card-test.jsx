import React from 'react';
import { shallow } from 'enzyme';
import { CardVanilla } from '../views/Card';

describe('ButtonList component', () => {
  const props = {
    card: '',
    className: '',
    dataLocatorPrefix: '',
    fontWeight: '',
    labels: {},
    isMobile: false,
    isDefault: false,
    cardNumber: '',
    showAddress: false,
  };

  it('renders correctly without props', () => {
    const component = shallow(<CardVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
