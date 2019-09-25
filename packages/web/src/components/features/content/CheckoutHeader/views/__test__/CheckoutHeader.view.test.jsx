import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutHeaderVanilla } from '../CheckoutHeader.view';

describe('CheckoutHeaderVanilla', () => {
  const props = {
    labels: {},
    className: 'test',
    itemsCount: 1,
  };

  it('should render checkout header section', () => {
    const component = shallow(<CheckoutHeaderVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
