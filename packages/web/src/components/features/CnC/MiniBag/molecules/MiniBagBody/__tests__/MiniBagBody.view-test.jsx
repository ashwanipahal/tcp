import React from 'react';
import { shallow } from 'enzyme';
import MiniBagBody from '../views/MiniBagBody';

describe('MiniBagBody component', () => {
  it('renders correctly', () => {
    const props = {
      labels: {
        viewBag: 'View bag',
        viewSaveForLater: 'save later',
        subTotal: 'Subtotal',
      },
    };
    const component = shallow(<MiniBagBody {...props} />);
    expect(component).toMatchSnapshot();
  });
});
