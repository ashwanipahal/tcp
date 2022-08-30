import React from 'react';
import { shallow } from 'enzyme';
import CreditCardDropdown from '../views/CreditCardDropdown.view';

describe('Credit Card dropdown component', () => {
  const props = {
    input: { value: 1 },
    options: [{ value: 1, title: 'name' }],
    selectListTitle: 'Select card',
    childrenComp: () => {},
  };

  it('renders correctly without props', () => {
    const component = shallow(<CreditCardDropdown {...props} />);
    expect(component).toMatchSnapshot();
  });
});
